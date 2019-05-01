// @flow
import vert from './Directional.vert';
import frag from './Directional.frag';

import { ShadowProps } from '../Shadow';

const DirectionalShadowProps = {
  ...ShadowProps,
  minBias: 0.005,
  maxBias: 0.05,
};

export const createDirectionalShadow = (props: typeof DirectionalShadowProps) => ({
  vert,
  frag,
  ...DirectionalShadowProps,
  ...props,
});
