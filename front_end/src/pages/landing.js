import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BackgroundSlider from 'react-background-slider';

import GtIntelBackgroundShip from '../images/gt-intl-background-ship.jpg';
import GtIntelBackgroundLocal from '../images/gt-intl-background-local.jpg';
import GtIntelBackgroundAir from '../images/gt-intl-background-flight.jpg';

const Container = styled.div`
    position: relative;
    margin-top: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 64px);
    font-family: 'Open Sans', sans-serif;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 100px;
`;

const Title = styled.h1`
    color: black;
    font-size: 2.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin: 25px 0px;

    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
`;

const ServiceContainer = styled.div`
    display: flex;
    width: 80%;
    height: 60px;
`;

const ServiceItem = styled.div`
    border: 2px solid $eee;
    border-radius: 4px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
`;

// eslint-disable-next-line no-unused-vars
const Paragraph = styled.p`
    color: black;
    font-size: 1rem;
`;

// eslint-disable-next-line no-unused-vars
const DefaultButton = styled.button`
    display: flex;
    background: #F2F4F6;
    border: 1px solid #E8ECEF;
    box-sizing: border-box;
    border-radius: 4px 0px 0px 4px;
    width: 62px;
    height: 46px;
    align-items: center;
    justify-content: center;

    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #778CA2;
    cursor: pointer;
    &:hover {
        background: #FFFFFF;
    }
`;
const Landing = () => {

    // const { history } = props;

    /*
    function redirectPage(e, page) {
        if(page === "login") history.push('/login');
        else if(page === 'signup') history.push('signup');
    }
    */

    return (
        <Container>
            <Wrapper>
                <BackgroundSlider images={[ GtIntelBackgroundAir, GtIntelBackgroundLocal, GtIntelBackgroundShip ]}/>
                <Title>
                    Our Services
                </Title>
                <ServiceContainer>
                    <ServiceItem >We are online shipping company and providing REALTIME-GLOBAL shipping service.</ServiceItem>
                </ServiceContainer>
                <Title>
                    Why Freight-Genius
                </Title>
                <ServiceContainer>
                    <ServiceItem >We are providing 100% GUARANTEE and provide you one time free service under 10kg of goods.</ServiceItem>
                </ServiceContainer>
            </Wrapper>
        </Container>
    );
};

Landing.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

function mapStateToProps(state, props) {
    return {
        history: props.history,
    };
}

export default connect(mapStateToProps)(Landing);