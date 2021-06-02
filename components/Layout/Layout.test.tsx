import * as React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../lib/test/utils';

import Layout from './Layout';
import { Provider } from 'react-redux';

jest.mock('react', () => {
    const originalReact = jest.requireActual('react');
    return {
        ...originalReact,
        useEffect: jest.fn(),
    }
});


const store = storeFactory();

const setup = () => {

    const portal = document.createElement('div');
    portal.setAttribute('id', 'portal');
    document.body.appendChild(portal);

    return mount(<Provider store={store}><Layout /></Provider>);
}

describe('Layout', () => {

    it('should render without errors', () => {
        const wrapper = setup();
        expect(findByTestAttr(wrapper, 'component-layout').exists()).toBe(true);
    });

});