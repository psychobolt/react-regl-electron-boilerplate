// @flow
import * as React from 'react';
import * as ReactRegl from '@psychobolt/react-regl';

import Post from './Post/Post.component';
import Passthrough from './Passthrough';
import { RenderingMode, Context, createLight, type ContextProps } from './Light';

import { Context as SceneContext } from '../Scene';
import Background from '../Background';

const { Context: ReglContext, Drawable, Framebuffer } = ReactRegl;

export const createLights = (lights: any[]) => lights
  .reduce((config, light, index) => {
    const { uniforms } = createLight(light, index);
    return {
      ...config,
      uniforms: {
        ...config.uniforms,
        ...uniforms,
      },
    };
  }, {});

const textures = [
  { type: 'float' }, // background
  { type: 'float' }, // albedo
  { type: 'float' }, // position
  { type: 'float' }, // normal
];

type Texture = {
  type: string,
};

type BufferProps = {
  color: Array<Texture>,
  depth: boolean,
  children: any => React.Node,
};

const Buffer = React.memo(({
  depth = true,
  children,
  ...props
}: BufferProps) => {
  const { context } = React.useContext(ReglContext);
  const { color = [], ...rest } = props;
  return (
    <Framebuffer
      color={[...textures, ...color].map(texture => context.regl.texture(texture))}
      depth={depth}
      fitView
      {...rest}
    >
      {fbo => children(fbo)}
    </Framebuffer>
  );
});

type Props = {
  lights: any[],
  buffer: BufferProps,
  children: React.Node,
} & ContextProps;

export default function ({
  lights = [],
  renderingMode = RenderingMode.FORWARD,
  buffer,
  children,
  ...props
}: Props) {
  const { context } = React.useContext(ReglContext);
  const { bgColor } = React.useContext(SceneContext);
  let child;
  switch (renderingMode) {
    case RenderingMode.DEFFERED:
      child = fbo => (
        <>
          <Drawable framebuffer={fbo}>
            <Drawable render={() => context.regl.clear({
              color: bgColor,
              depth: 1,
            })}
            />
            <Background color={bgColor} uniforms={{ normalTex: fbo.color[2] }} />
            {children}
          </Drawable>
          <Background color={bgColor} uniforms={{ normalTex: fbo.color[2] }} />
          {lights.length
            ? lights.map((light, i) => <Post key={`post${i + 1}`} light={light} fbo={fbo} />)
            : <Passthrough fbo={fbo} />
          }
        </>
      );
      break;
    default:
      child = fbo => (children
        ? <Drawable {...createLights(lights)} {...props}>{children}</Drawable>
        : <Background color={bgColor} uniforms={{ normalTex: fbo.color[2] }} />);
  }
  return (
    <Context.Provider value={{ renderingMode }}>
      <Buffer {...buffer}>{child}</Buffer>
    </Context.Provider>
  );
}
