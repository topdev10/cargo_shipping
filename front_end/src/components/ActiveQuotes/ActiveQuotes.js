import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tab from '@material-ui/core/Tab';
import AssignmentRounded from '@material-ui/icons/AssignmentRounded';

import QuotesDashboardItem from './quotesDashboardItem';
import { pageActions } from '../../actions';
import { pageConstants } from '../../constants';

const Container = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    margin: 0px 10px;
`;

const NewQuotesButton = styled.button`
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

const TabLabel = styled.div`
    color: black;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    width: 100%;
    text-align: left;
    padding: 8px 10px;
    text-transform: uppercase;
`;

class ActiveQuotes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        const { quotes, loadPage, email, token } = this.props;
        if( quotes === null)
            loadPage(pageConstants.DASHBOARD, token, email);
    }

    viewAllQuotes = (event) => {
        event.preventDefault();
        const { loadPage, email, token } = this.props;
        loadPage(pageConstants.QUOTES, token, email);
    }

    render() {
        const { quotes } = this.props;
        return (
            <Container>
                <TabLabel>
                    Quotes
                </TabLabel>
                {quotes!==null&&
                    <QuotesDashboardItem quotes={quotes}></QuotesDashboardItem>
                }
                <NewQuotesButton onClick={e => this.viewAllQuotes(e)}>
                    View All Quotes
                </NewQuotesButton>
            </Container>
        );
    };
};

function mapStateToProps(state) {
    return {
        quotes: state.quote.quotes,
        email: state.auth.user.email,
        token: state.auth.user.token,
    };
}

ActiveQuotes.defaultProps = {
    quotes: null,
};

ActiveQuotes.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    quotes: PropTypes.array,
    loadPage: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
};

export default connect(mapStateToProps, actionCreators)(ActiveQuotes);