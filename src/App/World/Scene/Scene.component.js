// @flow
import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { ReglContainer, Frame } from '@psychobolt/react-regl';
import Camera from '@psychobolt/react-regl-orbit-camera';
import styled from 'styled-components';

import * as styles from './Scene.style';

let contextProps = {
  extensions: ['webgl_draw_buffers', 'oes_texture_float'],
};

const isDevelopment = process.env.NODE_ENV === 'development';
/* istanbul ignore if */
if (isDevelopment) {
  contextProps = {
    ...contextProps,
    extensions: [...contextProps.extensions, 'ext_disjoint_timer_query'],
    profile: true,
  };
}

const center = [0.0, 0.5, 0.0];

const theta = Math.PI / 2;

const backgroundColor = [0.0, 0.0, 0.0, 1.0];

type ContextProps = {
  bgColor: number[],
};

export const Context = React.createContext<ContextProps>({
  bgColor: backgroundColor,
});

const View = styled.canvas`${styles.canvas}`;

type Props = {
  onFrame: any => any,
  onRender: any => any,
  children: React.Node,
};

export default ({
  bgColor = backgroundColor, onRender, onFrame, children,
}: Props & ContextProps) => (
  <ReactResizeDetector handleWidth handleHeight>
    {({ width, height }) => (
      <ReglContainer
        View={View}
        viewProps={{ width, height }}
        contextProps={contextProps}
        onRender={() => {
          /* istanbul ignore next */
          if (isDevelopment) {
            import('spectorjs').then(SPECTOR => {
              window.spector = new SPECTOR.Spector();
            });
          }
          if (onRender) onRender();
        }}
        statsWidget={isDevelopment}
      >
        <Context.Provider value={{ bgColor }}>
          <Frame onFrame={context => {
            context.regl.clear({ color: bgColor });
            if (onFrame) onFrame(context);
          }}
          >
            <Camera center={center} distance={5} theta={theta}>{children}</Camera>
          </Frame>
        </Context.Provider>
      </ReglContainer>
    )}
  </ReactResizeDetector>
);
