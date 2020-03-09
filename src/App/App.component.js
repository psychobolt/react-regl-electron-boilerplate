// @flow
import * as React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ReactResizeDetector from 'react-resize-detector';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
import World from './World';
import { RenderingMode } from './World/Lights';

import { getSavedLayout, getLayout } from './App.selectors';
import { loadLayout, saveLayout } from './App.actions';
import query from './App.query.gql';

const rowHeight = 71;
const margin = [0, 0];
const columns = { lg: 3 };

type ContentProps = {
  width: number,
  height: number,
}

const Grid = WidthProvider(Responsive);

const Content = ({ width, height }: ContentProps) => {
  const [renderingMode, setRenderingMode] = React.useState(RenderingMode.FORWARD);
  const dispatch = useDispatch();
  useQuery(query, {
    onCompleted: ({ layout }) => dispatch(loadLayout(layout)),
  });
  const layout = useSelector(state => getSavedLayout(state) && getLayout(state, { width, height }));
  const children = React.useMemo(() => [
    <div key="scene"><World renderingMode={renderingMode} /></div>,
    <div key="top"><Header renderingMode={renderingMode} setRenderingMode={setRenderingMode} /></div>,
  ], [renderingMode]);
  const onLayoutChanged = React.useCallback(newLayout => dispatch(saveLayout(newLayout)), [layout]);
  if (!layout) {
    return <div>Loading...</div>;
  }
  return (
    <Grid
      width={width}
      rowHeight={rowHeight}
      cols={columns}
      margin={margin}
      layouts={{ lg: layout }}
      breakpoints={{ lg: height }}
      onLayoutChange={onLayoutChanged}
      useCSSTransforms={false}
      measureBeforeMount
    >
      {children}
    </Grid>
  );
};

type Props = {};

export default (props: Props) => (
  <ReactResizeDetector handleWidth handleHeight>
    {({ width, height }) => (
      (width && height) ? <Content {...props} width={width} height={height} /> : <div />
    )}
  </ReactResizeDetector>
);
