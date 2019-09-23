import React from 'react';

const BaseIcon = function BaseIcon(_ref) {
    const { color, pushRight, children } = _ref;
    const mpushRight = pushRight === undefined ? true : pushRight;
    return React.createElement(
        'svg',
        {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: color,
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            style: { marginRight: mpushRight ? '20px' : '0', minWidth: 24 }
        },
        children
    );
};

const InfoIcon = function InfoIcon() {
    return React.createElement(
        BaseIcon,
        { color: 'white' },
        React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
        React.createElement('line', { x1: '12', y1: '16', x2: '12', y2: '12' }),
        React.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '8' })
    );
};

const SuccessIcon = function SuccessIcon() {
    return React.createElement(
        BaseIcon,
        { color: 'white' },
        React.createElement('path', {
            d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14'
        }),
        React.createElement('polyline', { points: '22 4 12 14.01 9 11.01' })
    );
};

const ErrorIcon = function ErrorIcon() {
    return React.createElement(
        BaseIcon,
        { color: 'white' },
        React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
        React.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
        React.createElement('line', { x1: '12', y1: '16', x2: '12', y2: '16' })
    );
};

const CloseIcon = function CloseIcon() {
    return React.createElement(
        BaseIcon,
        { color: '#FFFFFF', mpushRight: false },
        React.createElement('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
        React.createElement('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
    );
};

const _extends =
    Object.assign ||
    function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

const infoStyle = {
    backgroundColor: `#2196F3`,
    color: 'white',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '300px',
    boxSizing: 'border-box'
};

const successStyle = {
    backgroundColor: `#4CAF50`,
    color: 'white',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '300px',
    boxSizing: 'border-box'
};

const errorStyle = {
    backgroundColor: `#f44336`,
    color: 'white',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '300px',
    boxSizing: 'border-box'
};

const buttonStyle = {
    marginLeft: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
};

const AlertTemplate = function AlertTemplate(_ref) {
    // const message = _ref.message,
    //     options = _ref.options,
    //     style = _ref.style,
    //     close = _ref.close;
    const { message, options, style, close } = _ref;

    return React.createElement(
        'div',
        { style: _extends({}, 
            options.type === 'info' && infoStyle,
            options.type === 'success' && successStyle,
            options.type === 'error' && errorStyle,
            style) },
        options.type === 'info' && React.createElement(InfoIcon, null),
        options.type === 'success' && React.createElement(SuccessIcon, null),
        options.type === 'error' && React.createElement(ErrorIcon, null),
        React.createElement('span', { style: { flex: 2 } }, message),
        // eslint-disable-next-line react/button-has-type
        React.createElement(
            'button',
            { onClick: close, style: buttonStyle },
            React.createElement(CloseIcon, null)
        )
    );
};

export default AlertTemplate;
