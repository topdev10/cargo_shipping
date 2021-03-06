import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { shipsConstants } from '../../constants';
import { pageActions, shipActions } from '../../actions';

import ShipmentTableRow from "./ShipmentTableRow";

import 'rc-steps/assets/index.css';
import './style.css';

const Container = styled.div`
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px - 90px - 124px);
    width: 100%;
    overflow-x: hidden;
`;

class ShipmentsTable extends Component {

    componentDidMount() {
        const { shipments, loadPage } = this.props;
        if(shipments === null) {
            loadPage(shipsConstants.ON_SHIPMENTS);
        }
    }

    handleViewDetails = (e, data) => {
        e.preventDefault();
        const { onViewDetails } = this.props;
        onViewDetails(data);
    }
    
    render() {
        // eslint-disable-next-line react/prop-types
        const { shipments } = this.props;
        return (
            <Container>
                <ShipmentTableRow isHeader />
                { shipments !== null &&
                    shipments.map((shipment)=> (
                        <ShipmentTableRow isHeader={false} key={shipment.id} shipDetail={shipment} onViewDetails={this.handleViewDetails}/>
                    ))
                }
            </Container>
        );
    }
};

function mapStateToProps(state) {
    return {
        shipments: state.ships.shipments,
    };
}

ShipmentsTable.defaultProps = {
    shipments: null,
};

ShipmentsTable.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    shipments: PropTypes.array,
    loadPage: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
    onViewDetails: shipActions.onViewDetails,
};

export default connect(mapStateToProps, actionCreators)(ShipmentsTable);