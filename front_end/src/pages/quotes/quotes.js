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
import Delete from '@material-ui/icons/Delete';
import View from '@material-ui/icons/RemoveRedEye';
import Edit from '@material-ui/icons/Edit';

import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';

import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import DirectionsBoat from '@material-ui/icons/DirectionsBoat';
import LocalShipping from '@material-ui/icons/LocalShipping';
import { white } from 'material-ui/styles/colors';

import { pageConstants, quoteConstants, menuConstants } from '../../constants';
import { pageActions, quoteActions } from '../../actions';
import NewQuotePanel from './NewQuotePanel';
import QuoteDetails from './QuoteDetails';
import Device from '../../css/device';
import CustomToolTip from '../../components/CustomToolTip/CustomToolTip';

import { KButton } from '../../components/Basic';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#ec4535',
        },
        primary: {
            main: '#4d7cfe',
        }
    },
});

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: relative;
    float: left;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 12px;
    overflow: auto;
    min-width: 650px;
    width: 100%;
    left: 0px;
    background: #cccccc40;
    transition: width 1s;
    @media ${Device.laptop} {    
        width: ${props => {
        let width = "100%";
        if(props.menuState === menuConstants.MENU_OPEN)
            width = "calc(100% - 320px)";
        return width;
    }}
    }
`;

const QuotesExplorerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px 18px;
    margin-bottom: 24px;
`;

const QuotesExploreTitle = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
`;

const QuotesTitleContentH1 = styled.span`
    display:  flex;
    font-size: 27px;
    color: black;
    margin-bottom: 10px;
`;

const QuotesTitleContentH2 = styled.span`
    display:  flex;
    font-size: 16px;
    color: #606265;
`;

const QuotesFilterBar = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 8px;
    height: 64px;
    margin-bottom: 8px;
`;

const QuotesFilterInput = styled.input`
    display: flex;
    padding: 8px 18px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 2px 2px 5px #ccc;
    margin-right: ${props => {
        let size = "15px";
        if(props.left)
            size = "auto";
        return size;
    }}
`;

const QuotesFilterBtn = styled.button`
    display: flex;
    padding: 8px 18px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 2px 2px 5px #ccc;
    background: #fff;
    margin-right: 15px;
`;

const QuotesTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 160px);
    border: top: 2px solid #ccc;
    overflow-x: auto;
`;

const HeaderRowLabelContainer = styled.div`
    color: black;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

// Define Custom classes
const styles = (theme) => ({
    CustomTable: {
        borderSpacing: "0 15px",
        padding: "0px 10px",
    },
    CustomTableRow: {
        background: white,
    },
    CustomTableHeaderCol: {
        background: "#f1f1f1",
    },
    CustomTableTDF: {
        borderRadius: "8px 0px 0px 8px",
    },
    CustomTableTDL: {
        borderRadius: "0px 8px 8px 0px",
    }
});

class Quotes extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            quoteState: 0,
            location: "all",
            isflight: true,
            isShip: true,
            isVan: true,
            sortBy: "status",
        };
    }

    componentDidMount(){
        const { quotes, loadPage, token, email } = this.props;
        if(quotes == null){
            loadPage(pageConstants.QUOTES, token, email);
        }
    }

    handleQuoteScopeSelection = (event) => {
        this.setState({quoteState: parseInt(event.target.value, 10)});
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

    onChangeFilterBy = (e, type) => {
        e.preventDefault();
        this.setState({sortBy: type});
    }

    sortArray = (array) => {
        const { sortBy } = this.state;
        const res = array.sort((a,b) => {
            if(sortBy === 'name') return a.shipmentName > b.shipmentName;
            if(sortBy === 'freight') return a.freightMethod - b.freightMethod;
            if(sortBy === 'date') return a.pickupReadyDate > b.pickupReadyDate;
            if(sortBy === 'from') return a.originAddress > b.originAddress;
            if(sortBy === 'to') return a.destAddress > b.destAddress;
            if(sortBy === 'submitted') return a.submittedBy > b.submittedBy;
            if(sortBy === 'status') return a.status - b.status;
            return b.status - a.status;
        });
        return res;
    }

    customFilter = (array) => {
        let result = [];
        const { quoteState, location, isflight, isShip, isVan } = this.state;
        if(array !==null && array.length > 0){
            array.forEach(element => {
                let insertFlag = true;
                if(quoteState!==0 && element.status!== quoteState) insertFlag = false;
                if(element.freightMethod===1&&!isflight) insertFlag=false;
                if(element.freightMethod===2&&!isShip) insertFlag=false;
                if(element.freightMethod===3&&!isVan) insertFlag=false;
                if(location !== "all"){
                    if(location === 'ca' && (!element.originAddress.includes("Canada") && !element.destAddress.includes("Canada")))
                        insertFlag = false;
                    if(location === 'us' && (!element.originAddress.includes("United States") && !element.destAddress.includes("United States")))
                        insertFlag = false;
                    if(location === 'cn' && (!element.originAddress.includes("China") && !element.destAddress.includes("China")))
                        insertFlag = false;
                    if(location === 'au' && (!element.originAddress.includes("Australia") && !element.destAddress.includes("Australia")))
                        insertFlag = false;
                    if(location === 'ru' && (!element.originAddress.includes("Russia") && !element.destAddress.includes("Russia")))
                        insertFlag = false;
                }
                if(insertFlag) result.push(element);
            });
        } else result = null;
        return result;
    }

    onView = (e, quote) => {
        e.preventDefault();
        const{ onViewFreightQuote } = this.props;
        onViewFreightQuote(quote);
    }

    onEdit = (e, quote) => {
        e.preventDefault();
        const{ onEditFreightQuote } = this.props;
        onEditFreightQuote(quote);
    }

    onRemove = (e, quote) => {
        e.preventDefault();
        const{ onRemoveFreightQuote, email, token } = this.props;
        onRemoveFreightQuote(email, quote, token);
    }

    render(){
        const { quoteState, location, isflight, isShip, isVan, sortBy, width } = this.state;
        const { quotes, onpagestatus, menuState, quotePageState, classes } = this.props;
        const mlistData = this.customFilter(quotes);
        return (
            <Container menuState={menuState}>
                {
                    quotePageState==="loading"&&<div>Loading</div>
                }
                {quotePageState!=="loading"&&onpagestatus===0&&<QuotesExplorerHeader>
                    <QuotesExploreTitle>
                        <QuotesTitleContentH1>
                            Shipment Expoloer
                        </QuotesTitleContentH1>
                        <QuotesTitleContentH2>
                            All the active quotes requests are listed here
                        </QuotesTitleContentH2>
                    </QuotesExploreTitle>
                    {width>1024?<KButton label="create a quote" radius="small"/>:<KButton label="create" radius="small"/>}
                </QuotesExplorerHeader>}
                {quotePageState!=="loading"&&onpagestatus===0&&<QuotesFilterBar>
                    <QuotesFilterInput placeholder="Search by ID, Name here" left/>
                    <QuotesFilterBtn>Filter by Booking Dates</QuotesFilterBtn>
                    <QuotesFilterBtn>Sory By</QuotesFilterBtn>
                    <QuotesFilterInput placeholder="Search by ID, Name here"/>
                </QuotesFilterBar>}
                {quotePageState!=="loading"&&onpagestatus===0&&<QuotesTableContainer>
                    <Table className={classes.CustomTable} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.CustomTableHeaderCol} align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "name")}>
                                        Name
                                        { sortBy==='name' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell className={classes.CustomTableHeaderCol} align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "freight")}>
                                        Freight
                                        { sortBy==='freight' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell className={classes.CustomTableHeaderCol} align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "date")}>
                                        Cargo Ready Date
                                        { sortBy==='date' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell className={classes.CustomTableHeaderCol} align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "from")}>
                                        From
                                        { sortBy==='from' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell className={classes.CustomTableHeaderCol} align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "to")}>
                                        To
                                        { sortBy==='to' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell className={classes.CustomTableHeaderCol} align="center">
                                    <HeaderRowLabelContainer>
                                        Cargo Details
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell className={classes.CustomTableHeaderCol} align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "submitted")}>
                                        Submitted By
                                        { sortBy==='submitted' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell className={classes.CustomTableHeaderCol} align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "status")}>
                                        Status
                                        { sortBy==='status' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell className={classes.CustomTableHeaderCol} align="left">
                                    <HeaderRowLabelContainer>
                                        Action
                                    </HeaderRowLabelContainer>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mlistData!=null&&this.sortArray(mlistData).map(row => {
                                return(
                                    <TableRow hover role='checkbox' key={row.id} className={classes.CustomTableRow}>
                                        <TableCell className={classes.CustomTableTDF} align="center" style={{maxWidth: "120px"}}>
                                            {row.shipmentName}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "120px"}}>
                                            {row.freightMethod===1&&<DirectionsBoat />}
                                            {row.freightMethod===2&&<span><FlightTakeoff /><DirectionsBoat /></span>}
                                            {row.freightMethod===3&&<FlightTakeoff />}
                                            {row.freightMethod===4&&<LocalShipping />}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "170px"}}>
                                            {row.pickupReadyDate}
                                        </TableCell>
                                        <TableCell align="center" style={{maxWidth: "115px"}}>
                                            {row.originAddress}
                                        </TableCell>
                                        <TableCell align="center" style={{maxWidth: "110px"}}>
                                            {row.destAddress}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "150px"}}>
                                            {row.cargoweight}{row.cargoUnit?"kg":"lb"} / {row.cargovolume}cbm
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "150px"}}>
                                            {row.submittedBy?row.submittedBy:"You"}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "120px"}}>
                                            {row.status===1&&"Active Quote"}
                                            {row.status===2&&"Quotes Ready"}
                                            {row.status===3&&"Accepted Quote"}
                                            {row.status===4&&"Quotes Expired"}
                                            {!row.status&&"New Quote"}
                                        </TableCell>
                                        <TableCell  className={classes.CustomTableTDL} align="left" style={{minWidth: "100px"}}>
                                            <ThemeProvider theme={theme}>
                                                <CustomToolTip title="View">
                                                    <IconButton color='primary' onClick={e => this.onView(e, row)}>
                                                        <View />
                                                    </IconButton>
                                                </CustomToolTip>
                                                <CustomToolTip title="Edit">
                                                    <IconButton color="primary" onClick={e => this.onEdit(e, row)}>
                                                        <Edit />
                                                    </IconButton>
                                                </CustomToolTip>
                                                <CustomToolTip title="Delete">
                                                    <IconButton color="secondary" onClick={e => this.onRemove(e, row)}>
                                                        <Delete />
                                                    </IconButton>
                                                </CustomToolTip>
                                            </ThemeProvider>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </QuotesTableContainer>}
                {quotePageState!=="loading"&&onpagestatus===1&&<NewQuotePanel></NewQuotePanel>}
                {quotePageState!=="loading"&&onpagestatus===2&&<QuoteDetails></QuoteDetails>}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        quotes: state.quote.quotes,
        onpagestatus: state.quote!==null?state.quote.onpagestatus:0,
        menuState: state.menu.menuState,
        token: state.auth.user.token,
        email: state.auth.user.email,
        quotePageState: state.quote.quotePageState,
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
    menuState: PropTypes.string.isRequired,
    quotePageState: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    onViewFreightQuote: PropTypes.func.isRequired,
    onEditFreightQuote: PropTypes.func.isRequired,
    onRemoveFreightQuote: PropTypes.func.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
    onNewFreightQuote: quoteActions.onNewFreightQuote,
    onRemoveFreightQuote: quoteActions.onRemoveFreightQuote,
    onViewFreightQuote: quoteActions.onViewFreightQuote,
    onEditFreightQuote: quoteActions.onEditFreightQuote,
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(Quotes));