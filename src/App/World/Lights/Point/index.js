// @flow
import mat4 from 'gl-mat4';

import { LightProps } from '../Light';

const PointLightProps = {
  diffuse: [0.5, 0.5, 0.5, 1.0],
  specular: [0.5, 0.5, 0.5, 1.0],
  constant: 1.0,
  linear: 0.09,
  quadratic: 0.032,
};

export const createPointLight = (
  { direction = LightProps.direction, ...props }: typeof PointLightProps = {},
) => {
  const [x, y, z] = direction;
  return {
    ...LightProps,
    ...PointLightProps,
    view: mat4.lookAt([], [x, y, z], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]),
    direction,
    ...props,
  };
};
