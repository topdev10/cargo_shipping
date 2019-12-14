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
        let color = "#524ab9";
        if( props.active )
            color = "#524ab9";
        else color = "white";
        return color;
    }}
    padding: 14% 0%;
    border: 1px solid #524ab9;
    z-Index: 100;
`;

const MLabel = styled.span`
    display: flex;
    color: black;
    font-size: 14px;
`;

const StepWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

const StepLine = styled.div`
    display: flex;
    flex: 1;
    height: 6px;
    margin-top: 16px;
    flex-direction: column;
    background: ${props => {
        let color = "#524ab9";
        if( props.active )
            color = "#524ab9";
        else color = "#f7f7f7";
        return color;
    }}
    margin-left: -1px;
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
                            {
                                currentStep>ind?<RoundBox active>
                                    {(ind+1)}
                                </RoundBox>
                                :<RoundBox>
                                    {(ind+1)}
                                </RoundBox>
                            }
                            <MLabel>{label}</MLabel>
                        </ItemWrapper>
                        {
                            currentStep<=ind+1?<StepLine/>:<StepLine active/>
                        }
                    </StepWrapper>:
                    <StepWrapper style={{width: "35px", flex: "inherit"}}>
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