import { shallow } from 'enzyme';
import * as React from 'react';
import { findByTestAttr } from '../../../lib/test/utils';
import Hero from './Hero';

const setup = (props?) => shallow(<Hero {...props} />);


test('It renders without error when no child', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-hero');
    expect(component.exists()).toBe(true);
});

test('It renders without error when child provided', () => {
    const wrapper = setup({
        children: <h2>About</h2>
    });
    const component = findByTestAttr(wrapper, 'component-hero');
    expect(component.find('h2').length).toBe(1);
});
