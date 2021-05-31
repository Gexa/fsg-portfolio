import * as React from 'react';
import Footer from './Footer';
import { findByTestAttr } from '../../../lib/test/utils';
import { shallow } from 'enzyme';

const setup = () => shallow(<Footer />);

describe('Footer', () => {

    let wrapper;
    let component;
    beforeEach( () => {
        wrapper = setup();
        component = findByTestAttr(wrapper, 'component-footer');
    } );

    it('Should render without errors', () => {
        expect(component.exists()).toBe(true);
    });

    it('Should contain a quotation', () => {
        expect(component.find('blockquote').length).toBe(1);
    });

    it('Should contain a Copyright', () => {
        expect(component.find('[data-test="copyright"]').length).toBe(1);
    });

});