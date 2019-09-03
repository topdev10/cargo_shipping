import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashboardReportsItem from './DashboardReportsItem';

const Container = styled.div`
    position: relative;
    display: flex;
    height: calc(100% - 48px);
    flex-direction: column;
    z-index: 999;
`;

const NewReportsButton = styled.button`
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

const DashboardReports = (props) => {
    
    const { reports } = props;

    function newReports(event) {
        event.preventDefault();
    }

    return (
        <Container>
            {reports!==null&&
                <DashboardReportsItem reports={reports}></DashboardReportsItem>
            }
            <NewReportsButton onClick={newReports}>
                New Reports
            </NewReportsButton>
        </Container>
    );
};

function mapStateToProps(state) {
    return {
        reports: state.page.info!==null?state.page.info.reports: null,
    };
}

DashboardReports.defaultProps = {
    reports: null,
};

DashboardReports.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    reports: PropTypes.array,
};

export default connect(mapStateToProps)(DashboardReports);