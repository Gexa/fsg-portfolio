import * as React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../lib/test/utils';

import Contact from './Contact';

const setup = () => shallow(<Contact />);

describe('Contact Form', () => {
    it('should render without errors', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-contact');
        expect(component.exists()).toBe(true);
    });
});