import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    left: 180px;
    margin-top: 64px;
    width: calc(100% - 180px);
    height: calc(100vh - 64px);
    padding: 12px;
`;

const Dashboard = () => {
    return (
        <Container>
            This is Dashboard
        </Container>
    );
};

export default Dashboard;