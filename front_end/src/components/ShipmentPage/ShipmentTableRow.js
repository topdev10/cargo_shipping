/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import styled from 'styled-components';
import { KButton, KShipStatusBar } from '../Basic';

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

const DueDateActionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 0px 4px 8px;
`;

const DateLabel = styled.span`
    display: flex;
    color: black;
    font-size: 14px;
    padding: 4px 10px;
`;

class ShipmentTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
        };
    }

    componentWillMount() {

    }

    render() {
        const { shipDetail, onViewDetails, isHeader } = this.props;
        // eslint-disable-next-line no-unused-vars
        const { currentStep } = this.state;
        const labels = ["Step1", "Step2", "Step3", "Step4"];
        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div className={isHeader ? '' : 'shipment-table-row'} onClick={e => !isHeader&&onViewDetails(e, shipDetail)}>
                {
                    isHeader&&<CHeaderRow>
                        <BNumWrap style={{fontWeight: "400"}}>Booking Number</BNumWrap>
                        <BDestWrap>Destination</BDestWrap>
                        <BCusWrap></BCusWrap>
                        <BBtnWrap>
                            <span> Status</span>
                            <span> Due Date</span>
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
                        <BCusWrap>
                            <KShipStatusBar labels={labels} currentStep={2} />
                        </BCusWrap>
                        <BBtnWrap>
                            <KButton color="red" label="action required" radius="small"/>
                            <DueDateActionWrapper>
                                <DateLabel>
                                   Dec 10, 2019 
                                </DateLabel>
                                <EditIcon className="MEditButton"/>
                                <DeleteIcon className="MEditButton"/>
                            </DueDateActionWrapper>
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
    isHeader: PropTypes.bool.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default ShipmentTableRow;