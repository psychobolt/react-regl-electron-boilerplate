// @flow
import * as React from 'react';
import { Drawable } from '@psychobolt/react-regl';

import { Context, BufferTypes } from '../Shadows.component';

const uniform = name => `shadow.${name}`;

export const limit = (samples: number) => Math.ceil((Math.sqrt(samples) - 1) / 2);

export const calcSamples = (bound: number) => (bound * 2 + 1) ** 2;

export const ShadowProps = {
  enabled: true,
  bufferType: BufferTypes.MAP,
  samples: 9,
  light: null,
};

export const createShadow = (
  { light = null, frag, vert, bufferType, samples, ...values }: typeof ShadowProps,
) => Object
  .entries(values).reduce((config, [key, value]) => ({
    ...config,
    uniforms: {
      ...config.uniforms,
      [uniform(key)]: value,
    },
  }), {
    light,
    frag,
    vert,
    samples,
    uniforms: {
      [uniform('bufferType')]: bufferType,
    },
  });

const cull = {
  enable: true,
  face: 'front',
};

type Shadow = {
  vert: string,
  frag: string,
  bufferType: string,
  light: {
    projection: number[],
    view: number[],
  },
  uniforms: {},
};

type Props = {
  shadow: Shadow,
  children: React.Node,
};

export default ({ shadow, children, ...props }: Props) => {
  const { shadowCube, shadowMap } = React.useContext(Context);
  const { bufferType, light, uniforms, vert, frag } = shadow;
  const framebuffer = bufferType === BufferTypes.CUBE ? shadowCube : shadowMap;
  const { projection, view } = light;
  return (
    <Drawable
      vert={vert}
      frag={frag}
      uniforms={{
        ...uniforms,
        projection,
        view,
      }}
      framebuffer={framebuffer}
      cull={cull}
      {...props}
    >
      {children}
    </Drawable>
  );
};
