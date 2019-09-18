import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
    
const Fade = React.forwardRef(function Fade(props, ref) {
    // eslint-disable-next-line react/prop-types
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });
    
    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    in: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/require-default-props
    onEnter: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    onExited: PropTypes.func,
};

export default Fade;