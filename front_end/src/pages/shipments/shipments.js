import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    left: 244px;
    margin-top: 64px;
    width: calc(100% - 244px);
    height: calc(100vh - 64px);
    padding: 12px;
`;

const Shipments = () => {
    return (
        <Container>
            This is Shipments page
        </Container>
    );
};

export default Shipments;