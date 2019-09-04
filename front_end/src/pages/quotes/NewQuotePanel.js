import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { quoteActions } from '../../actions';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const PageLabel = styled.div`
    display: flex;
    font-size: 20px;
    font-weight: 600;
    color: black;
`;

const RequestFreightQuoteButton = styled.button`
    display: flex;
    width: 400px;
    height: 52px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0px 0px 15px 0px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;

    &:hover {
        background: #6688e4;
    }
`;

const NewQuotePanel = (props) => {

    const { requestFreightQuote } = props;

    return (
        <Container>
            <PageLabel>
                Request Quote
            </PageLabel>
            <RequestFreightQuoteButton onClick={requestFreightQuote}>
                Request Freight Quote
            </RequestFreightQuoteButton>
        </Container>
    );

};

NewQuotePanel.propTypes = {
    requestFreightQuote: PropTypes.func.isRequired,
};

const actionCreators = {
    requestFreightQuote: quoteActions.requestFreightQuote,
};

export default connect(null, actionCreators)(NewQuotePanel);