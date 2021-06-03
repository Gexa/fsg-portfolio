import * as React from 'react';
import Image from 'next/image';

const MemberImage: React.FunctionComponent = (props: any): JSX.Element => {
    return (
        <figure className={props.className && props.className}>
            <Image width={600} height={600} quality={85} layout="responsive" src={props.src} alt={props.alt} title={props.title && props.title} />
            <figcaption>{props.alt}</figcaption>
        </figure>
    );
}

export default MemberImage;