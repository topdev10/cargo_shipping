import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BillingDashboardItem from './BillingDashboardItem';

const Container = styled.div`
    position: relative;
    display: flex;
    height: calc(100% - 48px);
    flex-direction: column;
    z-index: 999;
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

    function NewBilling(event) {
        event.preventDefault();
    }

    return (
        <Container>
            {billings!==null&&
                <BillingDashboardItem billings={billings}></BillingDashboardItem>
            }
            <NewInvoiceButton onClick={NewBilling}>
                New Invoice
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
};

export default connect(mapStateToProps)(DashboardBillings);