import React from 'react';
import styled from 'styled-components';
import Device from '../../css/device';

import SearchBox from '../../components/BillFilters/SearchBox'
import StatusBox from '../../components/BillFilters/StatusBox'

const Container = styled.div`
    displa: flex;
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

const Billing = () => {
    return (
        <Container>
            <div className="row">
                <div className="col-md-3">
                    <SearchBox />
                </div>
                <div className="col-md-3">
                    <StatusBox />
                </div>
            </div>
        </Container>
    );
};

export default Billing;