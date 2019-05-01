// @flow
import * as React from 'react';
import { Drawable } from '@psychobolt/react-regl';
import mat4 from 'gl-mat4';

import Shaders from '../../Shaders';
import { Context, Shadow, RenderingMode } from '../../Shadows';
import { createMaterial } from '../../Materials';

function model(_, { position = [0.0, 0.0, 0.0], scale: s = [1.0, 1.0, 1.0] }) {
  const m = mat4.identity([]);
  mat4.translate(m, m, position);
  mat4.scale(m, m, [s, s, s]);
  return m;
}

const uniforms = {
  model,
};

const depth = { enable: true };

type MeshProps = {
  args: {}
}

const Mesh = ({ args = {}, ...props }: MeshProps) => (
  <Drawable depth={depth} args={args} {...props} />
);

type Props = {
  shaders: any[],
  shadows: any[],
  material: {
    uniforms: {},
  },
};

export default ({ shaders, shadows = [], material = createMaterial(), ...props }: Props) => {
  switch (shadows.length ? React.useContext(Context).renderingMode : null) {
    case RenderingMode.DEPTH:
      return shadows.map<any>((shadow, i) => <Shadow key={`shadow_${i + 1}`} shadow={shadow}><Mesh uniforms={uniforms} {...props} /></Shadow>);
    default:
      return (
        <Shaders shaders={shaders}>
          <Mesh
            {...material}
            uniforms={{
              model,
              ...material.uniforms,
            }}
            {...props}
          />
        </Shaders>
      );
  }
};
