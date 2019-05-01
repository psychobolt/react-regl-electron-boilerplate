import React from 'react';

const gl = jest.requireActual('gl');
const { ReglContainer, ...rest } = jest.requireActual('@psychobolt/react-regl');

const ReglContainerMock = props => (
  <ReglContainer {...props} View={gl(1, 1, { preserveDrawingBuffer: true })} />
);

module.exports = {
  ...rest,
  ReglContainer: ReglContainerMock,
};
