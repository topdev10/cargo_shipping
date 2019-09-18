import React, { Component } from 'react';

import "./style.css";

import DateRange from '@material-ui/icons/DateRange';
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

class DateRangeBox extends Component {

    state = {
    };

    render() {
        return (
            <div className="container toolkit">
                <div className="row grid-divider">
                    <div className="col-md-2 vcenter">
                        <div className="left-icon">
                            <ThemeProvider theme={theme}>
                                <DateRange color='primary'/>
                            </ThemeProvider>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="toolbox">
                            <span>Due date range</span>
                            <Select options={options} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default DateRangeBox;