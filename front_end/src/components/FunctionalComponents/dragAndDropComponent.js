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
    overflow: auto;
`;

const DragAndDropComponent = (props) => {
    // eslint-disable-next-line react/prop-types
    const { items, handleDrop } = props;

    return (
        <DADContainer>
            <Container dragHandleSelector=".column-drag-handle" onDrop={(e) => handleDrop(e)}>
                {items.map(p => {
                    return (
                        <Draggable key={p.id}>
                            <div className="draggable-item">
                                <span className="column-drag-handle" style={{float:'left', padding:'0 10px'}}>&#x2630;</span>
                                {p.label}
                            </div>
                        </Draggable>
                    );
                })}
            </Container>
        </DADContainer>
    );
};

export default DragAndDropComponent;