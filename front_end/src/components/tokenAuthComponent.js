    
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
    @media ${Device.laptop} {
        flex-direction: row;
    }
`;

const Label = styled.h1`
    display: flex;
    font-familiy: 'Rubik';
    flex-direction: column;
    font-size: 18px;
    font-weight: 500;
`;

class TokenAuthComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            token: '',
            requested: props.tokenLoginRequested,
            success: props.tokenLoginSuccess
        };
        // eslint-disable-next-line react/prop-types
        this.state = props.match;
        // console.log(props.params);
    }

    componentDidMount(){
        const { verifyToken } = this.props;
        verifyToken(this.state);
    }

    render() {
        const { requested } = this.state;
        return(
            <Container>
                We are checking your token now...
                {requested && <Label>Loading...</Label>}
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

