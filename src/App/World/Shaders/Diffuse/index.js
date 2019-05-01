import frag from './Diffuse.frag';

import { createShader } from '../Shader';

export const createDiffuseShader = options => lights => createShader({
  entry: 'diffuse',
  frag,
  lights,
  ...options,
});
