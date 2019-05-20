// @flow
import * as React from 'react';
import { type Location } from 'react-router-dom';

import Scene from './Scene';
import Lights, { createAmbientLight, createPointLight } from './Lights';
import Shadows, { createDirectionalShadow } from './Shadows';
import { createMaterial } from './Materials';
import { combineShaders, createAmbientShader, createDiffuseShader, createSpecularShader } from './Shaders';
import { Plane, Cube, Sphere } from './Models';

const bgColor = [0.086, 0.13, 0.16, 1.0];

const ambientLight = createAmbientLight({
  ambient: [0.8, 0.8, 0.8, 1.0],
});
const pointLight = createPointLight({
  diffuse: [1.0, 1.0, 1.0, 1.0],
  specular: [1.0, 1.0, 1.0, 1.0],
  direction: [0.0, 1.0, 2.0, 1.0],
});

const ambientShader = createAmbientShader();
const diffuseShader = createDiffuseShader({ shadow: true });
const specularShader = createSpecularShader({ shadow: true });

const shadows = [
  createDirectionalShadow({
    maxBias: 0.0008,
    minBias: 0.0006,
    light: pointLight,
    samples: 25,
  }),
];

const { shaders, lights } = combineShaders(
  [ambientShader, diffuseShader, specularShader],
  [
    pointLight,
    ambientLight,
  ],
  shadows,
);

const planeProps = {
  material: createMaterial({
    color: [0.26, 0.50, 0.55],
  }),
  shaders,
  scale: 8.0,
  position: [0.0, 0.0, 0.0],
};

const cubeProps = {
  material: createMaterial({
    color: [0.95, 0.95, 0.95],
  }),
  shaders,
  shadows,
  scale: 0.5,
  position: [0.0, 0.25, 0.0],
};

const sphereProps = {
  material: createMaterial({
    color: [0.95, 0.95, 0.95],
  }),
  shaders,
  shadows,
  scale: 0.25,
  position: [0.0, 0.25, 0.0],
};

type Props = {
  renderingMode: string,
  location: Location,
  className: string,
};

export default ({ className, location, renderingMode }: Props) => (
  <Scene bgColor={bgColor} className={className}>
    <Shadows resSize={3000}>
      <Lights lights={lights} renderingMode={renderingMode}>
        {location && location.pathname === '/sphere'
          ? <Sphere name="sphere" {...sphereProps} />
          : <Cube name="cube" {...cubeProps} />
        }
        <Plane name="plane" {...planeProps} />
      </Lights>
    </Shadows>
  </Scene>
);
