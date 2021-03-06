import React, { Component } from 'react';
import GetApp from '@material-ui/icons/GetApp';
import SettingsApplications from '@material-ui/icons/SettingsApplications';

class ToolBar extends Component {
    state = {
    };

    render() {
        return (
            <div className="w-100 card board" style={{background: "#cccccc40"}}>
                <div className="row">
                    <div className = "col-auto ml-auto">
                        <button type="button" className="btn btn-default btn-outline-primary">
                            <GetApp ></GetApp>
                        </button>
                        <button type="button" className="btn btn-default btn-outline-primary" style={{marginLeft: '10px'}}>
                            <SettingsApplications ></SettingsApplications>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ToolBar;