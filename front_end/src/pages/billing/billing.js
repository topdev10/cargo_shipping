import React from 'react';
import styled from 'styled-components';

import Device from '../../css/device';
import SearchBox from '../../components/BillFilters/SearchBox';
import StatusBox from '../../components/BillFilters/StatusBox';
import DateRangeBox from '../../components/BillFilters/DateRangeBox';
import CurrencyBox from '../../components/BillFilters/CurrencyBox';
import ToolBar from '../../components/BillFilters/ToolBar';
import BillsTable from '../../components/BillFilters/BillsTable';

import "./style.css";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 12px;
    width: 100%;
    left: 0px;
    @media ${Device.laptop} {
        left: 320px;
        width: calc(100% - 320px);
    }
`;

// eslint-disable-next-line react/prefer-stateless-function
class Billing extends React.Component {
    render() {
        return (
            <Container>
                <ToolBar />
                <div className="w-100 card board">
                    <div className="row">
                        <div className="col-md-3">
                            <SearchBox />
                        </div>
                        <div className="col-md-3">
                            <StatusBox />
                        </div>
                        <div className="col-md-3">
                            <DateRangeBox />
                        </div>
                        <div className="col-md-3">
                            <CurrencyBox />
                        </div>
                    </div>
                </div>
                <BillsTable />
            </Container>
        );
    }
}

export default Billing;