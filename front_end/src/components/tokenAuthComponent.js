    
import React, { Component } from 'react';
// import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { userActions } from '../actions';
import Device from '../css/device';
import { history } from '../helpers';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 64px);
    flex-direction: column;
    min-width: 425px;
    margin-top: 64px;
    @media ${Device.laptop} {
        flex-direction: column;
    }
`;

const PRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: auto;
    width: 100%;
    margin: 10px 0px;
`;

const Label = styled.h1`
    display: flex;
    font-familiy: 'Rubik';
    flex-direction: column;
    font-size: 18px;
    font-weight: 500;
`;

const BackButton = styled.button`
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

class TokenAuthComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        const { match } = this.props;
        const { params } = match;
        const {username, token} = params;
        const { verifyToken } = this.props;
        verifyToken({username, token});
    }

    backToLogin = (e) => {
        e.preventDefault();
        history.push('/landing');
    } 

    render() {
        const { tokenLoginRequested, tokenLoginSuccess } = this.props;
        return(
            <Container>
                <PRow>
                    <Label>We are checking your token now...</Label>
                    {tokenLoginRequested && !tokenLoginSuccess && <Label>Loading...</Label>}
                </PRow>
                <PRow>
                    {tokenLoginSuccess && <Label>Your account is now activated..</Label>}
                    {tokenLoginSuccess && <BackButton onClick={ (e) => this.backToLogin(e)}>Back To Login </BackButton>}
                </PRow>
            </Container>
        );
    }
}

TokenAuthComponent.defaultProps = {
    tokenLoginRequested: false,
    tokenLoginSuccess: false,
};

TokenAuthComponent.propTypes = {
    verifyToken: PropTypes.func.isRequired,
    tokenLoginRequested: PropTypes.bool,
    tokenLoginSuccess: PropTypes.bool,
    match: PropTypes.shape({
        params: PropTypes.shape({
            username: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

function mapStateToProps(state) {
    return {
        tokenLoginRequested: state.auth.tokenLoginRequested,
        tokenLoginSuccess: state.auth.tokenLoginSuccess
    };
}

const actionCreators = {
    verifyToken: userActions.verifyToken,
};

export default connect(mapStateToProps, actionCreators)(TokenAuthComponent);

