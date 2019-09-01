import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { userActions } from '../../actions';
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

const OptionsContainer = styled.div`
    display: flex;
    width: 400px;
    flex-direction: row;
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

const ForgotPasswordBTN = styled.button`
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    text-decoration-line: underline;
    color: #4D7CFE;
    border-radius: 8px;
    float: right;
    cursor: pointer;

    &:hover {
        color: #00a8e8;
    }
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
    margin-bottom: 15px;

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
    margin: 0px 0px 15px 0px;

    &:hover {
        background: #6688e4;
    }
`;

const LoginLinkedInBtn = styled.a`
    display: flex;
    width: 400px;
    height: 52px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0px 0px 15px 0px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;

    &:hover {
        background: #6688e4;
    }
`;

const MLabel = styled.label`
    width: 50%;
    cursor: pointer;
`;

const BLabel = styled.label`
    width: 400px;
    margin: 30px 0px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 17px;
    color: #778CA2;
    border-radius: 8px;
`;

const Login = (props) => {

    const { history, login, forgotPassword, resetPassword, verifyCodeRequested, vCSuccess, cpRequested, cpSuccess } = props;
    const [display, setDisplay] = React.useState("step1");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cpassword, setConfirmPassword] = React.useState('');
    const [code, setCode] = React.useState('');
    let checked = false;

    function redirectPage(e, page) {
        if(page === "login") history.push('/login');
        else if(page === 'signup') history.push('signup');
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
        }
    }

    const handleChange = () => event => {
        const x = event.target.checked;
        checked = x;
    };

    const handleInput = (type) => event => {
        if(type === 'email') setEmail(event.target.value);
        else if(type === 'password') setPassword(event.target.value);
        else if(type === 'cpassword') setConfirmPassword(event.target.value);
        else if(type === 'code') setCode(event.target.value);
    };

    const onClickLogin = () => event => {
        event.preventDefault();

        if(email && password){
            login(email, password, checked);
        }
    };

    const linkedInAuthUri = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86rytomxqk2lfz&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Flinkedin&state=2522abcde12345&scope=r_basicprofile%20r_liteprofile%20r_emailaddress%20w_share";
    let leftShow;
    if(display === "step1" && !cpRequested || cpSuccess)
        leftShow = <LeftSide>
            <CLabel>Email Address(Or Username)</CLabel>
            <InputBox type="text" value={email} onChange={ handleInput('email') }/>
            <CLabel>Password</CLabel>
            <InputBox type="password" value={password} onChange={ handleInput('password') }/>
            <OptionsContainer>
                <MLabel onChange={handleChange()}>
                    <Checkbox
                        value={checked}
                        inputProps={{
                            'aria-label': 'uncontrolled-checkbox',
                        }}
                    />
                    Keep me signed in
                </MLabel>
                <div style={{width: "50%", display: "flex", "flexDirection": "row-reverse"}}>
                    <ForgotPasswordBTN onClick={(e) => resetpassword(e, 'step2')}>Forgot Password</ForgotPasswordBTN>
                </div>
            </OptionsContainer>
            <LoginButton onClick={onClickLogin()}>SIGN IN</LoginButton>
            <SignupButton onClick={(e) => redirectPage(e, 'signup')}>SIGN UP</SignupButton>
            <LoginLinkedInBtn href={linkedInAuthUri}>
                Login With LinkedIn
            </LoginLinkedInBtn>
        </LeftSide>;
    else if(display === "step1" && cpRequested)
        leftShow = <LeftSide>
            <BLabel>Enter New Password</BLabel>
            <CLabel>Password</CLabel>
            <InputBox type="password" value={password} onChange={ handleInput('password') }/>
            <CLabel>Re-enter Password</CLabel>
            <InputBox type="password" value={cpassword} onChange={ handleInput('cpassword') }/>
            <CLabel>Verification Code</CLabel>
            <InputBox type="text" value={code} onChange={ handleInput('code') }/>
            <LoginButton disabled>Waiting...</LoginButton>
        </LeftSide>;
    else if(display === 'step2')
        leftShow = <LeftSide>
            <BLabel>Reset Password</BLabel>
            <CLabel>Email Address</CLabel>
            <InputBox type="text" value={email} onChange={ handleInput('email') }/>
            <LoginButton onClick={(e) => resetpassword(e, 'step3')}>RESET PASSWORD</LoginButton>         
            <ForgotPasswordBTN onClick={(e) => resetpassword(e, 'step1')}>Back to Login</ForgotPasswordBTN>
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
    return (
        <Container>
            {leftShow}
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
};

export default connect(mapStateToProps, actionCreators)(Login);