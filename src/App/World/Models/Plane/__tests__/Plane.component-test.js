import React from 'react';
import { shallow } from 'enzyme';

import Plane from '../Plane.component';

test('component <Plane /> should render withou crashing', () => {
  shallow(<Plane />);
});
