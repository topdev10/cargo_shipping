import React, { Component } from 'react';

import "./style.css";

import Search from '@material-ui/icons/Search';

class SearchBox extends Component {
    state = {
    };

    render() {
        return (
            <div className="container toolkit border-primary">
                <div className="row grid-divider ">
                    <div className="col-md-2 vcenter ">
                        <div className="left-icon ">
                            <Search style={{color: "#007bff"}}/>
                        </div>
                    </div>
                    <div className="col-md-10 ">
                        <div className="toolbox">
                            <span>Search</span>
                            <input
                                type="text"
                                className="form-control border-primary"
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
};

export default SearchBox;