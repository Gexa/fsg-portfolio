import * as React from 'react';

import Header from './Header';

import { findByTestAttr } from '../../../lib/test/utils';
import { shallow } from 'enzyme';

const setup = (props:object = {}) => shallow(<Header {...props} />);

describe('Header', () => {
    it('should render without errors', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-header');
        expect(component.exists()).toBe(true);
    });

    it('should contain an <h1> and a logo img', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-header');
        const h1 = component.find('h1');
        const logo = h1.find('[id="logo"]');

        expect(h1).toHaveLength(1);
        expect(logo).toHaveLength(1);
    });

    it('should contain a <nav> with one or more links', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-header');
        const nav = component.find('nav');

        expect(nav).toHaveLength(1);
        expect(nav.find('Link').length).toBeGreaterThanOrEqual(1);
    });
})