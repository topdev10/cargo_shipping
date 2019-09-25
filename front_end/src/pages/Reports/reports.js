/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-const */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Input from '@material-ui/core/Input';
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
import { withStyles } from '@material-ui/core/styles';

import { pageConstants, menuConstants } from '../../constants';
import { pageActions, reportActions } from '../../actions';

import Device from '../../css/device';
import NewReport from './NewReport';
import ExistingReport from './ExistingReport';
import Fade from '../../components/FunctionalComponents/fade';
import TreeMultiSelector from '../../components/FunctionalComponents/treeMultiSelector';
import DragAndDropComponent from '../../components/FunctionalComponents/dragAndDropComponent';
import { applyDrag } from '../../components/FunctionalComponents/utils';

const styles = theme => ({
    modal: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
    padding: 7px;
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

const ReportsContainerRow = styled.div`
    justify-content: center;
    margin-bottom: 12px;
`;

const NewReportContainer = styled.div`
    display: flex;
    background: #fff;
    width: calc(100vw - 24px);
    height: calc(100vh - 18px);
    border-radius: 12px;
    border: 2px solid #ccc,
    boxShadow: 2px,
    padding: 12px,
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media ${Device.laptop} {
        width: calc(72vw - 128px);
        height: calc(90vh - 96px);
    }
`;

const SettingsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    flex: 1;
`;

const NewReportInputContainer = styled.div`
    margin-top: 24px;
    position: relative;
    display: flex;
    background: #fff;
    border-radius: 12px;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`;

const NewQuoteInputRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0px 25px;
    justify-content: space-between;
`;

const ReportsTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 150px);
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

const reportNodes = [
    {
        value: 'all',
        label: 'SELECT ALL',
        children: [
            {
                value: 'container',
                label: 'Container Details',
                children: [
                    {
                        value: 'containerNumber',
                        label: 'Container Number',
                    },
                    {
                        value: 'containerType',
                        label: 'Container Type',
                    },
                    {
                        value: 'sealNumber',
                        label: 'Seal Number',
                    },
                    {
                        value: 'grossWeight',
                        label: 'Gross Weight(kg)',
                    },
                    {
                        value: 'cargoDetails',
                        label: 'Cargo Details(LCL only)',
                    },
                ],
            },
            {
                value: 'shipment',
                label: 'Shipment Details',
                children: [
                    {
                        value: 'shipmentID',
                        label: 'Shipment ID',
                    },
                    {
                        value: 'shipmentStatus',
                        label: 'Shipment Status',
                    },
                    {
                        value: 'customerReference',
                        label: 'Customer Reference',
                    },
                    {
                        value: 'additionalInformation',
                        label: 'Additional Information',
                    },
                    {
                        value: 'transportMode',
                        label: 'Transport Mode',
                    },
                    {
                        value: 'transportType',
                        label: 'Transport Type(FLC/LCL)',
                    },
                    {
                        value: 'bookingdate',
                        label: 'Booking Date',
                    },
                    {
                        value: 'incoterm',
                        label: 'Incoterm',
                    },
                    {
                        value: 'pickupCName',
                        label: 'Pickup Company Name',
                    },
                    {
                        value: 'deliveryCName',
                        label: 'Delivery Company Name',
                    },
                    {
                        value: 'shipperCName',
                        label: 'Shipper / Company Name',
                    },
                ],
            },
        ],
    }
];

class Reports extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            onNewReport: false,
            filterList: [],
            reportTitle: "",
            location: "ca",
            isflight: true,
            isShip: true,
            isVan: true,
            // eslint-disable-next-line react/no-unused-state
            sortBy: "status",
        };
    }

    componentDidMount(){
        const { reports, loadPage } = this.props;
        if(reports === null){
            loadPage(pageConstants.REPORTS);
        }
    }
    
    onNewReport = () => {
        this.setState({ onNewReport: true });
    }

    handleCloseNewReport = () => {
        this.setState({ onNewReport: false });
    };

    handleCloseNewReportInput = () => {
        this.setState({ onNewReport: false });
    }

    onEditReport = () => {
        // alert("do you want to edit existing report?");
    }

    onRemoveReport = () => {
        // alert("do you want to remove existing report?");
    }

    handleCheckedStateChanged = (checked) => {
        // eslint-disable-next-line react/destructuring-assignment
        let tmpList = [];
        let i = 0;
        checked.forEach(item => {
            tmpList.push({
                id: i,
                value: item,
                label: this.getLabel(item)
            });
            i += 1;
        });
        this.setState({filterList: tmpList});
    };

    onHandleDrop = (e) => {
        const { filterList } = this.state;
        this.setState({ filterList: applyDrag(filterList, e)});
    }

    handleRequestNewReport = () => {
        // eslint-disable-next-line react/prop-types
        const { requestNewQuote, report } = this.props;
        requestNewQuote(report);
    }

    sortArray = (array) => {
        const { sortBy } = this.state;
        const res = array.sort((a,b) => {
            if(sortBy === 'venderid') return a.venderID > b.venderID;
            if(sortBy === 'containertype') return a.containerType - b.containerType;
            if(sortBy === 'createdat') return a.createdat > b.createdat;
            if(sortBy === 'incoterm') return a.incoterm > b.incoterm;
            if(sortBy === 'pickup') return a.pickupCompanyName > b.pickupCompanyName;
            if(sortBy === 'delievered') return a.delieveryCompanyName > b.delieveryCompanyName;
            if(sortBy === 'shippedby') return a.shipperCompanyName - b.shipperCompanyName;
            return b.shipperCompanyName - a.shipperCompanyName;
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

    getLabel = (value) => {
        let result = "";
        switch(value){
        case "containerNumber":
            result = "Container Number";
            break;
        case "containerType":
            result = "Container Type";
            break;
        case "sealNumber":
            result = "Seal Number";
            break;
        case "grossWeight":
            result = "Gross Weight(kg)";
            break;
        case "cargoDetails":
            result = "Cargo Details(LCL only)";
            break;
        case "shipmentID":
            result = "Shipment ID";
            break;
        case "shipmentStatus":
            result = "Shipment Status";
            break;
        case "customerReference":
            result = "Customer Reference";
            break;
        case "additionalInformation":
            result = "Additional Information";
            break;
        case "transportMode":
            result = "Transport Mode";
            break;
        case "transportType":
            result = "Transport Type(FLC/LCL)";
            break;
        case "bookingdate":
            result = "Booking Date";
            break;
        case "incoterm":
            result = "Incoterm";
            break;
        case "pickupCName":
            result = "Pickup Company Name";
            break;
        case "deliveryCName":
            result = "Delivery Company Name";
            break;
        case "shipperCName":
            result = "Shipper / Company Name";
            break;
        default:
            result = "";
            break;
        }
        return result;
    };

    onChangeReportTitle = (e) => {
        this.setState({reportTitle: e.target.value});
    }

    onChangeFilterBy = (e, type) => {
        e.preventDefault();
        this.setState({sortBy: type});
    }

    render(){

        // eslint-disable-next-line react/prop-types
        const { classes, reports, menuState } = this.props;
        const { onNewReport, filterList, reportTitle } = this.state;
        const { quoteState, location, isflight, isShip, isVan, sortBy } = this.state;

        const FadeComponent = <Fade in={onNewReport}>
            <NewReportContainer>
                <NewReportInputContainer>
                    <NewQuoteInputRow>
                        <div style={{ width: "112px" }}>Report Title: </div>
                        <Input
                            value={reportTitle}
                            onChange={e => this.onChangeReportTitle(e)}
                            label="Report Title"
                            inputProps={{
                                'aria-label': 'description',
                            }}
                            id="report-title"
                            fullWidth
                        />
                    </NewQuoteInputRow>
                </NewReportInputContainer>
                
                <SettingsContainer>
                    <TreeMultiSelector reportNodes={reportNodes} handleChecked={this.handleCheckedStateChanged} handleCancel={this.handleCloseNewReport} />
                    <DragAndDropComponent items={filterList} handleDrop={this.onHandleDrop} handleNext={this.handleNextStep}/>
                </SettingsContainer>
            </NewReportContainer>
        </Fade>;
        return (
            <Container>
                <ReportsTableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "venderid")}>
                                        VenderId
                                        { sortBy==='venderid' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "containertype")}>
                                        ContainerType
                                        { sortBy==='containertype' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "createdat")}>
                                        Created At
                                        { sortBy==='createdat' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "incoterm")}>
                                        Incoterm
                                        { sortBy==='from' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "pickup")}>
                                        PickUp
                                        { sortBy==='pickup' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer>
                                        CargoDetails
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "delievered")}>
                                        Delievered
                                        { sortBy==='delievered' ? <ArrowDropDown /> : <ArrowDropUp /> }
                                    </HeaderRowLabelContainer>
                                </TableCell>
                                <TableCell align="center">
                                    <HeaderRowLabelContainer onClick={e => this.onChangeFilterBy(e, "shippedby")}>
                                        ShippedBy
                                        { sortBy==='shippedby' ? <ArrowDropDown /> : <ArrowDropUp /> }
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
                            {reports!=null&&this.sortArray(reports).map(row => {
                                return(
                                    <TableRow hover role='checkbox' key={row.id}>
                                        <TableCell align="center" style={{maxWidth: "120px"}}>
                                            {row.venderID}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "120px"}}>
                                            {row.containerType===1&&<FlightTakeoff />}
                                            {row.containerType===2&&<DirectionsBoat />}
                                            {row.containerType===3&&<LocalShipping />}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "170px"}}>
                                            {row.createdat}
                                        </TableCell>
                                        <TableCell align="center" style={{maxWidth: "115px"}}>
                                            {row.incoterm}
                                        </TableCell>
                                        <TableCell align="center" style={{maxWidth: "110px"}}>
                                            {row.pickupCompanyName}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "150px"}}>
                                            {row.cargoDetails}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "150px"}}>
                                            {row.delieveryCompanyName}
                                        </TableCell>
                                        <TableCell align="center" style={{minWidth: "120px"}}>
                                            {row.shipperCompanyName}
                                        </TableCell>
                                        <TableCell align="left" style={{minWidth: "120px"}}>
                                            {/* <ViewQuoteButton>View Quote</ViewQuoteButton> */}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </ReportsTableContainer>
            </Container>
            // <Container menuState={menuState}>
            //     <ReportsContainerRow>
            //         <NewReport onNewReport={this.onNewReport} />
            //         {
            //             reports !== null
            //                 &&(
            //                     reports.length > 0 && 
            //                         reports.map((report) =>
            //                             <ExistingReport onEditReport={this.onEditReport} onRemoveReport={this.onRemoveReport} data={report} key={report.id}/>)
            //                 )
            //         }
            //     </ReportsContainerRow>
            //     <Modal
            //         aria-labelledby="spring-modal-title"
            //         aria-describedby="spring-modal-description"
            //         // eslint-disable-next-line react/prop-types
            //         className={classes.modal}
            //         open={onNewReport}
            //         onClose={() => this.handleCloseNewReport()}
            //         closeAfterTransition
            //         BackdropComponent={Backdrop}
            //         BackdropProps={{
            //             timeout: 500,
            //         }}
            //     >
            //         {
            //             FadeComponent
            //         }
            //     </Modal>
            // </Container>
        );
    }
}

Reports.defaultProps = {
    reports: null,
};

Reports.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    reports: PropTypes.array,
    loadPage: PropTypes.func.isRequired,
    requestNewQuote: PropTypes.func.isRequired,
    menuState: PropTypes.string.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
    requestNewQuote: reportActions.requestNewQuote,
};

function mapStateToProps(state) {
    return {
        reports: state.page.info!==null?state.page.info.reports: null,
        newReport: state.report.report,
        menuState: state.menu.menuState,
    };
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(Reports));