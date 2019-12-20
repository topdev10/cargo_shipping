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

import { KButton, KShipStatusBar } from '../Basic';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow: auto;
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
`;

const ExpansionTitle = styled.div`
    display: flex;
    flexBasis: '33.33%';
    flexShrink: 0;
    color: black;
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
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <ExpansionTitle>Tasks</ExpansionTitle>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                maximus est, id dignissim quam.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <ExpansionTitle >Documentation</ExpansionTitle>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                                diam eros in elit. Pellentesque convallis laoreet laoreet.
                            </Typography>
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
                            <Typography>
                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                vitae egestas augue. Duis vel est augue.
                            </Typography>
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
                            <Typography>
                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                vitae egestas augue. Duis vel est augue.
                            </Typography>
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