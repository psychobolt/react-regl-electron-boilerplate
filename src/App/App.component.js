import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import World from './World';
import { RenderingMode } from './World/Lights';
import * as styles from './App.style';

const Container = styled.div`${styles.container}`;
const View = styled(World)`${styles.worldContainer}`;

export default props => {
  const [renderingMode, setRenderingMode] = React.useState(RenderingMode.FORWARD);
  return (
    <Container>
      <Header renderingMode={renderingMode} setRenderingMode={setRenderingMode} />
      <View {...props} renderingMode={renderingMode} spector />
    </Container>
  );
};
