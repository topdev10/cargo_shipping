import React from 'react';
import styled from 'styled-components';

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 36px;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    color: black;
    border-bottom: 1px solid #ccc;
    align-items: center;
    padding: 5px 12px;
`;

const NameColumn = styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const FreightColumn = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const CargoStateColumn = styled.div`
    display: flex;
    align-items: center;
    flex: 2;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const FromColumn = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const ToColumn = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const DetailsColumn = styled.div`
    display: flex;
    align-items: center;
    flex: 2;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const SubmittedByColumn = styled.div`
    display: flex;
    align-items: center;
    flex: 2;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const StatusColumn = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const ActionColumn = styled.div`
    display: flex;
    align-items: center;
    flex: 2;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const QuotesTableHeader = () => {

    return (
        <Container>
            <NameColumn>
                Name
                <ArrowDropDown />
            </NameColumn>
            <FreightColumn>
                Freight
                <ArrowDropUp />
            </FreightColumn>
            <CargoStateColumn>
                Cargo ready date
                <ArrowDropUp />
            </CargoStateColumn>
            <FromColumn>
                From
                <ArrowDropUp />
            </FromColumn>
            <ToColumn>
                To
                <ArrowDropUp />
            </ToColumn>
            <DetailsColumn>
                Cargo Details
                <ArrowDropUp />
            </DetailsColumn>
            <SubmittedByColumn>
                Submitted by
                <ArrowDropUp />
            </SubmittedByColumn>
            <StatusColumn>
                Status
                <ArrowDropUp />
            </StatusColumn>
            <ActionColumn>
                Action
                <ArrowDropUp />
            </ActionColumn>
        </Container>
    );
};

export default QuotesTableHeader;