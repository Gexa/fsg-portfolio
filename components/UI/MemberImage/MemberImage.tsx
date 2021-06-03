import * as React from 'react';

const MemberImage: React.FunctionComponent = (props: any): JSX.Element => {
    return (
        <figure className={props.className && props.className}>
            <img src={props.src} alt={props.alt} title={props.title && props.title} />
            <figcaption>{props.alt}</figcaption>
        </figure>
    );
}

export default MemberImage;