import * as React from 'react';

const Layout = props => {
    return (
        <div data-test="component-layout">
            {props.children && props.children}
        </div>
    );
}

export default Layout;