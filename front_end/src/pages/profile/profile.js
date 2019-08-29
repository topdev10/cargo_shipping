import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../../actions';

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

const Profile = (props) => {
    return(
        <Container>
            This is profile page, 
        </Container>
    );
};

Profile.propTypes = {

};

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(Profile);