import React, { Component } from 'react';

import "./style.css";

import Language from '@material-ui/icons/Language';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Select from 'react-select';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#80bdff",
        },
    },
});

const options = [
    { value: 1, label: "All dates" },
    { value: 2, label: "This year" },
    { value: 3, label: "Last year" },
    { value: 4, label: "Next Month" },
    { value: 5, label: "This Month" },
    { value: 6, label: "Last Month" },
    { value: 7, label: "Next 7 days" },
    { value: 8, label: "Custom" },
];

class CurrencyBox extends Component {

    state = {
    };

    render() {
        return (
            <div className="container toolkit">
                <div className="row grid-divider">
                    <div className="col-md-2 vcenter">
                        <ThemeProvider theme={theme}>
                            <Language color='primary'/>
                        </ThemeProvider>
                    </div>
                    <div className="col-md-10">
                        <div className="toolbox">
                            <span>Currency</span>
                            <Select options={options} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CurrencyBox;