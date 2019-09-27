import React, { Component } from 'react';

import {
    faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ButtonBox extends Component {
    state = {
    };

    render() {
        return (
            <div className="p-1 border2 border-primary bg-light rounded-sm shadow-sm m-auto">
                <div className="input-group">
                    <input className="form-control bg-light" placeholder="Search" />
                    <div className="input-group-append">
                        <button id="button-addon1" type="submit" className="btn btn-link text-primary">
                            <FontAwesomeIcon
                                style={{
                                    color: '#ccc',
                                    fontSize: '20px'
                                }}
                                icon={faSearch}
                                size="lg"
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ButtonBox;