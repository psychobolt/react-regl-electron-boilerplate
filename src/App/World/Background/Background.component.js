// @flow
import * as React from 'react';
import { Drawable } from '@psychobolt/react-regl';

import vert from './Background.vert';
import frag from './Background.frag';

type Props = {
  color: number[],
  position: number[],
  uniforms: {},
  attributes: {},
  count: number,
};

export default ({
  color = [0.0, 0.0, 0.0, 1.0],
  position = [-4, -4, 4, -4, 0, 4],
  uniforms,
  attributes,
  ...props
}: Props) => (
  <Drawable
    vert={vert}
    frag={frag}
    uniforms={{
      color,
      ...uniforms,
    }}
    attributes={{
      position,
      ...attributes,
    }}
    count={position.length / 2}
    {...props}
  />
);
