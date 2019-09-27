import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { shipsConstants } from '../../constants';
import { pageActions } from '../../actions';

import ShipmentTableRow from "./ShipmentTableRow";

import 'rc-steps/assets/index.css';
import './style.css';

const Container = styled.div`
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px - 90px);
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
    
    render() {
        // eslint-disable-next-line react/prop-types
        const { shipments } = this.props;
        return (
            <Container>
                { shipments !== null ?
                    shipments.map((shipment)=> (
                        <ShipmentTableRow key={shipment.id} shipDetail={shipment} />
                    ))
                    : <div>Loading</div>
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
    loadPage: PropTypes.func.isRequired
};

const actionCreators = {
    loadPage: pageActions.loadPage,
};

export default connect(mapStateToProps, actionCreators)(ShipmentsTable);