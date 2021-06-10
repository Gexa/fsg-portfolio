import * as React from 'react';
import { useSwipeable } from 'react-swipeable';

import styles from '../../../assets/scss/components/UI/Gallery.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Gallery: React.FunctionComponent = (props?: any): JSX.Element => {

    const galleryItems = [ ...props.children ];
    return (
        <Carousel showThumbs={false} className={styles.gallery} swipeable={true} showIndicators={true}>
            {galleryItems.map((child, index) => {
                return (
                    <div key={index}>
                        {child}
                    </div>
                )}
            )}
        </Carousel>
    );
}

export default Gallery;