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
    { value: 1, label: "All Currencies" },
    { value: 2, label: "USD" },
    { value: 3, label: "EUR" },
    { value: 4, label: "CNY" },
    { value: 5, label: "GBP" },
    { value: 6, label: "JPY" },
    { value: 7, label: "HKD" },
    { value: 8, label: "CAD" },
    { value: 9, label: "AUD" },
    { value: 10, label: "KRW" },
    { value: 11, label: "NZD" },
    { value: 12, label: "SEK" },
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