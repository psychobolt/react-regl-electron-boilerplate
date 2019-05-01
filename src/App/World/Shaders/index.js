import { enableShadows } from '../Shadows';

export { createAmbientShader } from './Ambient';
export { createDiffuseShader } from './Diffuse';
export { createSpecularShader } from './Specular';
export * from './Shaders.component';
export { default } from './Shaders.component';

export const combineShaders = (shaders, lights = [], shadows = []) => shaders
  .reduce((config, creator) => {
    const shader = creator(config.lights);
    return {
      ...config,
      shaders: config.shaders.concat(shader),
      lights: shader.lights,
    };
  }, {
    shaders: [],
    lights: enableShadows(shadows, lights),
  });
