import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';

import LocalShipping from '@material-ui/icons/LocalShipping';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import Flight from '@material-ui/icons/Flight';
import DirectionsBoat from '@material-ui/icons/DirectionsBoat';

import './style.css';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#ec4535',
        },
        primary: {
            main: '#f6ffde',
        }
    },
});

const CustomMarker = (props) => {
    const { type, name } = props;
    return(
        <IconButton>
            <ThemeProvider theme={theme}>
                <div
                    className="pin bounce"
                    style={{ cursor: 'pointer' }}
                    title={name}
                />
                <div className="pulse" />
                {type===1&&<Flight color="primary"/>}
                {type===2&&<DirectionsBoat color="secondary" />}
                {type===3&&<LocalShipping color="secondary"/>}
                {type===4&&<DirectionsWalk color="primary"/>}
            </ThemeProvider>
        </IconButton>
    );
};

CustomMarker.propTypes = {
    type: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default CustomMarker;