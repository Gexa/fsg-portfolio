import React from 'react';

const Navigation = props => {
    return (
        <>
        {props.isActive ? <div id="navigation-overlay" onClick={props.clicked}></div> : null}
        <div id="navigation-outer" tabIndex={0} className={[props.isActive ? 'is-open' : 'is-closed', 'main-nav'].join(' ')}>
            {props.Hamburger()}
            <nav id="mainmenu">
                {!props.menu ? null : props.menu }
            </nav>
        </div>
        </>
    );
}

export default Navigation;