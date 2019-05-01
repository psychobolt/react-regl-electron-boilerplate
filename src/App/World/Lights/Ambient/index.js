// @flow
import mat4 from 'gl-mat4';

import { LightProps } from '../Light';

const AmbientLightProps = {
  direction: [-0.2, -1.0, -0.3, 0.0],
  ambient: [1.0, 1.0, 1.0, 1.0],
};

export const createAmbientLight = (
  { direction = AmbientLightProps.direction, ...props }: typeof AmbientLightProps = {},
) => {
  const [x, y, z] = direction;
  return {
    ...LightProps,
    ...AmbientLightProps,
    view: mat4.lookAt([], [x, y, z], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]),
    direction,
    ...props,
  };
};
