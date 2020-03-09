// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
};

export default ({ children }: Props) => (typeof children === 'function' ? children({ width: 1, height: 1 }) : children);
