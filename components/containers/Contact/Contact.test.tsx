import * as React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, storeFactory } from '../../../lib/test/utils';

import Contact from './Contact';
import { Provider } from 'react-redux';

const store = storeFactory();

const setup = () => mount(<Provider store={store}><Contact /></Provider>);

describe('Contact Form', () => {
    it('should render without errors', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-contact');
        expect(component.exists()).toBe(true);
    });
});