import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTyes from 'prop-types';

// Expansion components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonIcon from '@material-ui/icons/Person';
import RemoveIcon from '@material-ui/icons/Remove';
import PinDropIcon from '@material-ui/icons/PinDrop';

import { KButton, KShipStatusBar } from '../Basic';
import Device from '../../css/device';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: calc(100vh - 120px);
`;

const BackRow = styled.div`
    height: 40px;
    display: flex;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

const BackBtnWrapper = styled.span`
    color: black;
    cursor: pointer;

    &:hover{
        color: red;
    }
`;

const MainInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    border: 1px solid #3056F5;
    padding: 8px 10px;
    width: 100%;
    align-items: center;
`;

const ShipmentIdLabel = styled.div`
    display: flex;
    flex: 2;
    color: black;
    font-weight: 600;
    margin-right: 8px;
`;

const ShipmentAdminInfo = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
    color: black;
`;

const ShipmentAdminLabel = styled.div`
    display: flex;
    flex: 1;
    font-size: 12px;
`;

const ShipmentAdminName = styled.div`
    display: flex;
    flex: 1;
    font-size: 14px;
`;

const ShipmentCusWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex: 8;
`;

const ShipmentActionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex: 3;
`;

const ExpansionPannelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: calc(100vh - 240px);
    overflow: auto;
`;

const ExpansionHeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between
`;

const ExpansionTitle = styled.div`
    display: flex;
    flexBasis: '33.33%';
    flexShrink: 0;
    color: black;
    align-items: center;
`;

const SelectFormLabel = styled.div`
    display: flex;
    background: white;
    border-radius: 10px;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    border: 1px solid #ccc;
    padding: 5px;
`;

const DetailsParaWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow: auto;
`;

const DetailsParaHeader = styled.div`
    display: flex;
    background: #888DA0;
    color: white;
`;

const DetailsParaContentRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`;

const DetailsInnerElement = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
    margin: 5px 15px;
`;

const DetailsInnerContentLabel = styled.div`
    color: black;
    font-size: 15px;
    font-weight: 500;
    height: 45px;
`;

const DetailsInnerContentBody = styled.div`
    border-radius: 8px;
    border: 1px solid #ccc;
    background: #E9EBEF;
    height: 10vw;
`;

const AddNewTaskBtn = styled.div`
    display: flex;
    border-radius: 8px;
    background: #49BA25;
    color: white;
    padding: 5px 25px;
`;

const DetailsInnerContentInputBox = styled.input`
    display: flex;
    padding: 8px 12px;
    border-radius: 4px;
    text-align: left;
    background: #E9EBEF;
    border: #CCC;
    color: black;
`;

const TasksParaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding 10px;
    font-size: 14px;
`;

const TasksTableHeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px;
    border-bottom: 1px solid #ccc;
    color: #ccc;
`;

const RoundBtn = styled.div`
    color: white;
    background: ${props => {
        let color = "#3FABFF";
        if( props.red )
            color = "#E86C60";
        return color;
    }};
    height: 24px;
    padding: 4px 8px;
    border-radius: 12px;
    text-align: center;
    margin: 0px 8px;
    font-size: 12px;
`;

const TasksTableRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px;
    border-bottom: 1px solid #ccc;
    align-items: center;
`;

const TasksTableRowRTWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 5 1 0%;
`;

const TasksTabRowDDWrapper = styled.div`
    display: flex;
    color: #477BA1;
    flex: 3 1 0%;
`;

const TasksTabRowStatusWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 3 1 0%;
    color: black;
    align-items: center;
    justify-content: space-between;
`;

const RTInfoLabel = styled.div`
    display: flex;
    margin: 0px 8px;

    color: ${props => {
        let color = "#000";
        if( props.gray )
            color = "#CCC";
        else if( props.black ) color = "#000";
        else color = "#477BA1";
        return color;
    }};
`;

const ShipmentAttachmentsWrapper = styled.div`
    display: block;
    width: 100%;
`;

const ShipmentAttachmentselementWrapper = styled.div`
    float: left;
    display: flex;
    flex-direction: row;
    border: 1px dotted #ccc;
    padding: 10px;
    width: calc(50% - 24px);
    margin: 8px 6px;
    cursor: pointer;

    @media ${Device.laptop} {
        width: calc(33% - 24px);
    }
`;

const ShipmentAttLbox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    border: 1px solid #ccc;
    padding: 8px;
`;

const ShipmentAttLboxLabel = styled.div`
    display: flex;
    flex: 3;
    align-items: center;
`;

const ShipmentAttLboxLocation = styled.div`
    display: flex;
    flex: 1;
    align-items: flex-end;
    justify-content: center;
`;

const ShipmentAttRbox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
`;

const ShipmentAttRboxLabel1 = styled.div`
    color: #7F63F4;
    text-align: center;
`;

const ShipmentAttRboxLabel2 = styled.div`
    color: #ccc;
    text-align: center;
`;

const ShipmentsCommentsWrapper = styled.div`
    dislay: flex;
    flex-direction: column;
    width: 100%;
`;

const ShipmentsCommentsEditor = styled.div`
    display: flex;
    width: 100%;
    border: 1px dotted #ccc;
    color: #7F63F4;
    padding: 10px;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0px 0px 10px 0px;
`;

const ShipmentDetails = props => {
    // eslint-disable-next-line no-unused-vars
    const { onBack, shipment } = props;

    function handleBack(e) {
        e.preventDefault();
        onBack();
    }

    // Expansion Pannel Controlling State, Function
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const labels = ["Step1", "Step2", "Step3", "Step4"];

    return (
        <Container>
            <BackRow>
                <BackBtnWrapper onClick={e => handleBack(e)}>
                    <ArrowBackIcon />
                </BackBtnWrapper>
            </BackRow>
            <InfoWrapper>
                <MainInfoWrapper>
                    <ShipmentIdLabel>45909-09874-099</ShipmentIdLabel>
                    <ShipmentAdminInfo>
                        <ShipmentAdminLabel>
                            Handled by
                        </ShipmentAdminLabel>
                        <ShipmentAdminName>
                            Freight Genius
                        </ShipmentAdminName>
                    </ShipmentAdminInfo>
                    <ShipmentCusWrap>
                        <KShipStatusBar labels={labels} currentStep={2} />
                    </ShipmentCusWrap>
                    <ShipmentActionWrapper>
                        <KButton color="gray" label="&nbsp;&nbsp;VIEWING&nbsp;&nbsp;" radius="small" style={{flex: "1"}}/>
                        <KButton color="blue" label="&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;" radius="small" style={{flex: "1"}}/>
                    </ShipmentActionWrapper>
                </MainInfoWrapper>
                <ExpansionPannelWrapper>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <ExpansionHeaderWrapper>
                                <ExpansionTitle >Tasks</ExpansionTitle>
                                {
                                    expanded === 'panel2' && <AddNewTaskBtn>
                                        + Add
                                    </AddNewTaskBtn>
                                }
                            </ExpansionHeaderWrapper>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TasksParaWrapper>
                                <TasksTableHeaderRow>
                                    <div style={{display: "flex", flex: "5"}}>
                                        Required task 
                                        <RoundBtn>
                                            4
                                        </RoundBtn>
                                    </div>
                                    <div style={{flex: "3"}}>
                                        Due date
                                    </div>
                                    <div style={{flex: "3"}}>
                                        Status
                                    </div>
                                </TasksTableHeaderRow>
                                <TasksTableRow>
                                    <TasksTableRowRTWrapper>
                                        <RTInfoLabel black>
                                            Booking Conformation
                                        </RTInfoLabel>
                                        <RTInfoLabel>
                                            Booking Conformation
                                        </RTInfoLabel>
                                        <RoundBtn>
                                            URGENT
                                        </RoundBtn>
                                    </TasksTableRowRTWrapper>
                                    <TasksTabRowDDWrapper>
                                        1-Nov-2019
                                    </TasksTabRowDDWrapper>
                                    <TasksTabRowStatusWrapper>
                                        <RemoveIcon style={{color: "#E86C60"}}/>
                                        <RTInfoLabel>
                                            Need attention
                                        </RTInfoLabel>
                                        <KButton color="blue" radius="small" label="mark complete">
                                        </KButton>
                                    </TasksTabRowStatusWrapper>
                                </TasksTableRow>
                                <TasksTableRow>
                                    <TasksTableRowRTWrapper>
                                        <RTInfoLabel black>
                                            B13/AES
                                        </RTInfoLabel>
                                        <RTInfoLabel>
                                            Date approaching
                                        </RTInfoLabel>
                                    </TasksTableRowRTWrapper>
                                    <TasksTabRowDDWrapper>
                                        14-Nov-2019
                                    </TasksTabRowDDWrapper>
                                    <TasksTabRowStatusWrapper>
                                        <PersonIcon style={{color: "#3057f5"}}/>
                                        <RTInfoLabel>
                                            Pending
                                        </RTInfoLabel>
                                        <KButton color="blue" radius="small" label="mark complete">
                                        </KButton>
                                    </TasksTabRowStatusWrapper>
                                </TasksTableRow>
                                <TasksTableRow>
                                    <TasksTableRowRTWrapper>
                                        <RTInfoLabel black>
                                            Shipping Instructions
                                        </RTInfoLabel>
                                        <RTInfoLabel>
                                            Require attention
                                        </RTInfoLabel>
                                        <RoundBtn>
                                            URGENT
                                        </RoundBtn>
                                    </TasksTableRowRTWrapper>
                                    <TasksTabRowDDWrapper>
                                        11-Nov-2019
                                    </TasksTabRowDDWrapper>
                                    <TasksTabRowStatusWrapper>
                                        <RemoveIcon style={{color: "#E86C60"}}/>
                                        <RTInfoLabel>
                                            Need attention
                                        </RTInfoLabel>
                                        <KButton color="blue" radius="small" label="mark complete">
                                        </KButton>
                                    </TasksTabRowStatusWrapper>
                                </TasksTableRow>
                                <TasksTableRow>
                                    <TasksTableRowRTWrapper>
                                        <RTInfoLabel black>
                                            B13/AES
                                        </RTInfoLabel>
                                        <RTInfoLabel>
                                            Date approaching
                                        </RTInfoLabel>
                                    </TasksTableRowRTWrapper>
                                    <TasksTabRowDDWrapper>
                                        12-Nov-2019
                                    </TasksTabRowDDWrapper>
                                    <TasksTabRowStatusWrapper>
                                        <PersonIcon style={{color: "#3057f5"}}/>
                                        <RTInfoLabel>
                                            Pending
                                        </RTInfoLabel>
                                        <KButton color="blue" radius="small" label="mark complete">
                                        </KButton>
                                    </TasksTabRowStatusWrapper>
                                </TasksTableRow>
                            </TasksParaWrapper>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <ExpansionHeaderWrapper>
                                <ExpansionTitle>Booking</ExpansionTitle>
                                {
                                    expanded === 'panel1' && <SelectFormLabel>
                                        select form
                                    </SelectFormLabel>
                                }
                            </ExpansionHeaderWrapper>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <DetailsParaWrapper>
                                <DetailsParaHeader>
                                    Parties
                                </DetailsParaHeader>
                                <DetailsParaContentRow>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Shipper
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>

                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Forwarder
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Carrier
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            INTTRA SI Number
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                </DetailsParaContentRow>

                                <DetailsParaContentRow>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Consignee
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>

                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Notify Party
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Additional Notify Party 1
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Additional notify Party 2
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                </DetailsParaContentRow>

                                <DetailsParaHeader>
                                    Carriage Details
                                </DetailsParaHeader>
                                <DetailsParaContentRow>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Origin of Goods
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>

                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Move Type
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Shipment Type
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Vessel, Voyage, IMO Number
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                </DetailsParaContentRow>

                                <DetailsParaContentRow>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Origin
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>

                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Port of Load
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Port of Discharge
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Destination
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                </DetailsParaContentRow>
                                <DetailsParaHeader>
                                    Particulars
                                </DetailsParaHeader>
                                <DetailsParaContentRow>
                                    <DetailsInnerElement style={{flex: "4"}}>
                                        <DetailsInnerContentLabel>
                                            
                                        </DetailsInnerContentLabel>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "2"}}>
                                        <DetailsInnerContentLabel>
                                            Destination
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Cargo Gross Weight
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Cargo Gross Volume
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentBody>
                                            
                                        </DetailsInnerContentBody>
                                    </DetailsInnerElement>
                                </DetailsParaContentRow>
                                <DetailsParaHeader>
                                    Control Totals
                                </DetailsParaHeader>
                                <DetailsParaContentRow>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Total Number of Containers
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentInputBox placeholder="i.e. Martin Jones">

                                        </DetailsInnerContentInputBox>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Total Number of Packages
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentInputBox placeholder="i.e. Martin Jones">

                                        </DetailsInnerContentInputBox>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Total Shipment Weight
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentInputBox placeholder="i.e. Martin Jones">

                                        </DetailsInnerContentInputBox>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Total Shipment Volume
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentInputBox placeholder="i.e. Martin Jones">

                                        </DetailsInnerContentInputBox>
                                    </DetailsInnerElement>
                                </DetailsParaContentRow>
                                <DetailsParaContentRow>
                                    <DetailsInnerElement style={{flex: "1"}}>
                                        <DetailsInnerContentLabel>
                                            Shippers Declared Value
                                        </DetailsInnerContentLabel>
                                        <DetailsInnerContentInputBox placeholder="i.e. Martin Jones">

                                        </DetailsInnerContentInputBox>
                                    </DetailsInnerElement>
                                    <DetailsInnerElement  style={{flex: "3"}}>

                                    </DetailsInnerElement>
                                </DetailsParaContentRow>
                            </DetailsParaWrapper>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <ExpansionTitle >Attachments</ExpansionTitle>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ShipmentAttachmentsWrapper>
                                {/*
                                Booking conformation
                                */}
                                <ShipmentAttachmentselementWrapper>
                                    <ShipmentAttLbox>
                                        <ShipmentAttLboxLabel>
                                            Booking Conformation
                                        </ShipmentAttLboxLabel>
                                        <ShipmentAttLboxLocation>
                                            <PinDropIcon />
                                        </ShipmentAttLboxLocation>
                                    </ShipmentAttLbox>
                                    <ShipmentAttRbox>
                                        <ShipmentAttRboxLabel1>
                                            upload documents
                                        </ShipmentAttRboxLabel1>
                                        <ShipmentAttRboxLabel2>
                                            or Just
                                        </ShipmentAttRboxLabel2>
                                        <ShipmentAttRboxLabel2>
                                            Drag and Drop
                                        </ShipmentAttRboxLabel2>
                                    </ShipmentAttRbox>
                                </ShipmentAttachmentselementWrapper>
                                {/*
                                Certificate of Origin
                                */}
                                <ShipmentAttachmentselementWrapper>
                                    <ShipmentAttLbox>
                                        <ShipmentAttLboxLabel>
                                            Certificate of Origin
                                        </ShipmentAttLboxLabel>
                                        <ShipmentAttLboxLocation>
                                            <PinDropIcon />
                                        </ShipmentAttLboxLocation>
                                    </ShipmentAttLbox>
                                    <ShipmentAttRbox>
                                        <ShipmentAttRboxLabel1>
                                            upload documents
                                        </ShipmentAttRboxLabel1>
                                        <ShipmentAttRboxLabel2>
                                            or Just
                                        </ShipmentAttRboxLabel2>
                                        <ShipmentAttRboxLabel2>
                                            Drag and Drop
                                        </ShipmentAttRboxLabel2>
                                    </ShipmentAttRbox>
                                </ShipmentAttachmentselementWrapper>
                                {/*
                                Certificate of Fumigation
                                */}
                                <ShipmentAttachmentselementWrapper>
                                    <ShipmentAttLbox>
                                        <ShipmentAttLboxLabel>
                                            Certificate of Fumigation
                                        </ShipmentAttLboxLabel>
                                        <ShipmentAttLboxLocation>
                                            <PinDropIcon />
                                        </ShipmentAttLboxLocation>
                                    </ShipmentAttLbox>
                                    <ShipmentAttRbox>
                                        <ShipmentAttRboxLabel1>
                                            upload documents
                                        </ShipmentAttRboxLabel1>
                                        <ShipmentAttRboxLabel2>
                                            or Just
                                        </ShipmentAttRboxLabel2>
                                        <ShipmentAttRboxLabel2>
                                            Drag and Drop
                                        </ShipmentAttRboxLabel2>
                                    </ShipmentAttRbox>
                                </ShipmentAttachmentselementWrapper>
                                {/*
                                CNCA/Ogifrem
                                */}
                                <ShipmentAttachmentselementWrapper>
                                    <ShipmentAttLbox>
                                        <ShipmentAttLboxLabel>
                                            CNCA/Ogifrem
                                        </ShipmentAttLboxLabel>
                                        <ShipmentAttLboxLocation>
                                            <PinDropIcon />
                                        </ShipmentAttLboxLocation>
                                    </ShipmentAttLbox>
                                    <ShipmentAttRbox>
                                        <ShipmentAttRboxLabel1>
                                            upload documents
                                        </ShipmentAttRboxLabel1>
                                        <ShipmentAttRboxLabel2>
                                            or Just
                                        </ShipmentAttRboxLabel2>
                                        <ShipmentAttRboxLabel2>
                                            Drag and Drop
                                        </ShipmentAttRboxLabel2>
                                    </ShipmentAttRbox>
                                </ShipmentAttachmentselementWrapper>
                                {/*
                                Autos/POV/Non Hazardous Certification
                                */}
                                <ShipmentAttachmentselementWrapper>
                                    <ShipmentAttLbox>
                                        <ShipmentAttLboxLabel>
                                            Autos/POV/Non Hazardous Certification
                                        </ShipmentAttLboxLabel>
                                        <ShipmentAttLboxLocation>
                                            <PinDropIcon />
                                        </ShipmentAttLboxLocation>
                                    </ShipmentAttLbox>
                                    <ShipmentAttRbox>
                                        <ShipmentAttRboxLabel1>
                                            upload documents
                                        </ShipmentAttRboxLabel1>
                                        <ShipmentAttRboxLabel2>
                                            or Just
                                        </ShipmentAttRboxLabel2>
                                        <ShipmentAttRboxLabel2>
                                            Drag and Drop
                                        </ShipmentAttRboxLabel2>
                                    </ShipmentAttRbox>
                                </ShipmentAttachmentselementWrapper>
                                {/*
                                Autos/POV/Non Hazardous Certification
                                */}
                                <ShipmentAttachmentselementWrapper>
                                    <ShipmentAttLbox>
                                        <ShipmentAttLboxLabel>
                                            Autos/POV/Non
                                        </ShipmentAttLboxLabel>
                                        <ShipmentAttLboxLocation>
                                            <PinDropIcon />
                                        </ShipmentAttLboxLocation>
                                    </ShipmentAttLbox>
                                    <ShipmentAttRbox>
                                        <ShipmentAttRboxLabel1>
                                            upload documents
                                        </ShipmentAttRboxLabel1>
                                        <ShipmentAttRboxLabel2>
                                            or Just
                                        </ShipmentAttRboxLabel2>
                                        <ShipmentAttRboxLabel2>
                                            Drag and Drop
                                        </ShipmentAttRboxLabel2>
                                    </ShipmentAttRbox>
                                </ShipmentAttachmentselementWrapper>
                                {/*
                                Commercial Invoice
                                */}
                                <ShipmentAttachmentselementWrapper>
                                    <ShipmentAttLbox>
                                        <ShipmentAttLboxLabel>
                                            Commercial Invoice
                                        </ShipmentAttLboxLabel>
                                        <ShipmentAttLboxLocation>
                                            <PinDropIcon />
                                        </ShipmentAttLboxLocation>
                                    </ShipmentAttLbox>
                                    <ShipmentAttRbox>
                                        <ShipmentAttRboxLabel1>
                                            upload documents
                                        </ShipmentAttRboxLabel1>
                                        <ShipmentAttRboxLabel2>
                                            or Just
                                        </ShipmentAttRboxLabel2>
                                        <ShipmentAttRboxLabel2>
                                            Drag and Drop
                                        </ShipmentAttRboxLabel2>
                                    </ShipmentAttRbox>
                                </ShipmentAttachmentselementWrapper>
                                {/*
                                Insurance Certificate
                                */}
                                <ShipmentAttachmentselementWrapper>
                                    <ShipmentAttLbox>
                                        <ShipmentAttLboxLabel>
                                            Insurance Certificate
                                        </ShipmentAttLboxLabel>
                                        <ShipmentAttLboxLocation>
                                            <PinDropIcon />
                                        </ShipmentAttLboxLocation>
                                    </ShipmentAttLbox>
                                    <ShipmentAttRbox>
                                        <ShipmentAttRboxLabel1>
                                            upload documents
                                        </ShipmentAttRboxLabel1>
                                        <ShipmentAttRboxLabel2>
                                            or Just
                                        </ShipmentAttRboxLabel2>
                                        <ShipmentAttRboxLabel2>
                                            Drag and Drop
                                        </ShipmentAttRboxLabel2>
                                    </ShipmentAttRbox>
                                </ShipmentAttachmentselementWrapper>
                            </ShipmentAttachmentsWrapper>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <ExpansionTitle >Comments</ExpansionTitle>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ShipmentsCommentsWrapper>
                                <ShipmentsCommentsEditor>
                                    Write your comments
                                </ShipmentsCommentsEditor>
                                <KButton label="submit" color="blue" radius="small" />
                            </ShipmentsCommentsWrapper>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </ExpansionPannelWrapper>
            </InfoWrapper>
            {/* <DetailsHeader>
                <DeatilsHeaderFirstRow>
                    <BackBtn onClick={e=> handleBack(e)}>
                        <BackIcon>
                            <ArrowBackIos />
                        </BackIcon>
                        Go Back
                    </BackBtn>
                    <HeaderContainer>
                        <HeaderLeftWrapper>
                            <HeaderTitle>Twill ID: {shipment!==null?shipment.id:"P02171179"}</HeaderTitle>
                            <HeaderLocations>ShangHai</HeaderLocations>
                            <HeaderLocations>Shenyang</HeaderLocations>
                            <HeaderLocations>Warehouse t. London</HeaderLocations>
                        </HeaderLeftWrapper>
                        <HeaderRightWrapper>
                            <RefNoLabel>Ref No: </RefNoLabel>
                            <RefNoText>003578</RefNoText>
                        </HeaderRightWrapper>
                    </HeaderContainer>
                </DeatilsHeaderFirstRow>

                <DeatilsHeaderSecondRow>
                    <DetailsSFRow>
                        <DetailsStatusConatiner>
                            <div>
                                Status
                            </div>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <IconButton>
                                    <Notifications />
                                </IconButton>
                                <div style={{padding: "8px"}}> Vessel departed</div>
                            </div>

                        </DetailsStatusConatiner>
                        <DetailsActionsContainer>
                            <div>
                                Action required
                            </div>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <IconButton>
                                    <Done />
                                </IconButton>
                                <div style={{padding: "8px"}}> Vessel departed</div>
                            </div>
                        </DetailsActionsContainer>
                    </DetailsSFRow>

                    <DetailsSSRow>
                        <ShipmentDetailProgress progressDetail={detail} stop={stop}/>
                    </DetailsSSRow>
                </DeatilsHeaderSecondRow>
            </DetailsHeader>

            <DetailsConatiner>
                <DetailsContentHeader>
                    <DetailsContentHeaderTitle>
                        Details
                    </DetailsContentHeaderTitle>
                    <IconButton>
                        <KeyboardArrowDown />
                    </IconButton>
                </DetailsContentHeader>

                <DeatilsContentBody>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    Task
                                </TableCell>
                                <TableCell align="center">
                                    Due date
                                </TableCell>
                                <TableCell align="center">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tasks.map(item => {
                                    return(
                                        <TableRow key={item.content}>
                                            <TableCell align="center">
                                                {item.content}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.date}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.state&&
                                                    <EnterButton>
                                                        Enter
                                                    </EnterButton>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </DeatilsContentBody>
            </DetailsConatiner> */}
        </Container>
    );
};

ShipmentDetails.defaultProps = {
    shipment: null,
};

ShipmentDetails.propTypes = {
    onBack: PropTyes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    shipment: PropTyes.object,
};

function mapStateToProps(state){
    return {
        shipment: state.ships.shipment,
    };
}

export default connect(mapStateToProps)(ShipmentDetails);