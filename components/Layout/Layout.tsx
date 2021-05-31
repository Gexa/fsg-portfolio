import * as React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = props => {
    return (
        <div data-test="component-layout" className="container-fluid app">
            <Header />
            <main>
                {props.children && props.children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;