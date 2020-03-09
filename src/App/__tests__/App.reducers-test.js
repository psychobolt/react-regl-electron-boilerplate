import configureStore from 'redux-mock-store';

import reducers from '../App.reducers';
import { getLayout } from '../App.selectors';
import { loadLayout } from '../App.actions';
import initialState from '../App.state';

const mockStore = configureStore([]);

describe('App reducer', () => {
  it('should load layout', () => {
    let appState = initialState;
    const store = mockStore(actions => {
      if (actions.length) {
        appState = actions.reduce((state, action) => ({
          ...state,
          app: {
            ...reducers.app(state.app, action),
          },
        }), initialState);
        return appState;
      }
      return appState;
    });
    store.dispatch(loadLayout(getLayout(store.getState())));
    expect(store.getState()).toEqual(appState);
  });
});
