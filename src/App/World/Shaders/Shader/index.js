import utils from './Shader.frag';

import defaultMain from '../Shaders.frag';
import Light from '../../Lights/Light/Light.frag';
import Shadows from '../../Shadows/Shadows.frag';
import Material from '../../Materials/Material/Material.frag';

export const frag = ({ maxLightCount, fragments, applyShaders, main, shadow }) => `
  precision mediump float;

  ${Material}

  ${maxLightCount > 0
    ? `
  #define MAX_LIGHTS ${maxLightCount}
  ${Light}
  ${utils}
  ${shadow ? Shadows : ''}

  ${fragments}

  vec3 compute(Light lights[MAX_LIGHTS], Material material, vec3 eye, vec4 position, vec3 normal) {
    vec3 power;
    float shade = 0.0;
    Light light;
    vec4 lightCoord;
    vec2 depthCoord;
    ${applyShaders}
    return power;
  }
  
  ${main}`
    : `
  vec3 compute(Material material, vec3 eye, vec4 position, vec3 normal) {
    vec3 power, color;
    ${applyShaders}
    return power;
  }

  ${defaultMain}
  `}
`.trim();

export const createShader = shader => ({
  shadow: false,
  ...shader,
  lights: shader.lights.map(light => ({
    ...light,
    shaders: (light.shaders || []).concat(shader),
  })),
});
