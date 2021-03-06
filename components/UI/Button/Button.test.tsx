import * as React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../../lib/test/utils';

import Button, { ButtonProps } from './Button';

const setup = (props?: ButtonProps) => mount(<Button {...props} />);

describe('Button', () => {
    test('renders without error when only text /caption/ and one classname provided', () => {
        const wrapper = setup({ caption: 'Test button', classes: 'sm' });
        const component = findByTestAttr(wrapper, 'component-button');

        expect(component.exists()).toBe(true);
        expect(component.find('span').length).toBe(1);
    });

    test('Icon rendered when icon and iconGroup is given', () => {
        const wrapper = setup({ caption: 'Test button', icon: <span />, iconGroup: 'fas' });
        const component = findByTestAttr(wrapper, 'component-button');

        expect(component.find('span').length).toBe(2);
    });

    test('Run onClick once when MouseEvents /onClick/ is provided', () => {
        const mockClickHandler: any = jest.fn();
        const wrapper = setup({ caption: 'Test button', onClick: mockClickHandler });
        const component = findByTestAttr(wrapper, 'component-button');
        component.simulate('click');

        expect(mockClickHandler).toHaveBeenCalledTimes(1);
    });
});

