import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pageActions } from '../../actions';

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

export class Profile extends React.Component {

    constructor(props){
        super(props);
        const {getProfile} = props;

        getProfile();
    }

    render(){
        const { userProfile, requestedProfile, receivedProfile } = this.props;
        return(
            <Container>
                This is profile page, 
                {requestedProfile&&<div>profile requested</div>}
                <br/>
                {receivedProfile&&<div>profile received</div>}
                <br/>
                {userProfile&&<div>here are the details of user profile</div>}
            </Container>
        );
    }
 
};

Profile.defaultProps = {
    userProfile: null,
};

Profile.propTypes = {
    userProfile: PropTypes.shape({
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        phonenumber: PropTypes.string,
        address: PropTypes.string,
    }),
    requestedProfile: PropTypes.bool.isRequired,
    receivedProfile: PropTypes.bool.isRequired,
    getProfile: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        userProfile: state.page.userProfile,
        requestedProfile: state.page.requestedProfile,
        receivedProfile: state.page.receivedProfile,
    };
}

const actionCreators = {
    getProfile: pageActions.getProfile,
};

export default connect(mapStateToProps, actionCreators)(Profile);