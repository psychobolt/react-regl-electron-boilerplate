import React from 'react';
import { shallow } from 'enzyme';

import Background from '../Background.component';

test('component <Background /> should render without crashing', () => {
  shallow(<Background />);
});
