import React, { Component } from 'react';
// import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { userActions } from '../actions';
import Device from '../css/device';

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

class LinkedinAuthComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        const { match } = this.props;
        const { params } = match;
        const {email, username} = params;
        const { activateLinkedinUser } = this.props;
        console.log(email, username);
        activateLinkedinUser({email, username});
    }

    backToLogin = (e) => {
        e.preventDefault();
    } 

    render() {
        return(
            <Container>
                <PRow>
                    <Label>Loading...</Label>
                </PRow>
            </Container>
        );
    }
}

LinkedinAuthComponent.propTypes = {
    activateLinkedinUser: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

const actionCreators = {
    activateLinkedinUser: userActions.activateLinkedinUser,
};

export default connect(null,actionCreators)(LinkedinAuthComponent);

