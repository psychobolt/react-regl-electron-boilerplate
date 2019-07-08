import React from 'react';
import { Responsive as Grid } from 'react-grid-layout';
import ReactResizeDetector from 'react-resize-detector';

import Header from './Header';
import World from './World';
import { RenderingMode } from './World/Lights';

const rowHeight = 71;
const margin = [0, 0];
const columns = { lg: 3 };

export default props => {
  const [renderingMode, setRenderingMode] = React.useState(RenderingMode.FORWARD);
  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({ width, height }) => (width && height && (
        <Grid
          width={width}
          rowHeight={rowHeight}
          cols={columns}
          margin={margin}
          layouts={{
            lg: [
              { i: 'top', x: 0, y: 0, w: 3, h: 1 },
              { i: 'scene', x: 0, y: 1, w: 3, h: (height - rowHeight) / rowHeight, isDraggable: false },
            ],
          }}
          breakpoints={{ lg: height }}
        >
          <div key="scene"><World {...props} renderingMode={renderingMode} /></div>
          <div key="top"><Header renderingMode={renderingMode} setRenderingMode={setRenderingMode} /></div>
        </Grid>
      )) || <div />}
    </ReactResizeDetector>
  );
};
