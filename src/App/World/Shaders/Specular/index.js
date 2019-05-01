import frag from './Specular.frag';

import { createShader } from '../Shader';

export const createSpecularShader = options => lights => createShader({
  entry: 'specular',
  frag,
  lights,
  ...options,
});
