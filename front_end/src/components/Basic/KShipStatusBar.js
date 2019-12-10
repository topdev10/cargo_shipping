import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Device from '../../css/device';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 24px 0px 0px;
    width: 100%;
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const RoundBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => {
        let color = "gray";
        if( props.active )
            color = "white";
        else color = "gray";
        return color;
    }};
    border-radius: 50%;
    background: ${props => {
        let color = "#BDC9FC";
        if( props.active )
            color = "#BDC9FC";
        else color = "white";
        return color;
    }}
    padding: 14% 0%;
`;

const MLabel = styled.span`
    display: flex;
    color: black;
    font-size: 14px;
`;

const StepWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 30%;
`;

const StepLine = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => {
        let color = "#BDC9FC";
        if( props.active )
            color = "#BDC9FC";
        else color = "gray";
        return color;
    }}
`;

export const KShipStatusBar = (props) => {
    const { labels, currentStep } = props;
    const len = labels.length;

    return (
        <Container>
            {
                labels.map((label, ind) => (
                    (ind+1)!==len?<StepWrapper key={label}>
                        <ItemWrapper>
                            <RoundBox>
                                {(ind+1)}
                            </RoundBox>
                            <MLabel>{label}</MLabel>
                        </ItemWrapper>
                        {
                            currentStep<=ind?<StepLine/>:<StepLine active/>
                        }
                    </StepWrapper>:
                    <StepWrapper style={{width: "35px"}}>
                        <ItemWrapper>
                            <RoundBox>
                                {(ind+1)}
                            </RoundBox>
                            <MLabel>{label}</MLabel>
                        </ItemWrapper>
                    </StepWrapper>
                ))
            }
        </Container>
    );
}