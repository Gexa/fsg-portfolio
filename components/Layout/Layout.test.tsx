import * as React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../lib/test/utils';

import Layout from './Layout';

const setup = () => shallow(<Layout />);

describe('Layout', () => {

    it('should render without errors', () => {
        const wrapper = setup();
        expect(findByTestAttr(wrapper, 'component-layout').exists()).toBe(true);
    });

});