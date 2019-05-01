// @flow
import * as React from 'react';
import { Drawable } from '@psychobolt/react-regl';

import { frag } from './Shader';
import defaultMain from './Shaders.frag';
import vert from './Shader/Shader.vert';
import forward from './Forward/Forward.frag';
import gBuffer from './GBuffer/GBuffer.frag';

import { Context, RenderingMode } from '../Lights/Light';
import { limit, calcSamples } from '../Shadows';

const createLightShader = (
  config: any,
  { entry, frag: fragment, uniforms, lights, shadow, ...rest },
) => ({
  ...rest,
  fragments: `
    ${config.fragments}
    ${fragment}
  `,
  applyShaders: `
    ${config.applyShaders}
    ${lights.length
    ? lights.reduce((applyShader, light, i) => {
      const enabled = shadow && light.shadow.enabled;
      const bound = enabled ? limit(light.shadow.samples) : 0.0;
      return `
      ${applyShader}
      light = lights[${i}];
      ${enabled ? `
      for (int x = -${bound}; x <= ${bound}; x++) {
        for (int y = -${bound}; y <= ${bound}; y++) {
          shade += calculateShadow(light, position, normal, vec2(x, y));
        }
      }
      shade /= ${calcSamples(bound)}.0;
      ` : ''}
      power += (1.0 - shade) * ${entry}(light, material, eye, position, normal);
      shade = 0.0;
      `;
    }, '').trim()
    : `power += ${entry}(material, eye, position, normal)`}
  `.trim(),
  uniforms: {
    ...config.uniforms,
    ...uniforms,
  },
});

const deferred = (): any => ({
  vert,
  frag: gBuffer,
});

type Shaders = Array<any>;

export function createConfig(shaders: Shaders, main): any {
  let maxLightCount = 0;
  let shadow = false;
  const { fragments, applyShaders, ...rest } = shaders
    .reduce((config, shader) => {
      const lights = !main ? [] : shader.lights;
      if (maxLightCount < lights.length) {
        maxLightCount = lights.length;
      }
      shadow = shadow || shader.shadow;
      return createLightShader(config, { ...shader, lights });
    }, {
      fragments: '',
      applyShaders: '',
    });
  return {
    vert,
    frag: frag({ maxLightCount, fragments, applyShaders, main: main || defaultMain, shadow }),
    ...rest,
  };
}

const createShaders = (shaders, renderingMode) => {
  switch (renderingMode) {
    case RenderingMode.DEFFERED:
      return deferred();
    case RenderingMode.FORWARD:
      return createConfig(shaders, forward);
    default:
      return createConfig(shaders);
  }
};

type Props = {
  shaders: Shaders,
};

export default ({ shaders, ...props }: Props) => {
  const { renderingMode } = React.useContext(Context);
  const { uniforms, ...rest } = createShaders(shaders, renderingMode);
  return <Drawable {...rest} uniforms={uniforms} {...props} />;
};
