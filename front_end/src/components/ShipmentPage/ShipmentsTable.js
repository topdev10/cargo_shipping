import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shipsConstants } from '../../constants';
import { pageActions } from '../../actions';

import ShipmentTableRow from "./ShipmentTableRow";

import 'rc-steps/assets/index.css';
import './style.css';

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
            <div>
                { shipments !== null ?
                    shipments.map((shipment)=> (
                        <ShipmentTableRow key={shipment.id} shipDetail={shipment} />
                    ))
                    : <div>Loading</div>
                }
            </div>
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