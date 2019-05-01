import frag from './Ambient.frag';

import { createShader } from '../Shader';

export const createAmbientShader = options => lights => createShader({
  entry: 'ambient',
  frag,
  lights,
  ...options,
});
