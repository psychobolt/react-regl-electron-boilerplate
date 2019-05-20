// @flow
import * as React from 'react';
import * as ReactRegl from '@psychobolt/react-regl';

import Post from './Post/Post.component';
import Passthrough from './Passthrough';
import { RenderingMode, Context, createLight, type ContextProps } from './Light';

import { Context as SceneContext } from '../Scene';
import { Context as ShadowsContext, RenderingMode as ShadowsRenderingMode } from '../Shadows';
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
  name: string,
  lights: any[],
  buffer: BufferProps,
  children: React.Node,
} & ContextProps;

export default function ({
  name = 'light_set',
  lights = [],
  renderingMode = RenderingMode.FORWARD,
  buffer,
  children,
  ...props
}: Props) {
  const { context } = React.useContext(ReglContext);
  const { bgColor } = React.useContext(SceneContext);
  const shadows = React.useContext(ShadowsContext);
  let child;
  switch (renderingMode) {
    case RenderingMode.DEFFERED:
      if (shadows.renderingMode === ShadowsRenderingMode.DEPTH) {
        child = () => children;
      } else {
        child = fbo => (
          <>
            <Drawable name={name} framebuffer={fbo}>
              <Drawable render={() => context.regl.clear({
                color: [0.0, 0.0, 0.0, 0.0],
                depth: 1,
              })}
              />
              {children}
            </Drawable>
            <Background name="background" color={bgColor} uniforms={{ normalTex: fbo.color[2] }} />
            {lights.length
              ? lights.map((light, i) => {
                const lightName = `light_post_${i + 1}`;
                return <Post name={lightName} key={lightName} light={light} fbo={fbo} />;
              })
              : <Passthrough fbo={fbo} />
            }
          </>
        );
      }
      break;
    default:
      child = fbo => (children
        ? <Drawable name={name} {...createLights(lights)} {...props}>{children}</Drawable>
        : <Background color={bgColor} uniforms={{ normalTex: fbo.color[2] }} />);
  }
  return (
    <Context.Provider value={{ renderingMode }}>
      <Buffer {...buffer}>{child}</Buffer>
    </Context.Provider>
  );
}
