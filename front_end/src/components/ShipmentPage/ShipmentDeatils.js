import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTyes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Notifications from '@material-ui/icons/Notifications';
import Done from '@material-ui/icons/Done';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import ShipmentDetailProgress from './ShipmentDetailProgress';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow: auto;
    height: calc(100vh - 80px);

`;

const DetailsHeader = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    background: #ffffffeb;
    box-shadow: 1px 2px 6px 4px #ccc;
`;

const DeatilsHeaderFirstRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 64px;
    border-bottom: 2px solid #aaa;
`;

const DeatilsHeaderSecondRow = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 160px;
`;

const DetailsSFRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
`;

const DetailsStatusConatiner = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    color: #aaa;
`;

const DetailsActionsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    color: #aaa;
`;

const DetailsSSRow = styled.div`
    display: flex;
`;

const BackBtn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
    transition: background 400ms;
    align-items: center;
    padding: 0px 20px;
    width: 160px;
    border-right: 2px solid #aaa;

    &:hover {
        background: #ccc;
    }
`;

const BackIcon = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 36px;
    background: #4D7CFE;
    transition: background 600ms;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 0px 10px;
    margin-right: 10px;

    &:hover {
        background: #225bf7;
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
`;

const HeaderLeftWrapper = styled.div`
    display: flex;
    flex: 2;
`;

const HeaderRightWrapper = styled.div`
    display: flex;
    flex: 1;
    padding: 5px 20px;
`;

const HeaderTitle = styled.h1`
    font-size: 20px;
    font-weight: 500;
    display: flex;
    flex: 2;
    justify-content: center;
    margin: 0px !important;
    align-items: center;
`;

const HeaderLocations = styled.h1`
    font-size: 20px;
    font-weight: 400;
    color: #aaa;
    display: flex;
    flex: 1;
    justify-content: right;
    margin: 0px !important;
    align-items: center;
`;

const RefNoLabel = styled.h1`
    font-size: 19px;
    font-weight: 500;
    flex: 1;
    text-align: right;
    margin: 0px !important;
    align-items: center;
`;

const RefNoText = styled.h1`
    font-size: 19px;
    font-weight: 400;
    margin: 0px !important;
    align-items: center;
`;

const DetailsConatiner = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 80%;
    margin-left: 10%;
`;

const DetailsContentHeader = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    background: #ffffffeb;
    padding: 10px 20px;
    box-shadow: 1px 1px 6px 2px #ccc;
`;

const DetailsContentHeaderTitle = styled.h1`
    font-size: 18px;
    font-weight: 500;
    display: flex;
    margin: 0px !important;
    align-items: center;
    flex: 1;
`;

const DeatilsContentBody = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background: #ffffffeb;
    box-shadow: 1px 1px 6px 2px #ccc;
`;

// const DetailsBodyHeader = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

// const  TasksColumn = styled.div`
//     font-size: 18px;
//     font-weight: 500;
//     display: flex;
//     margin: 0px !important;
//     align-items: center;
//     flex: 1;
// `;

const EnterButton = styled.button`
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
    background: #6688e4;
    padding: 0px 20px;
    flex: flex-end;

    &:hover {
        background: #4D7CFE;
    }
`;

const tasks = [
    {
        content: "Commercial invoice approved",
        date: "02 Oct 2018",
        state: false,
    },
    {
        content: "Packing list approved",
        date: "02 Oct 2018",
        state: false,
    },
    {
        content: "Enter delivery date and time",
        date: "15 Oct 2018",
        state: true,
    }
];

const detail = [
    {
        location: "Beijing Dong Lu",
        date: "2019/09/11",
    },
    {
        location: "Singapore Capital",
        date: "2019/09/18",
    },
    {
        location: "Frankurt am Main",
        date: "2019/10/13",
    },
    {
        location: "Germany Peine",
        date: "2019/10/21",
    }
];
const stop = 2;

const ShipmentDetails = props => {
    const { onBack, shipment } = props;

    function handleBack(e) {
        e.preventDefault();
        onBack();
    }

    return (
        <Container>
            <DetailsHeader>
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
                    {/* <DetailsBodyHeader>
                        <TasksColumn>Tasks</TasksColumn>
                    </DetailsBodyHeader> */}
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
            </DetailsConatiner>
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