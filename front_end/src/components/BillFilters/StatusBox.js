import React, { Component } from 'react';

import "./style.css";

import Explore from '@material-ui/icons/Explore';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MultiSelect from "@khanacademy/react-multi-select";
import Checkbox from 'material-ui/Checkbox';

const muiTheme = getMuiTheme({});
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#80bdff",
        },
    },
});

const options = [
    { value: 1, label: "Past-due" },
    { value: 2, label: "Outstanding" },
    { value: 3, label: "Paid" },
    { value: 4, label: "Voided" },
];

class StatusBox extends Component {

    state = {
        selectedOptions: [],
    };

    handleSelectedChanged = (selectedOptions) => (
        this.setState({ selectedOptions })
    )

    handleUnselectItem = (removedVal) => () => (
        this.setState({
            selectedOptions: this.state.selectedOptions
                .filter(option => option !== removedVal)
        })
    )

    renderOption = ({ checked, option, onClick }) => (
        <Checkbox
            label={option.label}
            onCheck={onClick}
            checked={checked}
            iconStyle={{ fill: '#80bdff' }}
        />
    )

    renderSelected = (selected, properties) => {
        if (!properties.length) {
            return <span>No Status available</span>;
        }

        if (!selected.length) {
            return <span>Select Status</span>;
        }

        if (selected.length === properties.length) {
            return <span>All Status</span>;
        }

        if (selected.length > 3) {
            return <span>Selected {selected.length} users</span>;
        }

    }

    render() {
        const { selectedOptions } = this.state;
        return (
            <div className="container toolkit">
                <div className="row grid-divider">
                    <div className="col-md-2 vcenter">
                        <div className="left-icon">
                            <ThemeProvider theme={theme}>
                                <Explore color='primary' />
                            </ThemeProvider>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="toolbox">
                            <span>Status</span>
                            <MuiThemeProvider muiTheme={muiTheme}>
                                <MultiSelect
                                    options={options}
                                    selected={selectedOptions}
                                    ItemRenderer={this.renderOption}
                                    valueRenderer={this.renderSelected}
                                    onSelectedChanged={this.handleSelectedChanged}
                                    disableSearch
                                />
                            </MuiThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default StatusBox;