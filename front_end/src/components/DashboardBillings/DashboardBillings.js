import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import MonetizationOn from '@material-ui/icons/MonetizationOn';

import BillingDashboardItem from './BillingDashboardItem';
import { pageActions } from '../../actions';
import { billConstants } from '../../constants';

const Container = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

const NewInvoiceButton = styled.button`
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

const DashboardBillings = (props) => {
    
    const { billings } = props;

    function ViewBillings(event) {
        event.preventDefault();
        const { loadPage } = props;
        loadPage(billConstants.BILLING);
    }

    return (
        <Container>
            <Tab icon={<MonetizationOn />} label="Invoices" disabled/>
            {billings!==null&&
                <BillingDashboardItem billings={billings}></BillingDashboardItem>
            }
            <NewInvoiceButton onClick={ViewBillings}>
                View All Invoices
            </NewInvoiceButton>
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        billings: state.page.info!==null?state.page.info.billings: null,
    };
}

DashboardBillings.defaultProps = {
    billings: null,
};

DashboardBillings.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    billings: PropTypes.array,
    loadPage: PropTypes.func.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
};

export default connect(mapStateToProps, actionCreators)(DashboardBillings);