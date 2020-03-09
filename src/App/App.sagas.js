import { select, all, takeEvery } from 'redux-saga/effects';

import client from 'apollo/client';

import query from './App.query.gql';
import { getLayout } from './App.selectors';
import { Actions } from './App.actions';
import { DeleteLayout, SaveLayout } from './App.mutation.gql';

function* queryLayout() {
  const response = yield client.query({ query });
  return response.data.layout;
}

function* onSaveLayout() {
  const current = yield select(getLayout);
  const deleted = (yield queryLayout())
    .reduce((keys, { i }) => (!current.find(config => config.i === i) ? [...keys, i] : keys), []);
  if (deleted.length) {
    yield client.mutate({
      mutation: DeleteLayout,
      variables: { ids: deleted },
    });
  }
  yield client.mutate({
    mutation: SaveLayout,
    variables: {
      layout: current.map(({ i, w, h, x, y, isDraggable }) => ({ i, w, h, x, y, isDraggable })),
    },
  });
}

export default function* saga() {
  yield all([
  ]);
  yield takeEvery(Actions.SAVE_LAYOUT, onSaveLayout);
}
