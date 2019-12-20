import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Device from '../../css/device';

const BWrapper = styled.div`
    display: flex;
    background: ${props => {
        let background = "#3057f5";
        if( props.color === "blue" || props.color === "default")
            background = "#3057f5";
        if( props.color === "red" )
            background = "#FF0000";
        if( props.color === "green" )
            background = "#27E619";
        if( props.color === "gray" )
            background = "#B9BEC9";
        return background;
    }}
    color: white;
    font-size: 12px;
    border-radius: ${props => {
        let radius = "5px";
        if( props.radius === "circle" || props.radius === "default")
            radius = "20px";
        if( props.radius === "small" )
            radius = "5px";
        return radius;
    }}
    text-transform: uppercase;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 10px 10px;
    line-height: 1;
    box-shadow: 2px 2px 5px #999;

    @media ${Device.laptop} {
        font-size: 14px;
        padding: 10px 10px;
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
    const { color, label, radius } = props;

    return (
        <BWrapper color={color} radius={radius}>
            <span>
                {label}
            </span>
        </BWrapper>
    );
};

KButton.propTypes = {
    color:  PropTypes.string,
    label:  PropTypes.string.isRequired,
    radius: PropTypes.string,
};

export default KButton;