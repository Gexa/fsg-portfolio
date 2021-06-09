import React from 'react';
import { motion } from 'framer-motion';
/* https://github.com/framer/motion */

const WithAnimation = props => {
    const pageEffects = {
        init: {
            opacity: 0,
            /* x: '-100vw', */
            scale: 0.8
        },
        in: {
            opacity: 1,
            /* x: 0, */
            scale: 1
        },
        out: {
            opacity: 0,
            /* x: '100vw', */
            scale: 1.3
        }
    };

    const pageTransition = {
        type: 'tween',
        duration: !props.duration ? 0.4 : props.duration
    };

    return (
        <motion.div initial="init" animate="in" exit="out" variants={pageEffects} transition={pageTransition} onAnimationComplete={() => document.querySelector('.app > main').scrollTo(0, 0)}>
            {props.children}
        </motion.div>
    );
}

export default WithAnimation;
