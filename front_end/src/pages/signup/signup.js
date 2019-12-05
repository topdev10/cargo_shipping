import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BackgroundSlider from 'react-background-slider';
import { userActions } from '../../actions';
import Device from '../../css/device';

import IntexFreightShip from '../../images/ship.png';
import IntexFreightTruck from '../../images/truck.png';
import IntexFreightTrain from '../../images/train.png';
import GtIntelBackgroundShip from '../../images/gt-intl-background-ship.jpg';
import GtIntelBackgroundLocal from '../../images/gt-intl-background-local.jpg';
import GtIntelBackgroundAir from '../../images/gt-intl-background-flight.jpg';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    flex-direction: row;
    font-familiy: 'Rubik';
    flex-direction: column;
    background: linear-gradient(45deg, white, transparent);
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
    width: 90%;
    padding: 20px 8px;
    height: 100vh;
    @media ${Device.laptop} {
        width: 60%;
    }
`;

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    width: 100%;
`;

const Comment = styled.div`
    display: flex;
    font-size: 40px;
    color: black;
    width: 100%;
    margin-bottom: 20px;
`;

const SignupRow = styled.div`
    display: flex;
    flex-direction: row;
`;

const SignupRCol = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 10px 15px;
`;

const CLabel = styled.label`
    display: flex;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    width: 100%;
    height: 17px;
    color: black;
    border-radius: 8px;
    margin: 10px 0px 0px 0px;
`;

const InputBox = styled.input`
    display: flex;
    background: #E9EBEF;
    border: 1px solid #E8ECEF;
    width: 100%;
    height: 52px;
    margin: 10px 0px 20px 0px;
    padding: 7px 20px;
    transition: border-color .15s 
    &:hover,
    &.active {
        border: 2px solid #4ec8da;
    }
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const SignupButton = styled.button`
    display: flex;
    flex: 1;
    height: 52px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;
    cursor: pointer;
    padding: 0px 18px;

    &:hover {
        background: #6688e4;
    }
`;

const LoginButton = styled.button`
    display: flex;
    flex: 2;
    height: 52px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #707070;
    cursor: pointer;
    padding: 0px 18px;

    &:hover {
        background: #757575;
    }
`;

const Signup = (props) => {

    const { history, register, verifyCode, registering, registered, codeVerifySent, codeVerified } = props;
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cpassword, setCpassword] = React.useState('');
    const [verificationCode, setVerificationCode] = React.useState('');
    const [contactname, setContactName] = React.useState('');
    const [companyname, setCompanyName] = React.useState('');

    function redirectPage(e, page) {
        if(page === "login") history.push('/login');
        else if(page === 'signup') history.push('/signup');
        else if(page === 'home') history.push('/landing');
    }

    const onClickSignup = () => event => {
        event.preventDefault();

        if(email && password && cpassword && username){
            register({email, username, password, confirm_password: cpassword});
        }
    };

    const handleInput = (type) => event => {
        if(type === "contactname") setContactName(event.target.value);
        if(type === "companyname") setCompanyName(event.target.value);
        if(type === 'email') setEmail(event.target.value);
        if(type === 'username') setUsername(event.target.value);
        if(type === 'password') setPassword(event.target.value);
        if(type === 'cpassword') setCpassword(event.target.value);
        if(type === 'code') setVerificationCode(event.target.value);
    };

    const handleVerify = () => event => {
        event.preventDefault();
        if(verificationCode)
            verifyCode(verificationCode, email);
    };

    let leftShow;
    if((!registering && !registered) || codeVerified){
        leftShow = <LeftSide>
            <Comment>Sign Up</Comment>
            <SignupContainer>
                <SignupRow>
                    <SignupRCol>
                        <CLabel>Contact Name</CLabel>
                        <InputBox type="text" value={contactname} placeholder="i.e. Martin Jones" onChange={ handleInput('contactname') }/>
                    </SignupRCol>
                    <SignupRCol>
                        <CLabel>Company Name</CLabel>
                        <InputBox type="text" value={companyname} placeholder="i.e. Ex Company" onChange={ handleInput('companyname') }/>
                    </SignupRCol>
                    <SignupRCol>
                        <CLabel>Username</CLabel>
                        <InputBox type="text" value={username} placeholder="i.e.1 213 616 3969" onChange={ handleInput('username') }/>
                    </SignupRCol>
                </SignupRow>
                <SignupRow>
                    <SignupRCol>
                        <CLabel>Email Address</CLabel>
                        <InputBox type="text" value={email} placeholder="i.e. martin@ex.com" onChange={ handleInput('email') }/>
                    </SignupRCol>
                    <SignupRCol>
                        <CLabel>Password</CLabel>
                        <InputBox type="password" value={password} placeholder="i.e. Martin123!"onChange={ handleInput('password') }/>
                    </SignupRCol>
                    <SignupRCol>
                        <CLabel>Confirm Password</CLabel>
                        <InputBox type="password" value={cpassword} placeholder="i.e. Martin123!" onChange={ handleInput('cpassword') }/>
                    </SignupRCol>
                </SignupRow>
                
                <BtnWrapper>
                    <LoginButton onClick={(e) => redirectPage(e, 'login')}>SIGN IN</LoginButton>
                    <SignupButton onClick={onClickSignup()}>SIGN UP</SignupButton>
                </BtnWrapper>
                

            </SignupContainer>
        </LeftSide>;
    } else if(registering && !registered){
        leftShow = <LeftSide>
            <CLabel>Email Address</CLabel>
            <InputBox type="text" value={email} onChange={ handleInput('email') }/>
            <CLabel>Username</CLabel>
            <InputBox type="text" value={username} onChange={ handleInput('username') }/>
            <CLabel>Password</CLabel>
            <InputBox type="password" value={password} onChange={ handleInput('password') }/>
            <CLabel>Confirm Password</CLabel>
            <InputBox type="password" value={cpassword} onChange={ handleInput('cpassword') }/>
            <SignupButton onClick={onClickSignup()} disabled>SIGN UP</SignupButton>
            <LoginButton disabled>Wait A Moment...</LoginButton>
        </LeftSide>;
    }
    if(codeVerifySent) {
        leftShow = <LeftSide>
            <CLabel>Input your verification code.</CLabel>
            <InputBox type="text" value={verificationCode} onChange={ handleInput('code') }/>
            <SignupButton onClick={handleVerify()}>Next</SignupButton>
        </LeftSide>;
    }

    return (
        <Container>
            <BackgroundSlider images={[ GtIntelBackgroundAir, GtIntelBackgroundLocal, GtIntelBackgroundShip, IntexFreightShip, IntexFreightTrain, IntexFreightTruck ]}/>
            { leftShow }
            {/* <RightSide>
                <BriefComment>
                    Welcome to Freight-Genius... <br/>
                    We are online shipping company and you can easily ship your goods in time. <br/>
                    We are providing the best guarantee based on credit.
                </BriefComment>
            </RightSide> */}
        </Container>
    );
};

Signup.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    register: PropTypes.func.isRequired,
    verifyCode: PropTypes.func.isRequired,
    registering: PropTypes.bool.isRequired,
    registered: PropTypes.bool.isRequired,
    codeVerifySent: PropTypes.bool.isRequired,
    codeVerified: PropTypes.bool.isRequired,
};

function mapStateToProps(state, props) {
    return {
        history: props.history,
        registering: state.regist.registering,
        registered: state.regist.registered,
        codeVerifySent: state.regist.codeVerifySent,
        codeVerified: state.regist.codeVerified,
    };
}

const actionCreators = {
    register: userActions.register,
    verifyCode: userActions.verifyCode,
};

export default connect(mapStateToProps, actionCreators)(Signup);