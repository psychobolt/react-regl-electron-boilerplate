import vert from './Point.vert';
import frag from './Point.frag';

import { BufferTypes } from '../Shadows.component';

export const createPointShadow = light => ({
  vert,
  frag,
  light,
  BufferTypes: BufferTypes.CUBE,
});
