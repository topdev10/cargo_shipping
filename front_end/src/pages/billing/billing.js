import React from 'react';
import styled from 'styled-components';
import Device from '../../css/device';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 12px;
    width: 100%;
    left: 0px;
    @media ${Device.laptop} {
        left: 320px;
        width: calc(100% - 320px);
    }
`;

const Billing = () => {
    return (
        <Container>
            This is Billing page
        </Container>
    );
};

export default Billing;