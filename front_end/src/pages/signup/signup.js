import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import background from '../../images/background.jpg';
import Device from '../../css/device';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    flex-direction: row;
    font-familiy: 'Rubik';
    flex-direction: column;
    min-width: 425px;
    @media ${Device.laptop} {
        flex-direction: row;
    }
`;

const LeftSide = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #E5E5E5;
    width: 100%;
    @media ${Device.laptop} {
        width: 50%;
        height: 100vh;
    }
`;

const CLabel = styled.label`
    display: flex;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    width: 400px;
    height: 17px;
    color: #778CA2;
    border-radius: 8px;
    margin: 10px 0px 0px 0px;
`;

const InputBox = styled.input`
    display: flex;
    background: #FFFFFF;
    border: 1px solid #E8ECEF;
    border-radius: 4px;
    width: 400px;
    height: 52px;
    margin: 10px 0px 20px 0px;
    padding: 7px 10px;
    transition: border-color .15s 
    &:hover,
    &.active {
        border: 2px solid #4ec8da;
    }
`;

const RightSide = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    @media ${Device.laptop} {
        display: flex;
        width: 50%;
        height: 100vh;
    }
`;

const BackgroundImage = styled.img`
    display: none;
    width: 100%;
    height: 100%;
`;

const BackgroundCover = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: #4b0a7bd6;
`;

const BriefComment = styled.label`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    padding: 20px;
    right: 0px;
    top: 35%;

    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;

    color: #FFFFFF;

    border-radius: 8px;
`;

const SignupButton = styled.button`
    display: flex;
    width: 400px;
    height: 52px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;
    border-radius: 4px;
    justify-content: center;
    cursor: pointer;

    &:hover {
        color: #00a8e8;
    }
`;

const LoginButton = styled.button`
    display: flex;
    width: 400px;
    height: 52px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;
    border-radius: 4px;
    justify-content: center;
    cursor: pointer;
    margin: 15px 0px 15px 0px;

    &:hover {
        background: #6688e4;
    }
`;

const Signup = (props) => {

    const { history } = props;

    function redirectPage(e, page) {
        if(page === "login") history.push('/login');
        else if(page === 'signup') history.push('signup');
    }

    return (
        <Container>
            <LeftSide>
                <CLabel>Email Address</CLabel>
                <InputBox type="text"/>
                <CLabel>Password</CLabel>
                <InputBox type="text"/>
                <CLabel>Confirm Password</CLabel>
                <InputBox type="text"/>
                <SignupButton>SIGN UP</SignupButton>
                <LoginButton onClick={(e) => redirectPage(e, 'login')}>SIGN IN</LoginButton>
            </LeftSide>
            <RightSide>
                <BackgroundImage src={background} aria="background"/>
                <BackgroundCover></BackgroundCover>
                <BriefComment>
                    Welcome to Freight-Genius... <br/>
                    We are online shipping company and you can easily ship your goods in time. <br/>
                    We are providing the best guarantee based on credit.
                </BriefComment>
            </RightSide>
        </Container>
    );
};

Signup.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

function mapStateToProps(state, props) {
    return {
        history: props.history,
    };
}

export default connect(mapStateToProps)(Signup);