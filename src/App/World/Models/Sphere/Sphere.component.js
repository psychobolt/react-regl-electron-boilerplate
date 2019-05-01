// @flow
import * as React from 'react';
import createSphere from 'primitive-sphere';

import Mesh from '../Mesh';

const sphere = createSphere(1.0, { segments: 16 });

const attributes = {
  position: sphere.positions,
  normal: sphere.normals,
};

type Props = {
  color: number[],
  scale: number | number[],
  position: number[]
};

export default ({ scale, position, ...props }: Props) => (
  <Mesh
    attributes={attributes}
    elements={sphere.cells}
    args={{
      scale,
      position,
    }}
    {...props}
  />
);
