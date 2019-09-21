/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-const */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

import { pageConstants } from '../../constants';
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
    position: absolute;
    top: 0px;
    margin-top: 64px;
    padding: 8px;
    height: calc(100vh - 64px);
    width: 100%;
    left: 0px;
    @media ${Device.laptop} {
        left: 320px;
        width: calc(100% - 320px);
        padding: 48px;
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

    onExistingReport = () => {

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

    render(){

        // eslint-disable-next-line react/prop-types
        const { classes, reports } = this.props;
        const { onNewReport, filterList, reportTitle } = this.state;

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
                <ReportsContainerRow>
                    <NewReport onNewReport={this.onNewReport} />
                    {
                        reports !== null
                            &&(
                                reports.length > 0 && 
                                    reports.map((report) =>
                                        <ExistingReport onExistingReport={this.onExistingReport} data={report} key={report.id}/>)
                            )
                    }
                </ReportsContainerRow>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    // eslint-disable-next-line react/prop-types
                    className={classes.modal}
                    open={onNewReport}
                    onClose={() => this.handleCloseNewReport()}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {
                        FadeComponent
                    }
                </Modal>
            </Container>
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
};

const actionCreators = {
    loadPage: pageActions.loadPage,
    requestNewQuote: reportActions.requestNewQuote,
};

function mapStateToProps(state) {
    return {
        reports: state.page.info!==null?state.page.info.reports: null,
        newReport: state.report.report,
    };
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(Reports));