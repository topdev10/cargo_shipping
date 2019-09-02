import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 55%;
    flex-direction: column;
    z-index: 999;
`;

const Header = styled.h1`
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #252631;
`;

const ViewAllShipmentsButton = styled.button`
    width: 160px;
    height: 42px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
    background: #4D7CFE;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background: #00a8e8;
    }
`;

const ActiveShipments = () => {
    
    function viewAllShipments(event) {
        event.preventDefault();
    }

    return (
        <Container>
            <Header>
                Active Shipments
            </Header>
            <ViewAllShipmentsButton onClick={viewAllShipments}>
                View All Shipments
            </ViewAllShipmentsButton>
        </Container>
    );
};

export default ActiveShipments;