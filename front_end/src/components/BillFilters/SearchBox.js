import React, { Component } from 'react';

import '../BillFilters/style.css';

import Search from '@material-ui/icons/Search';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#80bdff",
        },
    },
});

class SearchBox extends Component {
    state = {
        focus: false
    };
    
    onFocus = () => {
        this.setState({ focus: true });
    };

    onBlur = () => {
        this.setState({ focus: false });
    };

    render() {
        return (
            <div className={"container toolkit " + (this.state.focus ? 'highlight' : '')}>
                <div className={"row grid-divider " + (this.state.focus ? 'highlight' : '')}>
                    <div className="col-md-3 vcenter">
                        <div className="left-icon">
                        <ThemeProvider theme={theme}>
                            <Search color={this.state.focus?'primary':'disabled'} />
                        </ThemeProvider>
                        </div>
                    </div>
                    <div className="col-md-9">
                       <div className="toolbox">
                            <span>Search</span>
                            <input 
                                type="text" 
                                className="form-control"
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                            />
                       </div>
                    </div>
                </div>
                
            </div>
        );
    }
};

export default SearchBox;