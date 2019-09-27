import React, { Component } from 'react';
import Steps, { Step } from 'rc-steps';

import {
    faStore,
    faShippingFast,
    faPlane,
    faUserTie,
    faCoins
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'rc-steps/assets/index.css';
import './style.css';

class ShipmentTableRow extends Component {

    componentWillMount() {

    }

    render() {
        const { shipDetail } = this.props;
        return (
            <div className="w-100">
                <div className="card board">
                    <div className="row info">
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-3">
                                    <span>
                                        <FontAwesomeIcon
                                            style={{
                                                color: '#ccc',
                                                fontSize: '20px'
                                            }}
                                            icon={faPlane}
                                            size="lg"
                                        />
                                    </span>
                                </div>
                                <div className="col-md-9">
                                    <span>
                                        <b> {shipDetail.plane_id} </b>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <span>
                                        <FontAwesomeIcon
                                            style={{
                                                color: '#ccc',
                                                fontSize: '20px'
                                            }}
                                            icon={faUserTie}
                                            size="lg"
                                        />
                                    </span>
                                </div>
                                <div className="col-md-9">
                                    <span>
                                        <b> {shipDetail.user_id} </b>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <span>
                                        <FontAwesomeIcon
                                            style={{
                                                color: '#ccc',
                                                fontSize: '20px'
                                            }}
                                            icon={faCoins}
                                            size="lg"
                                        />
                                    </span>
                                </div>
                                <div className="col-md-9">
                                    <span>
                                        <b> {shipDetail.load_spec} </b>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <Steps
                                labelPlacement="vertical"
                                current={shipDetail.state}
                                status="error"
                            >
                                <Step
                                    title="1"
                                    description="Beijing Dong Lu 4, 21008"
                                    icon={
                                        <FontAwesomeIcon
                                            style={{ fontSize: '32px' }}
                                            icon={faStore}
                                        />
                                    }
                                />
                                <Step
                                    title="2"
                                    description="Beijing Capital International..."
                                    icon={
                                        <FontAwesomeIcon
                                            style={{ fontSize: '32px' }}
                                            icon={faShippingFast}
                                        />
                                    }
                                />
                                <Step
                                    title="3"
                                    description="Frankfurt am Main Internati.."
                                    icon={
                                        <FontAwesomeIcon
                                            style={{ fontSize: '32px' }}
                                            icon={faShippingFast}
                                        />
                                    }
                                />
                                <Step
                                    title="4"
                                    description="31224 Peine, Germany"
                                    icon={
                                        <FontAwesomeIcon
                                            style={{ fontSize: '32px' }}
                                            icon={faStore}
                                        />
                                    }
                                />
                            </Steps>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShipmentTableRow;