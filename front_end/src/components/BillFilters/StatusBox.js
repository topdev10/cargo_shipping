import React, { Component } from 'react';

import '../BillFilters/style.css';

import Explore from '@material-ui/icons/Explore';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import MultiSelect from "@khanacademy/react-multi-select";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#80bdff",
        },
    },
});

const options = [
    {label: "One", value: 1},
    {label: "Two", value: 2},
    {label: "Three", value: 3},
];

class StatusBox extends Component {

    state = {
        focus: false,
        selected: [],
    };
    
    onFocus = () => {
        // this.setState({ focus: true });
    };

    onBlur = () => {
        this.setState({ focus: false });
    };

    render() {
        const {selected} = this.state;
        return (
            <div className={"container toolkit " + (focus ? 'highlight' : '')}>
                <div className={"row grid-divider " + (focus ? 'highlight' : '')}>
                    <div className="col-md-3 vcenter">
                        <div className="left-icon">
                            <ThemeProvider theme={theme}>
                                <Explore color={focus ? 'primary' : 'disabled'} />
                            </ThemeProvider>
                        </div>
                    </div>
                    <div className="col-md-9">
                            <span>Status</span>
                            <MultiSelect
                                options={options}
                                selected={selected}
                                onSelectedChanged={selected => this.setState({selected})}
                            />
                    </div>
                </div>
            </div>
        );
    }
};

export default StatusBox;