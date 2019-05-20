// @flow
import * as React from 'react';
import { Drawable } from '@psychobolt/react-regl';
import mat4 from 'gl-mat4';

import vert from './Mesh.vert';
import frag from './Mesh.frag';

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

type Props = {
  name: string,
  shaders: any[],
  shadows: any[],
  material: {
    uniforms: {},
  },
  args: {},
};

export default (
  { shaders, shadows = [], material = createMaterial(), args = {}, ...props }: Props,
) => {
  const { name, ...rest } = props;
  switch (React.useContext(Context).renderingMode) {
    case RenderingMode.DEPTH:
      return shadows.length > 0
        ? shadows.map<any>((shadow, i) => <Shadow name={`${name}_shadow`} key={`shadow_${i + 1}`} shadow={shadow}><Drawable name={`${name}_depth`} uniforms={uniforms} args={args} {...rest} /></Shadow>)
        : <Drawable name={`${name}_passthrough`} vert={vert} frag={frag} count={0} />;
    default:
      return (
        <Shaders name={`${name}_shaders`} shaders={shaders}>
          <Drawable
            {...material}
            uniforms={{
              ...uniforms,
              ...material.uniforms,
            }}
            args={args}
            {...props}
          />
        </Shaders>
      );
  }
};
