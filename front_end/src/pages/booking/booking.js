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

import { pageConstants } from '../../constants';
import { pageActions } from '../../actions';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: relative;
    float: left;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 12px;
    width: 100%;
    background: #cccccc40;
    transition: width 1s;
`;

const BookingsFilterBar = styled.div`
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

const BookingsTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 150px);
    border: top: 2px solid #ccc;
    overflow-x: auto;
`;

const FreightSelectionButtonLeft = styled.button`

    border: ${props => {
        let border = "2px solid grey";
        if(props.active)
            border = "2px solid #4d7cfe";
        return border;
    }}

    color: ${props => {
        let color = "grey";
        if(props.active)
            color = "#4d7cfe";
        return color;
    }}

    display: flex;
    border-radius: 6px 0px 0px 6px;
    padding: 0px 20px;

    &:hover {
        border: 2px solid #4d7cfe;
        color: #4d7cfe;
    }
`;

const FreightSelectionButtonCenter = styled.button`

    border-top: ${props => {
        let border = "2px solid grey";
        if(props.active)
            border = "2px solid #4d7cfe";
        return border;
    }}

    border-bottom: ${props => {
        let border = "2px solid grey";
        if(props.active)
            border = "2px solid #4d7cfe";
        return border;
    }}
    padding: 0px 20px;

    color: ${props => {
        let color = "grey";
        if(props.active)
            color = "#4d7cfe";
        return color;
    }}

    display: flex;

    &:hover {
        border: 2px 0px 2px 0px solid #576cef;
        color: #4d7cfe;
    }
`;

const FreightSelectionButtonRight = styled.button`

    border: ${props => {
        let border = "2px solid grey";
        if(props.active)
            border = "2px solid #4d7cfe";
        return border;
    }}

    color: ${props => {
        let color = "grey";
        if(props.active)
            color = "#4d7cfe";
        return color;
    }}

    display: flex;
    border-radius: 0px 6px 6px 0px;
    padding: 0px 20px;

    &:hover {
        border: 2px solid #4d7cfe;
        color: #4d7cfe;
    }
`;

const HeaderRowLabelContainer = styled.div`
    color: black;
    cursor: pointer;

    &:hover {
        color: #093eda;
    }
`;

const ViewBookingButton = styled.button`
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
    padding: 0px 20px;
    flex: flex-end;

    &:hover {
        background: #6688e4;
    }
`;

class Booking extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            location: "ca",
            isflight: true,
            isShip: true,
            isVan: true,
            sortBy: "status"
        };
    }

    componentDidMount(){
        const { bookings, loadPage } = this.props;
        if(bookings === null){
            loadPage(pageConstants.BOOKING);
        }
    }

    onChangeFilterBy = (e, type) => {
        e.preventDefault();
        this.setState({sortBy: type});
    }

    sortArray = (array) => {
        const { sortBy } = this.state;
        const res = array.sort((a,b) => {
            if(sortBy === 'name') return a.name > b.name;
            if(sortBy === 'freight') return a.freight - b.freight;
            if(sortBy === 'date') return a.cargoReadyDate > b.cargoReadyDate;
            if(sortBy === 'from') return a.from > b.from;
            if(sortBy === 'to') return a.to > b.to;
            if(sortBy === 'submitted') return a.submittedBy > b.submittedBy;
            if(sortBy === 'status') return a.status - b.status;
            return b.status - a.status;
        });
        return res;
    }

    customFilter = (array) => {
        let result = [];
        const { BookingState, location, isflight, isShip, isVan } = this.state;
        if(array !==null && array.length > 0){
            array.forEach(element => {
                let insertFlag = true;
                if(BookingState!==0 && element.status!== BookingState) insertFlag = false;
                if(element.freight===1&&!isflight) insertFlag=false;
                if(element.freight===2&&!isShip) insertFlag=false;
                if(element.freight===3&&!isVan) insertFlag=false;
                if(location !== "all"){
                    if(location === 'ca' && (!element.from.includes("Canada") && !element.to.includes("Canada")))
                        insertFlag = false;
                    if(location === 'us' && (!element.from.includes("United States") && !element.to.includes("United States")))
                        insertFlag = false;
                    if(location === 'cn' && (!element.from.includes("China") && !element.to.includes("China")))
                        insertFlag = false;
                    if(location === 'au' && (!element.from.includes("Australia") && !element.to.includes("Australia")))
                        insertFlag = false;
                    if(location === 'ru' && (!element.from.includes("Russia") && !element.to.includes("Russia")))
                        insertFlag = false;
                }
                if(insertFlag) result.push(element);
            });
        } else result = null;
        return result;
    }

    render() {
        const { BookingState, location, isflight, isShip, isVan, sortBy } = this.state;
        const { bookings } = this.props;
        const mlistData = this.customFilter(bookings);
        return (
            <Container >
                <BookingsFilterBar>
                    <CustomSelector value={BookingState} onChange={e => this.handleBookingScopeSelection(e)}>
                        <CustomSelectorOption value={0}>All</CustomSelectorOption>
                        <CustomSelectorOption value={1}>Active Bookings</CustomSelectorOption>
                        <CustomSelectorOption value={2}>Ready to Book</CustomSelectorOption>
                        <CustomSelectorOption value={3}>Accepted Bookings</CustomSelectorOption>
                        <CustomSelectorOption value={4}>Expired Bookings</CustomSelectorOption>
                        <CustomSelectorOption value={5}>All Bookings</CustomSelectorOption>
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
                </BookingsFilterBar>
                <BookingsTableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "name")}>
                                        Name
                                        { sortBy==='name' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "freight")}>
                                        Freight
                                        { sortBy==='freight' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "date")}>
                                        Cargo Ready Date
                                        { sortBy==='date' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "from")}>
                                        From
                                        { sortBy==='from' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "to")}>
                                        To
                                        { sortBy==='to' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        Cargo Details
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "submitted")}>
                                        Submitted By
                                        { sortBy==='submitted' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "status")}>
                                        Status
                                        { sortBy==='status' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="left">
                                    <HeaderRowLabelContainer>
                                        Action
                                    </HeaderRowLabelContainer>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mlistData!=null&&this.sortArray(mlistData).map(row => {
                                return(
                                    <TableRow hover role='checkbox' key={row.id}>
                                        <TableCell align="center" style={{maxWidth: "120px"}}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "120px"}}>
                                            {row.freight===1&&<FlightTakeoff />}
                                            {row.freight===2&&<DirectionsBoat />}
                                            {row.freight===3&&<LocalShipping />}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "170px"}}>
                                            {row.cargoReadyDate}
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
                                            {row.status===2&&"Bookings Ready"}
                                            {row.status===4&&"Bookings Expired"}
                                        </TableCell>
                                        <TableCell align="left" style={{minWidth: "200px"}}>
                                            <ViewBookingButton>View Booking</ViewBookingButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </BookingsTableContainer>
                {bookings}
            </Container>
        )
    }
};

function mapStateToProps(state) {
    return {
        bookings: state.bookings?state.bookings.details:null,
    };
}

Booking.defaultProps = {
    bookings: null,
};

Booking.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    bookings: PropTypes.array,
    loadPage: PropTypes.func.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage
};

export default connect(mapStateToProps, actionCreators)(Booking);