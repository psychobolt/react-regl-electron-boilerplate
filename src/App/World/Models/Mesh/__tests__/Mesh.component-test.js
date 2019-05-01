import React from 'react';
import { shallow } from 'enzyme';

import Mesh from '../Mesh.component';

test('component <Mesh /> should render without crashing', () => {
  shallow(<Mesh />);
});
