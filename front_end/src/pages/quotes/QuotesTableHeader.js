import React from 'react';
import styled from 'styled-components';

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 36px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    color: black;
    border-bottom: 1px solid #ccc;
    padding: 5px 12px;
`;

const NameColumn = styled.div`
    display: flex;
    flex: 1;
`;

const FreightColumn = styled.div`
    display: flex;
    flex: 1;
`;

const CargoStateColumn = styled.div`
    display: flex;
    flex: 2;
`;

const FromColumn = styled.div`
    display: flex;
    flex: 1;
`;

const ToColumn = styled.div`
    display: flex;
    flex: 1;
`;

const DetailsColumn = styled.div`
    display: flex;
    flex: 2;
`;

const SubmittedByColumn = styled.div`
    display: flex;
    flex: 2;
`;

const StatusColumn = styled.div`
    display: flex;
    flex: 1;
`;

const ActionColumn = styled.div`
    display: flex;
    flex: 2;
`;

const QuotesTableHeader = () => {

    return (
        <Container>
            <NameColumn>
                <label>Name</label>
                <ArrowDropDown/>
            </NameColumn>
            <FreightColumn>Freight</FreightColumn>
            <CargoStateColumn>Cargo ready date</CargoStateColumn>
            <FromColumn>From</FromColumn>
            <ToColumn>To</ToColumn>
            <DetailsColumn>Cargo Details</DetailsColumn>
            <SubmittedByColumn>Submitted by</SubmittedByColumn>
            <StatusColumn>Status</StatusColumn>
            <ActionColumn>Action</ActionColumn>
        </Container>
    );

};

export default QuotesTableHeader;