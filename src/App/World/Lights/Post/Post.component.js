// @flow
import * as React from 'react';

import Passthorugh from '../Passthrough';
import { createLight } from '../Light';
import { createConfig, createAmbientShader } from '../../Shaders';

import post from './Post.frag';

const blend = {
  enable: true,
  func: {
    src: 'src alpha',
    dst: 'dst alpha',
  },
};

const ambientShader = createAmbientShader();

type Props = {
  light: {
    shaders: {},
  },
};

export default ({ light, ...props }: Props) => {
  const { shaders, ...config } = light;
  const lights = [config];
  const { uniforms, ...rest } = createLight(light, 0);
  const { vert, ...options } = createConfig((shaders || [ambientShader(lights)])
    .map<any>(shader => ({
      ...shader,
      lights,
      uniforms,
    })), post);
  return <Passthorugh {...options} {...rest} {...props} blend={blend} />;
};
