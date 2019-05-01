import React from 'react';
import { shallow } from 'enzyme';

import Cube from '../Cube.component';

test('component <Cube /> should render without crashing', () => {
  shallow(<Cube />);
});
