import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BillingDashboardItem from './BillingDashboardItem';
import { pageActions } from '../../actions';
import { shipsConstants } from '../../constants';

const Container = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0px 10px;
    align-items: center;
`;

const ViewAllShipmentsButton = styled.button`
    width: 160px;
    height: 42px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
    background: #4D7CFE;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 12px;

    &:hover {
        background: #00a8e8;
    }
`;

const TabLabel = styled.div`
    color: black;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    width: 100%;
    text-align: left;
    padding: 8px 10px;
    text-transform: uppercase;
`;

const DashboardBillings = (props) => {
    
    const { shipments } = props;

    return (
        <Container>
            <TabLabel>
                Shipments
            </TabLabel>
            {shipments!==null&&
                <BillingDashboardItem shipments={shipments} />
            }
            {/* <ViewAllShipmentsButton onClick={viewAllShipments}>
                View All Shipments
            </ViewAllShipmentsButton> */}
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        shipments: state.page.info!==null?state.page.info.shipments: null,
    };
}

DashboardBillings.defaultProps = {
    shipments: null,
};

DashboardBillings.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    shipments: PropTypes.array,
    loadPage: PropTypes.func.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
};

export default connect(mapStateToProps, actionCreators)(DashboardBillings);