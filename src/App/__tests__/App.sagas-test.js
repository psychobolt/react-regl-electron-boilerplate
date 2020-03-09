import { combineReducers } from 'redux';
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import saga from '../App.sagas';
import { saveLayout } from '../App.actions';
import { getLayout } from '../App.selectors';
import reducers from '../App.reducers';

jest.mock('apollo/client');

const layout = [{
  i: 'empty',
  x: 0,
  y: 0,
  w: 1,
  h: 1,
  isDraggable: false,
}];

describe('App sagas', () => {
  it('should run successfully', () => expectSaga(saga).silentRun());

  describe('should save layout', () => {
    it('successfully', () => expectSaga(saga)
      .withReducer(combineReducers(reducers))
      .dispatch(saveLayout(layout))
      .silentRun());

    it('successfully with new keys', () => expectSaga(saga)
      .provide([
        [select(getLayout), layout],
      ])
      .dispatch(saveLayout(layout))
      .silentRun());
  });
});
