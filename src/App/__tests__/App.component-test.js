// @flow
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { createMockClient } from 'mock-apollo-client';
import * as StyledComponents from 'styled-components'; /* eslint-disable-line no-unused-vars */ // Keep this line, so we import styled-components only once

import { updateWrapper } from 'Framework/EnzymeHelpers';

import initialState from '../App.state';
import { getDefaults, getLayout } from '../App.selectors';
import query from '../App.query.gql';

const mockStore = configureMockStore([]);

jest.mock('../World/Scene/Scene.component');

jest.mock('../World/Shaders/Shader');

type Props = {
  client: any,
  store: any,
  children: React.Node,
}

const Container = ({ client, store, children }: Props) => (
  <MemoryRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        {children}
      </Provider>
    </ApolloProvider>
  </MemoryRouter>
);

describe('component <App />', () => {
  it('should render without crashing', async () => {
    const store = mockStore({
      ...initialState,
      app: {
        ...initialState.app,
        layout: getDefaults(initialState),
      },
    });
    const client = createMockClient();
    jest.isolateModules(() => {
      const { default: App } = require('../App.component'); // eslint-disable-line global-require
      const wrapper = mount(<Container store={store} client={client}><App /></Container>);
      updateWrapper(wrapper);
    });
  });

  it('should render with saved layout from client and without crashing', async () => {
    const store = mockStore(initialState);
    const client = createMockClient();
    client.setRequestHandler(query, () => Promise
      .resolve({ data: { layout: getLayout(initialState) } }));
    jest.isolateModules(() => {
      const { default: App } = require('../App.component'); // eslint-disable-line global-require
      const wrapper = mount(<Container store={store} client={client}><App /></Container>);
      updateWrapper(wrapper);
    });
  });

  it('should render empty div if no width or height detected', () => {
    const store = mockStore(initialState);
    const client = createMockClient();
    jest.isolateModules(() => {
      jest.dontMock('react-resize-detector');
      const { default: App } = require('../App.component'); // eslint-disable-line global-require
      const wrapper = mount(<Container store={store} client={client}><App /></Container>);
      updateWrapper(wrapper);
    });
  });
});
