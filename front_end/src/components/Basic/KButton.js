import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Device from '../../css/device';

const BWrapper = styled.div`
    display: flex;
    background: ${props => {
        let background = "#3056F5";
        if( props.color === "blue" || props.color === "default")
            background = "#3056F5";
        if( props.color === "red" )
            background = "#FF0000";
        if( props.color === "green" )
            background = "#27E619";
        if( props.color === "gray" )
            background = "#8DA193";
        return background;
    }}
    color: white;
    font-size: 12px;
    border-radius: 4px;
    text-transform: uppercase;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0px 4px;
    line-height: 1;
    
    @media ${Device.laptop} {
        font-size: 14px;
        padding: 0px 8px;
    }
    
    &:hover {
        background: ${props => {
            let background = "#4066F5";
            if( props.color === "blue" || props.color === "default")
                background = "#4066F5";
            if( props.color === "red" )
                background = "#FF5050";
            if( props.color === "green" )
                background = "#37f629";
            if( props.color === "gray" )
                background = "#9DB1A3";
            return background;
        }}
    }
`;

export const KButton = (props) => {
    const { color, label } = props;

    return (
        <BWrapper color={color}>
            <span>
                {label}
            </span>
        </BWrapper>
    );
}

KButton.propTypes = {
    color: PropTypes.string,
    label: PropTypes.string.isRequired,
}