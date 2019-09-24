import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '../../css/device';

import { menuConstants } from '../../constants';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: relative;
    float: left;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 12px;
    width: 100%;
    background: #cccccc40;
    transition: width 1s;
    @media ${Device.laptop} {    
        width: ${props => {
        let width = "100%";
        if(props.menuState === menuConstants.MENU_OPEN)
            width = "calc(100% - 320px)";
        return width;
    }}
    }
`;

const Booking = (props) => {
    const { menuState } = props;
    return (
        <Container menuState={menuState}>
            This is Booking page
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        menuState: state.menu.menuState,
    };
}

Booking.propTypes = {
    menuState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Booking);