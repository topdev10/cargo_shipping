import React, { Component } from 'react';

import './style.css';

import DateRange from '@material-ui/icons/DateRange';
import Select from 'react-select';

const options = [
    { value: 1, label: 'All dates' },
    { value: 2, label: 'This year' },
    { value: 3, label: 'Last year' },
    { value: 4, label: 'Next Month' },
    { value: 5, label: 'This Month' },
    { value: 6, label: 'Last Month' },
    { value: 7, label: 'Next 7 days' },
    { value: 8, label: 'Custom' }
];

const selectStyle = {
    control: (base, state) => ({
        ...base,
        border: state.isFocused ? 0 : 0,
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
            border: state.isFocused ? 0 : 0
        }
    })
};

class DateRangeBox extends Component {
    state = {};

    render() {
        return (
            <div className="container toolkit border-primary">
                <div className="row grid-divider">
                    <div className="col-md-2 vcenter">
                        <div className="left-icon">
                            <DateRange color="primary" style={{color: "#007bff"}} />
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="toolbox">
                            <span>Due date range</span>
                            <Select
                                className="border-primary"
                                options={options}
                                styles={selectStyle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DateRangeBox;
