// @flow
import * as React from 'react';
import styled from 'styled-components';

import { XTab, XSelect } from 'Framework/ReactXelToolkit';
import { RouteLink } from 'Framework/ReactRouterHelpers';

import * as styles from './Header.style';
import { RenderingMode } from '../World/Lights';

type RenderingOptionProps = {
  renderingMode: string,
  selected: string,
  children: React.Node,
}

const RenderingOption = ({ renderingMode, selected, children }: RenderingOptionProps) => (
  <x-menuitem value={renderingMode} toggled={selected === renderingMode || null}>
    <x-label>{children}</x-label>
  </x-menuitem>
);

type Props = {
  renderingMode: string,
  setRenderingMode: string => void,
  className: string
};

const Header = ({ renderingMode, setRenderingMode = () => {}, className }: Props) => (
  <x-box class={className} vertical>
    <x-box class="row">
      <x-label class="label">Scenes:</x-label>
      <x-tabs>
        <RouteLink to={[{ to: '/' }, { to: '/box', default: true }]}>
          {({ match, onClick }) => (
            <XTab onClick={onClick} active={match ? true : null}>Box</XTab>
          )}
        </RouteLink>
        <RouteLink to="/sphere">
          {({ match, onClick }) => (
            <XTab onClick={onClick} active={match ? true : null}>Sphere</XTab>
          )}
        </RouteLink>
      </x-tabs>
    </x-box>
    <x-box class="row">
      <x-label class="label">Rendering Mode:</x-label>
      <XSelect onChange={event => setRenderingMode(event.detail.newValue)}>
        <x-menu>
          <RenderingOption renderingMode={RenderingMode.FORWARD} selected={renderingMode}>
            Forward
          </RenderingOption>
          <RenderingOption renderingMode={RenderingMode.DEFFERED} selected={renderingMode}>
            Deffered
          </RenderingOption>
        </x-menu>
      </XSelect>
    </x-box>
  </x-box>
);

export default styled(Header)`${styles.header}`;
