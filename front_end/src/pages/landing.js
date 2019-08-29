import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
`;

const Title = styled.h1`
    color: black;
    font-size: 2.5rem;
    font-weight: 700;
`;

const Paragraph = styled.p`
    color: black;
    font-size: 1rem;
`;

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
const Landing = (props) => {

    const { history } = props;

    function redirectPage(e, page) {
        if(page === "login") history.push('/login');
        else if(page === 'signup') history.push('signup');
    }

    return (
        <Container>
            <Wrapper>
                <Title>
                    <span role="img" aria-label="Bolt">
                        ⚡
                    </span>{' '}
                    Freight Genius
                </Title>
                <Paragraph>This is initial setup for Freight Genius</Paragraph>
                <Paragraph>
                    Need to Add details about this site.
                </Paragraph>
                <DefaultButton onClick={(e) => redirectPage(e, 'login')}>Login</DefaultButton>
                <DefaultButton onClick={(e) => redirectPage(e, 'signup')}>Signup</DefaultButton>
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