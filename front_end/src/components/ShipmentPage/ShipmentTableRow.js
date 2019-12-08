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
import styled from 'styled-components';
import { KButton } from '../../components/Basic';

import 'rc-steps/assets/index.css';
import './style.css';

const CHeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px 10px;
`;

const CTableRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px 10px;
    width: 100%;
    align-items: center;
`;

const BNumWrap = styled.div`
    display: flex;
    flex: 3;
    color: black;
    font-size: 16px;
    font-weight: 500;
`;

const BDestWrap = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
`;

const BCusWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex: 8;
`;

const BBtnWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 4;
`;

class ShipmentTableRow extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        const { shipDetail, onViewDetails, isHeader } = this.props;
        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div className="w-100 shipment-table-row" onClick={e => !isHeader&&onViewDetails(e, shipDetail)}>
                {/* <div className="card board">
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
                </div> */}
                {
                    isHeader&&<CHeaderRow>
                        <BNumWrap style={{fontWeight: "400"}}>Booking Number</BNumWrap>
                        <BDestWrap>Destination</BDestWrap>
                        <BCusWrap>Customer</BCusWrap>
                        <BBtnWrap>
                            <span> Status</span>
                            <span> Action</span>
                        </BBtnWrap>
                    </CHeaderRow>
                }
                {
                    !isHeader&&<CTableRow>
                        <BNumWrap >45909-09874-099</BNumWrap>
                        <BDestWrap style={{display: "flex", flexDirection: "column"}}>
                            <span>Kenya</span>
                            <span>Mombasa</span>
                        </BDestWrap>
                        <BCusWrap>Customer</BCusWrap>
                        <BBtnWrap>
                            <KButton color="red" label="action required"/>
                            <KButton color="blue" label="edit"/>
                        </BBtnWrap>
                    </CTableRow>
                }
                <div>

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