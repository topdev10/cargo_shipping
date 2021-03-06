import React, { Component } from 'react';
import GetApp from '@material-ui/icons/GetApp';
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { billConstants } from '../../constants';
import { pageActions } from '../../actions';
import './style.css';

const columns = (onMakePayment) => ([
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
        cell: (record) => <div className="">
            {record.status === 1&&
            <button type="button" onClick={() => onMakePayment(record)} className="btn btn-primary btn-outline-default btn-md" disabled>Paid</button>}
            {record.status === 0&&
            <button type="button" onClick={() => onMakePayment(record)} className="btn btn-primary btn-outline-default btn-md">MakePayment</button>}
            <button type="button" className="btn btn-link btn-sm"><GetApp></GetApp></button></div>,
    },
    
]);

class BillsTable extends Component {
    componentDidMount() {
        const { billings, loadPage } = this.props;
        if(billings === null) {
            
            loadPage(billConstants.BILLING);
        }
    }
    
    render() {
        // eslint-disable-next-line react/prop-types
        const { billings, makePayment } = this.props;
        console.log("this is billing aaa",billings );
        return (
            <div className="w-100 card board">
                {
                    billings!==null?
                        <DataTable
                            columns={columns(makePayment)}
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

function mapStateToProps(state, props) {
    return {
        billings: state.page.info!==null?state.bill.billings: null,
        makePayment: props.makePayment
    };
}

BillsTable.defaultProps = {
    billings: null,
};

BillsTable.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    billings: PropTypes.array,
    loadPage: PropTypes.func.isRequired,
    makePayment: PropTypes.func.isRequired
};

const actionCreators = {
    loadPage: pageActions.loadPage,
};

export default connect(mapStateToProps, actionCreators)(BillsTable);