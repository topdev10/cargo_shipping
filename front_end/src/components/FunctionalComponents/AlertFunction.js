import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import styled from 'styled-components';

import { alertActions } from '../../actions';
import { alertConstants } from '../../constants';

const Mbutton = styled.div`
    display: none;
    position: fixed;
    top: 100px;
    right: 100px;
    width: 100px;
    height: 40px;
    z-index: 99999;

    border: 2px solid red;
    border-radius: 4px;
    background : white;
    &:hover {
        background : black;
    }
`;

const AlertFunction = (props) => {

    let cnt = 0;
    const Alert = useAlert();

    const { clear, alert } = props;

    if(cnt === 0){
        if(alert!==null||alert!=='undefined'){
            switch(alert.type){
            case alertConstants.SUCCESS:
                Alert.success(alert.message);
                break;
            case alertConstants.ERROR:
                Alert.error(alert.message);
                break;
            case alertConstants.NOTIFICATION:
                Alert.info(alert.message, {
                    timeout: 5000,
                    onOpen: () => {
                        console.log("You have new Notification");
                    },
                    onClose: () => {
                        console.log("You closed New Notification");
                    }
                });
                break;
            default:
                Alert.info(alert.message);
                break;
            }
        }
        cnt += 1;
        clear();
    }

    function showAlert(){
        Alert.show(alert!==null?alert.message:"you have no message");
    }

    return (
        <Mbutton onClick={showAlert}>
            Click me
        </Mbutton>
    );
};

AlertFunction.defaultProps = {
    alert: null,
};

AlertFunction.propTypes = {
    alert: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
    }),
    clear: PropTypes.func.isRequired,
};

function mapStateToAlert(state) {
    return {
        alert: state.alert,
    };
}

const actionCreators = {
    clear: alertActions.clear,
};

export default connect(mapStateToAlert, actionCreators)(AlertFunction);