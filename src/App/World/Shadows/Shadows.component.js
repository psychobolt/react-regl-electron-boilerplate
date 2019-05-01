
// @flow
import * as React from 'react';
import { Context as ReglContext, Drawable, Framebuffer } from '@psychobolt/react-regl';
import { defaultMemoize } from 'reselect';

import { Context as SceneContext } from '../Scene';

export const RenderingMode = {
  DEPTH: 'depth',
  NORMAL: 'normal',
};

type ContextType = {
  shadowCube: any,
  shadowMap: any,
  renderingMode: string,
};

export const Context = React.createContext<ContextType>({});

const createTexture = defaultMemoize((context, resSize) => context.regl.texture({
  width: resSize,
  height: resSize,
  wrap: 'clamp',
  type: 'float',
}));

type BufferProps = {
  resSize: number;
  children: any => React.Node,
};

const Buffer = React.memo<BufferProps>(({ resSize, children }: BufferProps) => {
  const { context } = React.useContext(ReglContext);
  const shadowCube = context.regl.framebufferCube({
    radius: resSize,
    colorFormat: 'rgba',
    colorType: 'float',
  });
  React.useEffect(() => shadowCube.destroy, []);
  return (
    <Framebuffer color={createTexture(context, resSize)} depth>
      {fbo => children({
        shadowCube,
        shadowMap: fbo,
      })}
    </Framebuffer>
  );
});

export const BufferTypes = {
  CUBE: 0,
  MAP: 1,
};

type Props = {
  resSize: number,
  children: React.Node,
};

export default ({ resSize = 1024, children }: Props) => {
  const { context } = React.useContext(ReglContext);
  const { bgColor } = React.useContext(SceneContext);
  const clear = () => context.regl.clear({
    color: bgColor,
    depth: 1,
  });
  return (
    <Buffer resSize={resSize}>
      {buffers => (
        <Drawable uniforms={{
          'globalShadow.map': buffers.shadowMap,
          'globalShadow.cube': buffers.shadowCube,
          'globalShadow.shadowRes': resSize,
        }}
        >
          <Drawable framebuffer={buffers.shadowMap}><Drawable render={clear} /></Drawable>
          <Context.Provider value={{ ...buffers, renderingMode: RenderingMode.DEPTH }}>
            {React.Children.map(children, child => React.cloneElement(child))}
          </Context.Provider>
          <Context.Provider value={{ ...buffers, renderingMode: RenderingMode.NORMAL }}>
            {children}
          </Context.Provider>
        </Drawable>
      )}
    </Buffer>
  );
};
