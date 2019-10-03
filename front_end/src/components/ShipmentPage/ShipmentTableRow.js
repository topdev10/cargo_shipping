/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import Steps, { Step } from 'rc-steps';
import PropTypes from 'prop-types';

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
        const { shipDetail, onViewDetails } = this.props;
        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div className="w-100 shipment-table-row" onClick={e => onViewDetails(e, shipDetail)}>
                <div className="card board">
                    <div className="row info">
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <span>
                                        <FontAwesomeIcon
                                            style={{
                                                color: 'gray',
                                                fontSize: '20px',
                                                margin: "4px 0px"
                                            }}
                                            icon={faPlane}
                                            size="lg"
                                        />
                                    </span>
                                </div>
                                <div className="col-md-9">
                                    <span>
                                        <b className="shipments-detail-row-label"> {shipDetail.plane_id} </b>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <span>
                                        <FontAwesomeIcon
                                            style={{
                                                color: 'gray',
                                                fontSize: '20px',
                                                margin: "4px 0px"
                                            }}
                                            icon={faUserTie}
                                            size="lg"
                                        />
                                    </span>
                                </div>
                                <div className="col-md-9">
                                    <span>
                                        <b className="shipments-detail-row-label"> {shipDetail.user_id} </b>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <span>
                                        <FontAwesomeIcon
                                            style={{
                                                color: 'gray',
                                                fontSize: '20px',
                                                margin: "4px 0px"
                                            }}
                                            icon={faCoins}
                                            size="lg"
                                        />
                                    </span>
                                </div>
                                <div className="col-md-9">
                                    <span>
                                        <b className="shipments-detail-row-label"> {shipDetail.load_spec} </b>
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

ShipmentTableRow.propTypes = {
    shipDetail: PropTypes.shape({
        plane_id: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
        load_spec: PropTypes.string.isRequired,
        state: PropTypes.number.isRequired,
    }).isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default ShipmentTableRow;