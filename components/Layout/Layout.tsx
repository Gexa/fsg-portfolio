import * as React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/system';

import Dialog from '../UI/Dialog/Dialog';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = props => {

    const { message } = useSelector( (state:RootStateOrAny) => state.system );
    const dispatch = useDispatch();

    const onClearMessage = () => {
        dispatch(actionCreators.systemClearMessage());
    }

    return (
        <div data-test="component-layout" className="container-fluid app">
            <Header />

            {message &&
                <Dialog
                    backdrop={true}
                    content={message.content}
                    title={message.title}
                    buttons={message.buttons}
                    closeable={message.closeable}
                    onClose={onClearMessage}
                />}

            <main>
                {props.children && props.children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;