import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';

import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import DirectionsBoat from '@material-ui/icons/DirectionsBoat';
import LocalShipping from '@material-ui/icons/LocalShipping';

import { pageConstants, quoteConstants } from '../../constants';
import { pageActions, quoteActions } from '../../actions';
import NewQuotePanel from './NewQuotePanel';
import QuoteDetails from './QuoteDetails';
import Device from '../../css/device';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 7px;
    overflow: auto;
    min-width: 650px;
    width: 100%;
    left: 0px;
    @media ${Device.laptop} {
        left: 320px;
        width: calc(100% - 320px);
    }
`;

const QuotesFilterBar = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 8px;
    height: 64px;
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    margin-bottom: 8px;
`;

const CustomSelector = styled.select`
    display: flex;
    padding: 3px 8px;
    border-radius: 5px;
    border: 2px solid #576cef;
    margin: 0px 8px;
`;

const CustomSelectorOption = styled.option`
    display: flex;
`;

const QuotesTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 150px);
    border: top: 2px solid #ccc;
    overflow-x: auto;
`;

const FreightSelectionButtonLeft = styled.button`

    border: ${props => {
        let border = "2px solid #576cef";
        if(props.active)
            border = "2px solid #007708";
        return border;
    }}

    background: ${props => {
        let background = "white";
        if(props.active)
            background = "#d3f1ef";
        return background;
    }}

    display: flex;
    border-radius: 6px 0px 0px 6px;
    padding: 0px 8px;

    &:hover {
        border: 2px solid #007708;
        background: #d3f1ef;
    }
`;

const FreightSelectionButtonCenter = styled.button`

    border-top: ${props => {
        let border = "2px solid #576cef";
        if(props.active)
            border = "2px solid #007708";
        return border;
    }}

    border-bottom: ${props => {
        let border = "2px solid #576cef";
        if(props.active)
            border = "2px solid #007708";
        return border;
    }}
    padding: 0px 8px;

    background: ${props => {
        let background = "white";
        if(props.active)
            background = "#d3f1ef";
        return background;
    }}

    display: flex;

    &:hover {
        border: 2px 0px 2px 0px solid #576cef;
        background: #d3f1ef;
    }
`;

const FreightSelectionButtonRight = styled.button`

    border: ${props => {
        let border = "2px solid #576cef";
        if(props.active)
            border = "2px solid #007708";
        return border;
    }}

    background: ${props => {
        let background = "white";
        if(props.active)
            background = "#d3f1ef";
        return background;
    }}

    display: flex;
    border-radius: 0px 6px 6px 0px;
    padding: 0px 8px;

    &:hover {
        border: 2px solid #007708;
        background: #d3f1ef;
    }
`;

const RequestQuoteButton = styled.button`
    position: absolute;
    right: 24px;
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;
    padding: 0px 8px;
    flex: flex-end;
    
    &:hover {
        background: #6688e4;
    }
`;

const ViewQuoteButton = styled.button`
    border-radius: 4px;
    height: 40px;
    justify-content: center;
    align-items: center;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;
    padding: 0px 8px;
    flex: flex-end;

    &:hover {
        background: #6688e4;
    }
`;

const HeaderRowLabelContainer = styled.div`
    color: black;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

class Quotes extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            quoteState: 0,
            location: "ca",
            isflight: false,
            isShip: false,
            isVan: false,
        };
    }

    componentDidMount(){
        const { quotes, loadPage } = this.props;
        if(quotes == null){
            loadPage(pageConstants.QUOTES);
        }
    }

    handleQuoteScopeSelection = (event) => {
        this.setState({quoteState: event.target.value});
    }

    handleLocationSeltion = (event) => {
        this.setState({location: event.target.value});
    }

    onFlightButton = (event) => {
        event.preventDefault();
        const { isflight } = this.state;
        this.setState({isflight: !isflight});
    }

    onShipButton = (event) => {
        event.preventDefault();
        const { isShip } = this.state;
        this.setState({isShip: !isShip});
    }

    onVanButton = (event) => {
        event.preventDefault();
        const { isVan } = this.state;
        this.setState({isVan: !isVan});
    }

    onNewQuote = (event) => {
        event.preventDefault();
        const { onNewFreightQuote } = this.props;
        onNewFreightQuote(quoteConstants.ON_NEW_FREIGHT_QUOTE);
    }

    render(){
        const { quoteState, location, isflight, isShip, isVan } = this.state;
        const { quotes, onpagestatus } = this.props;
        return (
            <Container>
                {onpagestatus===0&&<QuotesFilterBar>
                    <CustomSelector value={quoteState} onChange={e => this.handleQuoteScopeSelection(e)}>
                        <CustomSelectorOption value={0}>All</CustomSelectorOption>
                        <CustomSelectorOption value={1}>Active Quotes</CustomSelectorOption>
                        <CustomSelectorOption value={2}>Ready to Book</CustomSelectorOption>
                        <CustomSelectorOption value={3}>Accepted Quotes</CustomSelectorOption>
                        <CustomSelectorOption value={4}>Expired Quotes</CustomSelectorOption>
                        <CustomSelectorOption value={5}>All Quotes</CustomSelectorOption>
                    </CustomSelector>
                    {isflight?<FreightSelectionButtonLeft active onClick={e => this.onFlightButton(e)}>
                        <FlightTakeoff></FlightTakeoff>
                    </FreightSelectionButtonLeft>:<FreightSelectionButtonLeft onClick={e => this.onFlightButton(e)}>
                        <FlightTakeoff></FlightTakeoff>
                    </FreightSelectionButtonLeft>}
                    
                    {isShip?<FreightSelectionButtonCenter active onClick={e => this.onShipButton(e)}>
                        <DirectionsBoat></DirectionsBoat>
                    </FreightSelectionButtonCenter>:<FreightSelectionButtonCenter onClick={e => this.onShipButton(e)}>
                        <DirectionsBoat></DirectionsBoat>
                    </FreightSelectionButtonCenter>}
    
                    {isVan?<FreightSelectionButtonRight active onClick={e => this.onVanButton(e)}>
                        <LocalShipping></LocalShipping>
                    </FreightSelectionButtonRight>:<FreightSelectionButtonRight onClick={e => this.onVanButton(e)}>
                        <LocalShipping></LocalShipping>
                    </FreightSelectionButtonRight>}
    
                    {/* Location Selctor */}
                    <CustomSelector value={location} onChange={e => this.handleLocationSeltion(e)}>
                        <CustomSelectorOption value='all'>Select a Location</CustomSelectorOption>
                        <CustomSelectorOption value='ca'>Canada</CustomSelectorOption>
                        <CustomSelectorOption value='us'>United States</CustomSelectorOption>
                        <CustomSelectorOption value='cn'>China</CustomSelectorOption>
                        <CustomSelectorOption value='au'>Australia</CustomSelectorOption>
                        <CustomSelectorOption value='ru'>Russia</CustomSelectorOption>
                    </CustomSelector>
                    <RequestQuoteButton onClick={e => this.onNewQuote(e)}>Request Quote</RequestQuoteButton>
                </QuotesFilterBar>}
                {onpagestatus===0&&<QuotesTableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        Name
                                        <ArrowDropDown />
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        Freight
                                        <ArrowDropUp />
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        Cargo Ready Date
                                        <ArrowDropUp />
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        From
                                        <ArrowDropUp />
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        To
                                        <ArrowDropUp />
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        Cargo Details
                                        <ArrowDropUp />
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        Submitted By
                                        <ArrowDropUp />
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        Status
                                        <ArrowDropUp />
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="left">
                                    <HeaderRowLabelContainer>
                                        Action
                                        <ArrowDropUp />
                                    </HeaderRowLabelContainer>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quotes!=null&&quotes.map(row => {
                                return(
                                    <TableRow hover role='checkbox' key={row.id}>
                                        <TableCell align="center" style={{maxWidth: "120px"}}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "120px"}}>
                                            {row.freight}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "170px"}}>
                                            {row.cargoReadyState}
                                        </TableCell>
                                        <TableCell align="center" style={{maxWidth: "115px"}}>
                                            {row.from}
                                        </TableCell>
                                        <TableCell align="center" style={{maxWidth: "110px"}}>
                                            {row.to}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "150px"}}>
                                            {row.cargoDetails}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "150px"}}>
                                            {row.submittedBy}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "120px"}}>
                                            {row.status===1&&"Quotes Ready"}
                                            {row.status===2&&"Quotes Expired"}
                                        </TableCell>
                                        <TableCell align="left" style={{minWidth: "200px"}}>
                                            <ViewQuoteButton>View Quote</ViewQuoteButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </QuotesTableContainer>}
                {onpagestatus===1&&<NewQuotePanel></NewQuotePanel>}
                {onpagestatus===2&&<QuoteDetails></QuoteDetails>}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        quotes: state.page.info!==null?state.page.info.quotes: null,
        onpagestatus: state.quote!==null?state.quote.onpagestatus:0,
    };
}

Quotes.defaultProps = {
    quotes: null,
};

Quotes.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    quotes: PropTypes.array,
    onpagestatus: PropTypes.number.isRequired,
    loadPage: PropTypes.func.isRequired,
    onNewFreightQuote: PropTypes.func.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
    onNewFreightQuote: quoteActions.onNewFreightQuote,
};

export default connect(mapStateToProps, actionCreators)(Quotes);