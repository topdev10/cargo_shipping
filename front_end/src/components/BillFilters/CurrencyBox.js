import React, { Component } from 'react';

import "./style.css";

import Language from '@material-ui/icons/Language';
import Select from 'react-select';

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
                        <Language  style={{color: "#007bff"}}/>
                    </div>
                    <div className="col-md-10">
                        <div className="toolbox">
                            <span>Currency</span>
                            <Select options={options}
                                styles={selectStyle} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CurrencyBox;