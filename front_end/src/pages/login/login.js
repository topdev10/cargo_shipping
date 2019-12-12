import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Checkbox from '@material-ui/core/Checkbox';
import BackgroundSlider from 'react-background-slider';
import { userActions, alertActions } from '../../actions';
import Device from '../../css/device';

import GtIntelBackgroundLocal from '../../images/gt-intl-background-local.jpg';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    flex-direction: row;
    font-familiy: 'Rubik';
    flex-direction: column;
    background: linear-gradient(45deg, white, transparent);
    overflow: hidden;
    position: relative;
    @media ${Device.laptop} {
        flex-direction: row;
    }
`;

const BackgroundImage = styled.img`
    position: absolute;
    width: 100%;
`;

const LeftSide = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 8px;
    height: 100vh;
    margin-top: 30px;
    @media ${Device.laptop} {
        width: 40%;
    }
`;

const Comment = styled.div`
    display: flex;
    color: black;
    font-size: 24px;
    padding: 8px 0px 8px 0px;
    width: 100%;
    @media ${Device.laptop} {
        font-size: 40px;
        padding: 0px 0px 20px 0px;
    }
    
    @media (max-height: 768px) {
        font-size: 24px;
        padding: 0px 0px 20px 0px;
    }
`;

const LoginLabel = styled.div`
    font-size: 16px;
    color: black;
    display: flex;
    width: 100%;
`;

const LoginContainer = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`;

const LoginMainContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    border: 1px solid #E9EBEF;
    padding: 10px 10px 0px 10px;
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
    color: #000;
    border-radius: 8px;
    margin: 10px 0px 0px 0px;
`;

const InputBox = styled.input`
    display: flex;
    background: #E9EBEF;
    border: 1px solid #E8ECEF;
    border-radius: 4px;
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

const CustomSelector = styled.select`
    display: flex;
    border-radius: 4px;
    border: 1px solid #E8ECEF;
    margin: 10px 0px 20px 0px;
    padding: 10px 10px;
    width: 100%;
    height: 52px;
    transition: border-color .15s 
    &:hover,
    &.active {
        border: 2px solid #4ec8da;
    }
`;

const CustomSelectorOption = styled.option`
    display: flex;
`;

// const OptionsContainer = styled.div`
//     display: flex;
//     width: 100%;
//     flex-direction: row;
// `;

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

const ForgotPasswordBTN = styled.button`
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    text-decoration-line: underline;
    color: #fff;
    border-radius: 8px;
    float: right;
    cursor: pointer;

    &:hover {
        color: #00a8e8;
    }
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const SignupButton = styled.button`
    display: flex;
    padding: 18px 8px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #3056F5;
    justify-content: center;
    cursor: pointer;
    flex: 1;

    &:hover {
        background: #6688e4;
    }
`;

const LoginButton = styled.button`
    display: flex;
    flex: 2;
    padding: 18px 25px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #707070;
    justify-content: left;
    cursor: pointer;

    &:hover {
        background: #757575;
    }
`;

const MLabel = styled.label`
    width: 50%;
    cursor: pointer;
    color: #74e07d;
`;

const BLabel = styled.label`
width: 100%;
    margin: 30px 0px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 17px;
    color: #74e07d;
    border-radius: 8px;
`;

const LogoWrapper = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`;

const LogoLabelBold = styled.label`
    font-size: 24px;
    color: #3056F5;
    font-family: Roboto;
    font-weight: 500;
`;

const LogoLabelNormal = styled.label`
    font-size: 24px;
    color: #3056F5;
    font-family: Roboto;
    font-weight: 400;
`;

const Login = (props) => {

    const { history, login, forgotPassword, resetPassword, verifyCodeRequested, error, vCSuccess, cpRequested, cpSuccess } = props;
    const [display, setDisplay] = React.useState("step1");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [company, setCompany] = React.useState('GTI');
    const [cpassword, setConfirmPassword] = React.useState('');
    const [code, setCode] = React.useState('');
    let checked = true;

    function redirectPage(e, page) {
        if(page === "login") history.push('/login');
        else if(page === 'signup') history.push('/signup');
    }

    function resetpassword(e, step) {
        if(step === 'step2')
            setDisplay(step);
        else if(step === 'step3'){
            // TODO: send email to User with a link to change password
            forgotPassword(email);
            setDisplay(step);
        } else if(step === 'step1'){
            // TODO: Change password and send request to back-end and redirect to login page or home page
            resetPassword(email, password, cpassword, code);
            setDisplay(step);
        } else setDisplay('step1');
    }

    // it will be used when user click on "Keep me signed in" button
    // const handleChange = () => event => {
    //     const x = event.target.checked;
    //     checked = x;
    // };

    const handleInput = (type) => event => {
        if(type === 'email') setEmail(event.target.value);
        else if(type === 'password') setPassword(event.target.value);
        else if(type === 'cpassword') setConfirmPassword(event.target.value);
        else if(type === 'code') setCode(event.target.value);
    };

    const onClickLogin = () => event => {
        event.preventDefault();

        if(email && password){
            login(email, password, checked, company);
        } else error("Input Email & Password");
    };

    function handleCompanyChanged(e){
        setCompany(e.target.value);
    };

    let leftShow;
    if(display === "step1" && !cpRequested || cpSuccess)
        leftShow = <LeftSide>
            <Comment>
                It's easy to make a Shipment with FreightGenius.
            </Comment>
            <LoginLabel>Let's get started</LoginLabel>
            <LoginContainer>
                <LoginMainContainer>
                    <CLabel>User Name</CLabel>
                    <InputBox type="text" value={email} placeholder="i.e. Martin Jones" onChange={ handleInput('email') }/>
                    <CLabel>Password</CLabel>
                    <InputBox type="password" value={password} placeholder="i.e. MartinJones07!" onChange={ handleInput('password') }/>
                    <CLabel>Company</CLabel>
                    <CustomSelector value={company} onChange={e => handleCompanyChanged(e)}>
                        <CustomSelectorOption value="intexfreight">IntexFreight</CustomSelectorOption>
                        <CustomSelectorOption value="GTI">GTI</CustomSelectorOption>
                        <CustomSelectorOption value="Expotrans">Expotrans</CustomSelectorOption>
                    </CustomSelector>
                {/* <OptionsContainer>
                    <MLabel onChange={handleChange()}>
                        <Checkbox
                            value={checked}
                            inputProps={{
                                'aria-label': 'uncontrolled-checkbox',
                            }}
                            style={{color:'white'}}
                        />
                        Keep me signed in
                    </MLabel>
                    <div style={{width: "50%", display: "flex", "flexDirection": "row-reverse"}}>
                        <ForgotPasswordBTN onClick={(e) => resetpassword(e, 'step2')}>Forgot Password</ForgotPasswordBTN>
                    </div>
                </OptionsContainer> */}
                
                </LoginMainContainer>
                <BtnWrapper>
                    <LoginButton onClick={onClickLogin()}>Login</LoginButton>
                    <SignupButton onClick={(e) => redirectPage(e, 'signup')}>Register</SignupButton>
                </BtnWrapper>
                {/* <BtnWrapper style={{justifyContent: "space-evenly"}}>
                    <LoginLinkedInBtn href={linkedInAuthUri}>
                        Login With LinkedIn
                    </LoginLinkedInBtn>
                    <LoginLinkedInBtn href={linkedInAuthUri}>
                        Login With Facebook
                    </LoginLinkedInBtn>
                    <LoginLinkedInBtn href={linkedInAuthUri}>
                        Login With Google
                    </LoginLinkedInBtn>
                </BtnWrapper> */}
            </LoginContainer>
        </LeftSide>;
    else if(display === "step1" && cpRequested)
        leftShow = <LeftSide>
            <LoginContainer>
                <LoginMainContainer>
                    <BLabel>Enter New Password</BLabel>
                    <CLabel>Password</CLabel>
                    <InputBox type="password" value={password} onChange={ handleInput('password') }/>
                    <CLabel>Re-enter Password</CLabel>
                    <InputBox type="password" value={cpassword} onChange={ handleInput('cpassword') }/>
                    <CLabel>Verification Code</CLabel>
                    <InputBox type="text" value={code} onChange={ handleInput('code') }/>
                </LoginMainContainer>
                <BtnWrapper>
                    <LoginButton disabled>Waiting...</LoginButton>
                </BtnWrapper>
            </LoginContainer>
        </LeftSide>;
    else if(display === 'step2')
        leftShow = <LeftSide>
            <BLabel>Reset Password</BLabel>
            <CLabel>Email Address</CLabel>
            <InputBox type="text" value={email} onChange={ handleInput('email') }/>
            <LoginButton onClick={(e) => resetpassword(e, 'step3')}>RESET PASSWORD</LoginButton>         
            <ForgotPasswordBTN onClick={(e) => resetpassword(e, '')}>Back to Login</ForgotPasswordBTN>
        </LeftSide>;
    else if(display === 'step3' && vCSuccess)
        leftShow = <LeftSide>
            <BLabel>Enter New Password</BLabel>
            <CLabel>Password</CLabel>
            <InputBox type="password" value={password} onChange={ handleInput('password') }/>
            <CLabel>Re-enter Password</CLabel>
            <InputBox type="password" value={cpassword} onChange={ handleInput('cpassword') }/>
            <CLabel>Verification Code</CLabel>
            <InputBox type="text" value={code} onChange={ handleInput('code') }/>
            <LoginButton onClick={(e) => resetpassword(e, 'step1')}>RESET PASSWORD</LoginButton>
        </LeftSide>;
    else if(display === 'step3' && verifyCodeRequested)
        leftShow = <LeftSide>
            <BLabel>Reset Password</BLabel>
            <CLabel>Email Address</CLabel>
            <InputBox type="text" value={email} onChange={ handleInput('email') }/>
            <LoginButton disabled>Wait...</LoginButton>         
            <ForgotPasswordBTN onClick={(e) => resetpassword(e, 'step1')}>Back to Login</ForgotPasswordBTN>
        </LeftSide>;
    else if(display === 'step3' && !verifyCodeRequested)
        leftShow = <LeftSide>
            <BLabel>Reset Password</BLabel>
            <CLabel>Email Address</CLabel>
            <InputBox type="text" value={email} onChange={ handleInput('email') }/>
            <LoginButton onClick={(e) => resetpassword(e, 'step3')}>RESET PASSWORD</LoginButton>         
            <ForgotPasswordBTN onClick={(e) => resetpassword(e, 'step1')}>Back to Login</ForgotPasswordBTN>
        </LeftSide>;

    // let backgroundImages;
    // if(company === 'intexfreight'){
    //     backgroundImages = <BackgroundSlider images={[ IntexFreightShip, IntexFreightTrain, IntexFreightTruck ]} />;
    // }
    // else if (company === 'GTI'){
    //     backgroundImages = <BackgroundSlider images={[ GtIntelBackgroundAir, GtIntelBackgroundLocal, GtIntelBackgroundShip ]}/>;
    // }
    return (
        <Container >
            <BackgroundSlider images={[ GtIntelBackgroundLocal ]} duration={3600} transition={0} />
            <LogoWrapper>
                <LogoLabelBold>
                    Freight
                </LogoLabelBold>
                <LogoLabelNormal>
                    Genius
                </LogoLabelNormal>
            </LogoWrapper>
            {leftShow}
            <RightSide>
            </RightSide>
        </Container>
    );
};

Login.defaultProps = {
    verifyCodeRequested: false,
    vCSuccess: false,
    cpRequested: false,
    cpSuccess: false,
};

Login.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    login: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
    resetPassword:  PropTypes.func.isRequired,
    verifyCodeRequested: PropTypes.bool,
    vCSuccess: PropTypes.bool,
    cpRequested: PropTypes.bool,
    cpSuccess: PropTypes.bool,
    error:PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
    return {
        history: props.history,
        loggingIn: state.auth.loggingIn,
        verifyCodeRequested: state.auth.verifyCodeRequested,
        vCSuccess: state.auth.vCSuccess,
        cpRequested: state.auth.cpRequested,
        cpSuccess: state.auth.cpSuccess
    };
}

const actionCreators = {
    login: userActions.login,
    forgotPassword: userActions.forgotPassword,
    resetPassword: userActions.resetPassword,
    error: alertActions.error,
};

export default connect(mapStateToProps, actionCreators)(Login);