import { createActions } from 'redux-actions';

export const Actions = {
  LOAD_LAYOUT: 'loadLayout',
  SAVE_LAYOUT: 'saveLayout',
};

export const {
  loadLayout,
  saveLayout,
  fetchLayout,
} = createActions({
  [Actions.LOAD_LAYOUT]: layout => ({ layout }),
  [Actions.SAVE_LAYOUT]: layout => ({ layout }),
});
