import * as React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../lib/test/utils';
import Home from './index';

const setup = () => {
    return shallow(<Home />);
}

describe('Home', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    it('should render without errors', () => {
        const component = findByTestAttr(wrapper, 'component-home');
        expect(component.length).toBe(1);
    });

});