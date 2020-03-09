import { createSelector } from 'reselect';

const rowHeight = 71;

export function getDefaults(state, options) {
  const { height } = options || {};
  return {
    top: { x: 0, y: 0, w: 3, h: 1, isDraggable: true },
    scene: {
      x: 0,
      y: 1,
      w: 3,
      h: height ? (height - rowHeight) / rowHeight : 1,
      isDraggable: false,
    },
  };
}

export const getSavedLayout = state => state.app.layout;

export const getLayout = createSelector(
  [getDefaults, getSavedLayout],
  (defaults, layout) => Object.entries({
    ...defaults,
    ...layout,
  }).map(([key, config]) => ({
    ...config,
    i: key,
  })),
);
