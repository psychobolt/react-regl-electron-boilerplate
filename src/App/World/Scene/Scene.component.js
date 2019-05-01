// @flow
import * as React from 'react';
import { ReglContainer, Frame } from '@psychobolt/react-regl';
import Camera from '@psychobolt/react-regl-orbit-camera';

import withResizableContainer from 'Framework/ReactResizableContainer';

const contextProps = {
  extensions: ['webgl_draw_buffers', 'oes_texture_float'],
};

const center = [0.0, 0.5, 0.0];

const theta = Math.PI / 2;

const backgroundColor = [0.0, 0.0, 0.0, 1.0];

type ContextProps = {
  bgColor: number[],
};

export const Context = React.createContext<ContextProps>({
  bgColor: backgroundColor,
});

type Props = {
  View: any,
  containerEl: HTMLDivElement,
  onFrame: any => any,
  onRender: any => any,
  children: React.Node,
};

export default withResizableContainer(({
  bgColor = backgroundColor, View, containerEl, onRender, onFrame, children,
}: Props & ContextProps) => (
  <ReglContainer View={View || containerEl} contextProps={contextProps} onRender={onRender}>
    <Context.Provider value={{ bgColor }}>
      <Frame onFrame={context => {
        context.regl.clear({ color: bgColor, depth: 1 });
        if (onFrame) onFrame(context);
      }}
      >
        <Camera center={center} distance={5} theta={theta}>{children}</Camera>
      </Frame>
    </Context.Provider>
  </ReglContainer>
));
