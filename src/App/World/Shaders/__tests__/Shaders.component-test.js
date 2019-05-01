import React from 'react';
import { shallow } from 'enzyme';

import Shaders from '../Shaders.component';
import { createAmbientShader } from '../Ambient';
import { createAmbientLight } from '../../Lights';

describe('component <Shaders />', () => {
  it('should render without crashing -- default', () => {
    const light = createAmbientLight();
    const ambientShader = createAmbientShader();
    const lights = [light];
    const shaders = [ambientShader(lights)];
    shallow(<Shaders shaders={shaders} />);
  });
});
