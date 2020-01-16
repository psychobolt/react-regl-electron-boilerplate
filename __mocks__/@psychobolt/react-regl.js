import React from 'react';

const gl = jest.requireActual('gl');
const { ReglContainer, ...rest } = jest.requireActual('@psychobolt/react-regl');

// workaround for https://github.com/stackgl/headless-gl/issues/184
const ctx = gl(1, 1, { preserveDrawingBuffer: true });
Object.defineProperty(ctx.constructor, 'name', { value: 'WebGLRenderingContext' });

const ReglContainerMock = props => (
  <ReglContainer {...props} View={ctx} />
);

module.exports = {
  ...rest,
  ReglContainer: ReglContainerMock,
};
