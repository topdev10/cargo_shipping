import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Device from '../../css/device';

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    background: white;
    overflow-y: auto;
    @media ${Device.laptop} {
        height: calc(100% - 48px);
    }
`;

const QuotesItem = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #E8ECEF;
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
        background: #f1f1f1;
        border-radius: 5px;
    }
`;

const QuotesItemRow = styled.div`
    display: flex;
    flex-direction: row;
    font-familiy: 'Rubik';
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
`;

const IDLabel = styled.h1`
    align-items: center;
    font-style: normal;
    font-size: 15px;
    color: #000;
`;

const VendLabel = styled.h1`
    align-items: center;
    font-style: normal;
    font-size: 15px;
    color: #55f;
`;

const CommitLabel = styled.h1`
    font-size: 14px;
    color: black;
    font-weight: 500;
    text-align: left;
`;

class QuotesDashboardItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    render(){
        const { quotes } = this.props;
        return(
            <Container>
                {quotes!==null&&
                // eslint-disable-next-line react/prop-types
                quotes.map((row) => 
                    <QuotesItem key={row.id}>
                        <QuotesItemRow>
                            <IDLabel>{row.id} </IDLabel>
                            <VendLabel> - {row.venderID}</VendLabel>
                        </QuotesItemRow>
                        <CommitLabel>
                            {row.reviewCnt} Quotes Ready for Review
                        </CommitLabel>
                        <CommitLabel>
                            You have {row.newCnt} new Quote(s)
                        </CommitLabel>
                    </QuotesItem>
                )}
            </Container>
        );
    }    
};

QuotesDashboardItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    quotes: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
    return {
        quotes: props.quotes,
    };
};

export default connect(mapStateToProps)(QuotesDashboardItem);