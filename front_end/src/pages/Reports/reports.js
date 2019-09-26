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
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import View from '@material-ui/icons/RemoveRedEye';
import Add from '@material-ui/icons/Add';

import { pageConstants, menuConstants } from '../../constants';
import { pageActions, reportActions } from '../../actions';

import Device from '../../css/device';
import NewReport from './NewReport';
import ExistingReport from './ExistingReport';
import Fade from '../../components/FunctionalComponents/fade';
import TreeMultiSelector from '../../components/FunctionalComponents/treeMultiSelector';
import DragAndDropComponent from '../../components/FunctionalComponents/dragAndDropComponent';
import { applyDrag } from '../../components/FunctionalComponents/utils';
import CustomTooltip from '../../components/CustomToolTip/CustomToolTip';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#ec4535',
        },
        primary: {
            main: '#2d24b9',
        }
    },
});

const styles = styleTheme => ({
    modal: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: styleTheme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: styleTheme.shadows[5],
        padding: styleTheme.spacing(2, 4, 3),
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
        height: calc(100vh - 96px);
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
    border-radius: 12px;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`;

const NewReportInputRow = styled.div`
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

const ReportsFilterBar = styled.div`
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

const RequestReportButton = styled.button`
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
    padding: 0px 20px;
    flex: flex-end;
    
    &:hover {
        background: #6688e4;
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
            pageStatus: 0,  // 0: list, 1: new report, 2: ...
        };
    }

    componentDidMount(){
        const { reports, loadPage } = this.props;
        if(reports === null){
            loadPage(pageConstants.REPORTS);
        }
    }
    
    onNewReport = () => {
        this.setState({ onNewReport: true, pageStatus: 1 });
    }

    handleCloseNewReport = () => {
        this.setState({ onNewReport: false, pageStatus: 0 });
    };

    handleCloseNewReportInput = () => {
        this.setState({ onNewReport: false, pageStatus: 0 });
    }

    handleReportScopeSelection = (event) => {
        this.setState({ReportState: parseInt(event.target.value, 10)});
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

    onEditReport = () => {
        // alert("do you want to edit existing report?");
    }

    onRemoveReport = () => {
        // alert("do you want to remove existing report?");
    }

    onViewReport = () => {

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
        const { requestNewReport, report } = this.props;
        requestNewReport(report);
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
        const { ReportState, location, isflight, isShip, isVan } = this.state;
        if(array !==null && array.length > 0){
            array.forEach(element => {
                let insertFlag = true;
                if(ReportState!==0 && element.status!== ReportState) insertFlag = false;
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
        const { onNewReport, filterList, reportTitle, pageStatus } = this.state;
        const { ReportState, location, isflight, isShip, isVan, sortBy } = this.state;

        const FadeComponent = <Fade in={onNewReport}>
            <NewReportContainer>
                <NewReportInputContainer>
                    <NewReportInputRow>
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
                    </NewReportInputRow>
                </NewReportInputContainer>
                
                <SettingsContainer>
                    <TreeMultiSelector reportNodes={reportNodes} handleChecked={this.handleCheckedStateChanged} handleCancel={this.handleCloseNewReport} />
                    <DragAndDropComponent items={filterList} handleDrop={this.onHandleDrop} handleNext={this.handleNextStep}/>
                </SettingsContainer>
            </NewReportContainer>
        </Fade>;
        return (
            <Container>
                {
                    pageStatus===0&&
                    <ReportsFilterBar>
                        <CustomSelector value={ReportState} onChange={e => this.handleReportScopeSelection(e)}>
                            <CustomSelectorOption value={0}>All</CustomSelectorOption>
                            <CustomSelectorOption value={1}>Active Reports</CustomSelectorOption>
                            <CustomSelectorOption value={2}>Ready to Book</CustomSelectorOption>
                            <CustomSelectorOption value={3}>Accepted Reports</CustomSelectorOption>
                            <CustomSelectorOption value={4}>Expired Reports</CustomSelectorOption>
                            <CustomSelectorOption value={5}>All Reports</CustomSelectorOption>
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
                        <CustomTooltip title="Create New Report">
                            <RequestReportButton onClick={e => this.onNewReport(e)}><Add/></RequestReportButton>
                        </CustomTooltip>
                    </ReportsFilterBar>
                }
                {pageStatus===0&&
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
                                                <ThemeProvider theme={theme}>
                                                    <CustomTooltip title="View">
                                                        <IconButton color='primary' >
                                                            <View />
                                                        </IconButton>
                                                    </CustomTooltip>
                                                    <CustomTooltip title="Edit">
                                                        <IconButton color="primary">
                                                            <Edit />
                                                        </IconButton>
                                                    </CustomTooltip>
                                                    <CustomTooltip title="Delete">
                                                        <IconButton color="secondary">
                                                            <Delete />
                                                        </IconButton>
                                                    </CustomTooltip>
                                                </ThemeProvider>
                                                {/* <ViewReportButton>View Report</ViewReportButton> */}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </ReportsTableContainer>
                }
                {
                    pageStatus===1&&FadeComponent
                }
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
    requestNewReport: PropTypes.func.isRequired,
    menuState: PropTypes.string.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
    requestNewReport: reportActions.requestNewReport,
};

function mapStateToProps(state) {
    return {
        reports: state.page.info!==null?state.page.info.reports: null,
        newReport: state.report.report,
        menuState: state.menu.menuState,
    };
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(Reports));