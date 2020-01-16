// @flow
import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';

type Props = {
  children: React.Node,
};

export default ({ children, ...props }: Props) => (
  <ReactResizeDetector {...props}>
    {typeof children === 'function' ? children({ width: 1, height: 1 }) : children}
  </ReactResizeDetector>
);
