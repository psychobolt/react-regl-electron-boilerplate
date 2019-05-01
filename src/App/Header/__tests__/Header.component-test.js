import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Header from '../Header.component';

describe('component <Header />', () => {
  it('should render without crashing -- box (default)', () => {
    mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Header />
      </MemoryRouter>,
    );
  });

  it('should render without crashing -- sphere', () => {
    mount(
      <MemoryRouter initialEntries={['/sphere']} initialIndex={0}>
        <Header />
      </MemoryRouter>,
    );
  });

  it('supports rendering mode selection', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Header />
      </MemoryRouter>,
    );
    const event = new Event('change');
    Object.assign(event, { detail: { newValue: '' } });
    wrapper.find('XSelect').instance().ref.current.dispatchEvent(event);
  });
});
