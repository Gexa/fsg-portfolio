import * as React from 'react';
import Header from './Header/Header';

const Layout = props => {
    return (
        <div data-test="component-layout" className="container-fluid">
            <Header />
            {props.children && props.children}
        </div>
    );
}

export default Layout;