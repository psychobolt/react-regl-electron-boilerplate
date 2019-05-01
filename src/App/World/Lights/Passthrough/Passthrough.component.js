// @flow
import * as React from 'react';
import { Drawable } from '@psychobolt/react-regl';

import vert from './Passthrough.vert';
import frag from './Passthrough.frag';

const position = [-4, -4, 4, -4, 0, 4];

const attributes = {
  position,
};

const depth = {
  enable: false,
};

type Props = {
  fbo: any,
  uniforms: {},
  vert: string,
}

export default ({ fbo, uniforms, ...props }: Props) => (
  <Drawable
    vert={vert}
    frag={frag}
    attributes={attributes}
    count={3}
    depth={depth}
    uniforms={{
      backgroundTex: fbo.color[0],
      albedoTex: fbo.color[1],
      normalTex: fbo.color[2],
      positionTex: fbo.color[3],
      ...uniforms,
    }}
    {...props}
  />
);
