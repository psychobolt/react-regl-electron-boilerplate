import { handleActions, combineActions } from 'redux-actions';

import { loadLayout, saveLayout } from './App.actions';
import initialState from './App.state';

export default {
  app: handleActions({
    [combineActions(loadLayout, saveLayout)]: (state, { payload: { layout } }) => ({
      layout: layout.reduce((saved, { i, ...config }) => ({
        ...saved,
        [i]: config,
      }), state.layout || {}),
    }),
  }, initialState.app),
};
