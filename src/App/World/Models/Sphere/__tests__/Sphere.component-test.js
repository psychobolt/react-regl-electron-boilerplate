import React from 'react';
import { shallow } from 'enzyme';

import Sphere from '../Sphere.component';

test('component <Sphere /> should render without crashing', () => {
  shallow(<Sphere />);
});
