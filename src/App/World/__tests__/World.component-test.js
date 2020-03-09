import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import World from '../World.component';

jest.mock('../Scene/Scene.component');

jest.mock('../Shaders/Shader');

describe('component <World />', () => {
  it('should render with Box by default, without crashing', () => {
    mount(<MemoryRouter><World /></MemoryRouter>);
  });

  it('should render with Sphere, without crashing', () => {
    mount(<MemoryRouter initialEntries={['/sphere']}><World /></MemoryRouter>);
  });
});
