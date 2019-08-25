import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
`;

const Landing = () => (
    <Container>
        This is Landing Page
    </Container>
);

export default Landing;