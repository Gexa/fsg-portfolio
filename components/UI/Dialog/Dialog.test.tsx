import * as React from 'react';
import Dialog from './Dialog';

import { findByTestAttr } from '../../../lib/test/utils';
import { mount } from 'enzyme';

const setup = (props?) => {
    /* Create React Portal root element before rendering the real component */
    const root = global.document.createElement('div');
    root.setAttribute('id', 'portal');
    const body = global.document.querySelector('body');
    body.appendChild(root);

    return mount(<Dialog {...props} />);
}

describe('Dialog', () => {

    it('Should render without errors' , () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-dialog');

        expect(component.exists()).toBe(true);
    });

    it('should render a backdrop element on backdrop: true', () => {
        const wrapper = setup({ backdrop: true });
        const uiElement = findByTestAttr(wrapper, 'component-ui-backdrop');

        expect(uiElement.length).toBe(1);
    });

    it('should trigger close function on click on backdrop', () => {
        const mockClose = jest.fn();
        const wrapper = setup({ backdrop: true, onClose: mockClose });
        const uiElement = findByTestAttr(wrapper, 'component-ui-backdrop');

        uiElement.simulate('click');
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

});