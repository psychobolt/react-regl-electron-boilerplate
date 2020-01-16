import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

jest.mock('../World/Scene/Scene.component');

jest.mock('../World/Shaders/Shader', () => {
  const { frag, ...rest } = jest.requireActual('../World/Shaders/Shader');
  return {
    ...rest,
    frag: options => {
      frag(options);
      return 'void main() {}';
    },
  };
});

describe('component <App />', () => {
  it('should render without crashing', () => {
    jest.isolateModules(() => {
      const { default: App } = require('../App.component'); // eslint-disable-line global-require
      mount(<MemoryRouter><App /></MemoryRouter>);
    });
  });

  it('should render empty div if no width or height detected', () => {
    jest.isolateModules(() => {
      jest.dontMock('react-resize-detector');
      const { default: App } = require('../App.component'); // eslint-disable-line global-require
      mount(<MemoryRouter><App /></MemoryRouter>);
    });
  });
});
