import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ShipmentDashboardItem from './shipmentDashboardItem';

const Container = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    z-index: 999;
`;

const Header = styled.h1`
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #252631;
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

const ActiveShipments = (props) => {
    
    const { info } = props;

    const { shipments, quotes, billings, reports } = info;

    function viewAllShipments(event) {
        event.preventDefault();
    }

    return (
        <Container>
            <Header>
                Active Shipments
            </Header>
            {info!==null&&shipments!==null&&
                <ShipmentDashboardItem shipments={shipments}></ShipmentDashboardItem>
            }
            <ViewAllShipmentsButton onClick={viewAllShipments}>
                View All Shipments
            </ViewAllShipmentsButton>
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        info: state.page.info,
    };
}

ActiveShipments.defaultProps = {
    info: null,
};

ActiveShipments.propTypes = {
    info: PropTypes.shape({
        shipments: PropTypes.array,
        quotes: PropTypes.array,
        billings: PropTypes.array,
        reports: PropTypes.array,
    }),
};

export default connect(mapStateToProps)(ActiveShipments);