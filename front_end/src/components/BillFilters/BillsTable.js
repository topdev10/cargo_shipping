import React, { Component } from 'react';
import GetApp from '@material-ui/icons/GetApp';
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pageConstants } from '../../constants';
import { pageActions } from '../../actions';

const columns = [
    {
        name: 'Invoice #',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Shipment ID',
        selector: 'shipID',
        sortable: true,
    },
    {
        name: 'Date',
        selector: 'date',
        sortable: true,
    },
    {
        name: 'Balance',
        selector: 'balance',
        sortable: true,
    },
    {
        name: '',
        allowOverflow: true,
        cell: () => <div className="">
            <button type="button" className="btn btn-default btn-outline-primary btn-sm">MakePayment</button><button type="button" className="btn btn-link btn-sm"><GetApp></GetApp></button></div>,
    },
    
];

class BillsTable extends Component {
    componentDidMount() {
        const { billings, loadPage } = this.props;
        if(billings === null) {
            loadPage(pageConstants.BILLING);
        }
    }
    
    render() {
        const { billings } = this.props;
        return (
            <div className="w-100 card board">
                {
                    billings!==null?
                        <DataTable
                            columns={columns}
                            data={billings}
                            fixedHeader
                            fixedHeaderScrollHeight="200px"
                        />
                        :<div>Loading</div>
                }
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        billings: state.page.info!==null?state.page.info.billings: null,
    };
}

BillsTable.defaultProps = {
    billings: null,
};

BillsTable.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    billings: PropTypes.array,
    loadPage: PropTypes.func.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
};

export default connect(mapStateToProps, actionCreators)(BillsTable);