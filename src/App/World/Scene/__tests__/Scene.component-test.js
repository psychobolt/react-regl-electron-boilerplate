import React from 'react';
import { Drawable } from '@psychobolt/react-regl';
import { mount } from 'enzyme';

import Scene from '../Scene.component';

import Mesh from '../../Models/Mesh';
import Lights, { RenderingMode, createAmbientLight } from '../../Lights';
import Shaders, { createAmbientShader } from '../../Shaders';
import Shadows, { enableShadows, createDirectionalShadow } from '../../Shadows';

jest.mock('../../Shaders/Shader', () => {
  const { frag, ...rest } = jest.requireActual('../../Shaders/Shader');
  return {
    ...rest,
    frag: options => {
      frag(options);
      return 'void main() {}';
    },
  };
});

describe('component <Scene />', () => {
  it('should render without crashing', done => {
    const onFrame = () => done();
    mount(<Scene onFrame={onFrame} />);
  });

  describe('component <Lights/>', () => {
    it('should render without children without crashing -- forward (default)', done => {
      const onRender = () => done();
      mount(<Scene onRender={onRender}><Lights /></Scene>);
    });

    it('should render Mesh shadow without crashing -- forward (default)', done => {
      const onRender = () => done();
      const shader = 'void main() {}';
      mount(
        <Scene onFrame={onRender}>
          <Lights>
            <Drawable vert={shader} frag={shader} count={0} />
          </Lights>
        </Scene>,
      );
    });

    it('should render without crashing -- deferred', done => {
      const onFrame = () => done();
      const props = {
        lights: [createAmbientLight()],
        renderingMode: RenderingMode.DEFFERED,
      };
      mount(<Scene onFrame={onFrame}><Lights {...props} /></Scene>);
    });

    it('should render without crashing -- deferred (passthrough)', done => {
      const onRender = () => done();
      mount(<Scene onRender={onRender}><Lights renderingMode={RenderingMode.DEFFERED} /></Scene>);
    });

    describe('component <Shaders />', () => {
      it('should render without crashing -- forward (default)', done => {
        const onRender = () => done();
        const light = createAmbientLight();
        const ambientShader = createAmbientShader({ shadow: true });
        const shadow = createDirectionalShadow({ light });
        const lights = enableShadows([shadow], [light]);
        const shaders = [ambientShader(lights)];
        mount(
          <Scene onRender={onRender}>
            <Lights lights={lights}>
              <Shaders shaders={shaders} count={0} />
            </Lights>
          </Scene>,
        );
      });

      it('should render without crashing -- deferred', done => {
        const onRender = () => done();
        const light = createAmbientLight();
        const ambientShader = createAmbientShader();
        const lights = [light];
        const shaders = [ambientShader(lights)];
        mount(
          <Scene onRender={onRender}>
            <Lights lights={lights} renderingMode={RenderingMode.DEFFERED}>
              <Shaders shaders={shaders} count={0} />
            </Lights>
          </Scene>,
        );
      });

      describe('component <Mesh />', () => {
        it('should render without crashing -- with shadows', done => {
          const onFrame = () => done();
          const light = createAmbientLight();
          const ambientShader = createAmbientShader({ shadow: true });
          const shadow = createDirectionalShadow({ light });
          const lights = enableShadows([shadow], [light]);
          const positions = [[-1.0, 0.0, 0.0], [0.0, -1.0, 0.0], [1.0, 1.0, 0.0]];
          const props = {
            shaders: [ambientShader(lights)],
            shadows: [shadow],
            attributes: {
              position: positions,
            },
            vert: `
              precision mediump float;
              attribute vec3 position;
              uniform mat4 projection, model, view;
              void main() {
                gl_Position = projection * view * model * vec4(position, 1.0);
              }`,
            count: 3,
          };
          mount(
            <Scene onFrame={onFrame}>
              <Shadows><Lights lights={lights}><Mesh {...props} /></Lights></Shadows>
            </Scene>,
          );
        });
      });
    });
  });
});
