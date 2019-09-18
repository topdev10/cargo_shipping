/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import { Container, Draggable } from 'react-smooth-dnd';

const DADContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    padding: 32px 12px 12px 12px;
`;

const DADHeader = styled.div`
    display: flex;
    align-items: center;
    background: #ccc;
    color: black;
    font-size: 18px;
    height: 42px;
    padding: 5px 10px;
`;

const DADWrapper = styled.div`
    display: flex;
    height: 100%;
    border: 2px solid #ccc;
    overflow-y: auto;
    overflow-x: hidden;
`;

const DADComponent = styled.div`
    display: flex;
    width: calc(100% - 8px);
    flex-direction: row;
    color: black;
    border: 2px solid #ccc;
    cursor: pointer;
    padding: 8px 5px;

    &:hover {
        color: blue;
        cursor: grabbing;
    }
`;

const SelectIcon = styled.span`
    cursor: grab;
`;

const NextButton = styled.div`
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;
    padding: 8px 12px;
    flex: flex-end;
    cursor: pointer;
    text-align: right;
    margin: 8px 0px 0px 0px;

    &:hover {
        background: green;
    }
`;

const DragAndDropComponent = (props) => {
    // eslint-disable-next-line react/prop-types
    const { items, handleDrop } = props;

    return (
        <DADContainer>
            <DADHeader>
                Sort columns for your report
            </DADHeader>
            <DADWrapper>
                <Container dragHandleSelector=".column-drag-handle" style={{width: "100%"}} onDrop={(e) => handleDrop(e)}>
                    {items.map(p => {
                        return (
                            <Draggable key={p.id} style={{width: "100%", padding: "4px", margin: "4px"}}>
                                <DADComponent className="column-drag-handle">
                                    <SelectIcon style={{float:'left', padding:'0 10px'}}>&#x2630;</SelectIcon>
                                    {p.label}
                                </DADComponent>
                            </Draggable>
                        );
                    })}
                </Container>
            </DADWrapper>
            <NextButton>Next</NextButton>
        </DADContainer>
    );
};

export default DragAndDropComponent;