// @flow
import * as React from 'react';

import Mesh from '../Mesh';

const elements = [
  [3, 1, 0],
  [0, 2, 3],
];

const positions = [
  [-0.5, 0.0, -0.5],
  [0.5, 0.0, -0.5],
  [-0.5, 0.0, 0.5],
  [0.5, 0.0, 0.5],
];

const normals = [
  [0.0, 1.0, 0.0],
  [0.0, 1.0, 0.0],
  [0.0, 1.0, 0.0],
  [0.0, 1.0, 0.0],
];

const attributes = {
  position: positions,
  normal: normals,
};

type Props = {
  scale: number | number[],
  position: number[]
};

export default ({ scale, position, ...props }: Props) => (
  <Mesh
    attributes={attributes}
    elements={elements}
    args={{
      scale,
      position,
    }}
    {...props}
  />
);
