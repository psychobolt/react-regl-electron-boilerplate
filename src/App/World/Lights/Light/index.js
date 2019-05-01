// @flow
import * as React from 'react';
import mat4 from 'gl-mat4';

import { createShadow } from '../../Shadows';

export const LightProps = {
  direction: [0.0, 0.0, 0.0, 1.0],
  ambient: [0.0, 0.0, 0.0, 0.0],
  diffuse: [0.0, 0.0, 0.0, 0.0],
  specular: [0.0, 0.0, 0.0, 0.0],
  constant: 1.0,
  linear: 1.0,
  quadratic: 1.0,
  view: mat4.lookAt([], [0, 0, 0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]),
  projection: mat4.ortho([], -25, 25, -25, 25, -10, 25),
  shadow: {
    enabled: false,
    bufferType: -1,
    minBias: 0.0,
    maxBias: 0.0,
  },
};

export type ContextProps = {
  renderingMode: string,
};

export const Context = React.createContext<ContextProps>({});

export const RenderingMode = {
  FORWARD: 'forward',
  DEFFERED: 'deferred',
};

export const uniform = (name: string, i: number) => `lights[${i}].${name}`;

type Light = {
  shadow: {},
  shaders: any[]
}

export const createLight = ({ shaders, shadow, ...values }: Light, index: number) => Object
  .entries(values).reduce((config, [key, value]) => ({
    ...config,
    uniforms: {
      eye: context => context.eye,
      ...config.uniforms,
      [uniform(key, index)]: value,
    },
  }), Object.entries(createShadow(shadow).uniforms).reduce((config, [key, value]) => ({
    ...config,
    uniforms: {
      ...config.uniforms,
      [uniform(key, index)]: value,
    },
  }), {}));
