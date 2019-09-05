import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DirectionsBoat from '@material-ui/icons/DirectionsBoat';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import LocalShipping from '@material-ui/icons/LocalShipping';

import { quoteActions } from '../../actions';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 70%;
    min-width: 500px;
`;

const PageLabel = styled.div`
    display: flex;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: black;
`;

const RequestFreightQuoteButton = styled.button`
    display: flex;
    width: 200px;
    height: 52px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0px 0px 15px 0px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    color: #FFFFFF;
    background: #4D7CFE;

    &:hover {
        background: #6688e4;
    }
`;

const ShipmentNameContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
`;

const ShipmentNameFirstRow = styled.div`
    display: flex;
    flex-direction: row;
`;

const NameLabel = styled.h1`
    display: flex;
    flex: 1;
    font-size: 18px;
    font-weight: 500;
    color: black;
    margin: 8px 0px;
`;

const RequiredLabel = styled.div`
    display: flex;
    font-size: 18px;
    font-weight: 400;
    color: red;
`;

const DefaultInputBox = styled.input`
    height: 42px;
    margin: 8px 0px;
    border-radius: 4px;
    border: 2px solid #ccc;
    padding: 5px 10px 5px 12px;

    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #252631;

    &:hover {
        border: 2px solid #576cef;
    }
`;

const TransportationContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 0px 20px 0px;
    border-bottom: 2px solid #ccc;
`;

const TransportationRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 0px;
`;

const TransportationMethodItem = styled.div`

    border: ${props => {
        let border = "2px solid #ccc";
        if(props.active)
            border = "2px solid #576cef";
        return border;
    }}
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 8px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 5px;

    &:hover {
        border: 2px solid #576cef;
    }
`;

const TransportationInLabel = styled.h1`
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #808080;
    margin: 5px 0px;
`;

const TransportationMethodItemLast = styled.div`
    display: flex;
    flex: 1;
    border-radius: 5px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
    cursor: pointer;

    border: ${props => {
        let border = "2px solid #ccc";
        if(props.active)
            border = "2px solid #576cef";
        return border;
    }}

    &:hover {
        border: 2px solid #576cef;
    }
`;

const TransportationshipmentRow = styled.div`
    display: flex;
    width: 50%;
    flex-direction: row;
    margin: 5px 0px;
`;

const TransportationShipmentTypeItem = styled.div`

    border: ${props => {
        let border = "2px solid #ccc";
        if(props.active)
            border = "2px solid #576cef";
        return border;
    }}
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 8px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 5px;

    &:hover {
        border: 2px solid #576cef;
    }
`;

const TransportationIncotermsRow = styled.div`
    display: flex;
    width: 75%;
    flex-direction: row;
    margin: 5px 0px;
`;

const OriginContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding: 0px 0px 20px 0px;
    border-bottom: 2px solid #ccc;
`;

const OriginRow = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 0px;
`;

const OriginInLabel = styled.h1`
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #808080;
    margin: 5px 0px;
`;

const DefaultSelector = styled.select`
    height: 42px;
    padding: 3px 8px;
    border-radius: 5px;
    border: 2px solid #ccc;

    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #252631;

    &:hover {
        border: 2px solid #576cef;
    }
`;

const DefaultSelectorOption = styled.option`
    display: flex;
`;

const DateInputBox = styled.input`
    width: 30%;
    border: 2px solid #ccc;
    min-width: 250px;
    height: 42px;
    padding: 3px 8px;
    border-radius: 5px;

    &:hover {
        border: 2px solid #576cef;
    }
`;

const NewQuotePanel = (props) => {

    const [shipmentName, setShipmentName] = React.useState('');
    const [freightMethod, setFreightMethod] = React.useState(1);    // 1: ocean freight, 2: both, 3: airfreight, 4: truck
    const [shipmentType, setShipmentType] = React.useState(2);
    const [containerType, setContainerType] = React.useState(1);
    const [incoterms, setIncotermsValue] = React.useState(1);
    const [originLocation, setOriginLocation] = React.useState('ca');
    const [originPort, setOriginPort] = React.useState(1);
    const [pickupReadyDate, setPickupReadyDate] = React.useState("");

    const { requestFreightQuote } = props;

    function onShipmentNameChanged(event) {
        setShipmentName(event.target.value);
    }

    function onTransportationMethod(event, type) {
        event.preventDefault();
        if(type === freightMethod) setFreightMethod(0);
        else setFreightMethod(type);
    }

    function onChangeShipmentType(event, type) {
        event.preventDefault();
        if(type===shipmentType) setShipmentType(0);
        else setShipmentType(type);
    }

    function onChangeContainerType(event, type) {
        event.preventDefault();
        if(type===containerType) setContainerType(0);
        else setContainerType(type);
    }

    function onChangeIncotermsValue(event, type) {
        event.preventDefault();
        if(type===incoterms) setIncotermsValue(0);
        else setIncotermsValue(type);
    }

    function onLocationChanged(event){
        setOriginLocation(event.target.value);
    }

    function onOriginPortChanged(event) {
        setOriginPort(event.target.value);
    }

    function onChangePickupDate(event) {
        setPickupReadyDate(event.target.value);
    }

    return (
        <Container>
            <PageLabel>
                Request Quote
            </PageLabel>
            
            <ShipmentNameContainer>
                <ShipmentNameFirstRow>
                    <NameLabel>Shipment Name*</NameLabel>
                    <RequiredLabel>* Required</RequiredLabel>
                </ShipmentNameFirstRow>
                <DefaultInputBox type='text' value={shipmentName} onChange={onShipmentNameChanged}/>
            </ShipmentNameContainer>

            <TransportationContainer>
                <NameLabel>Transportation</NameLabel>

                <TransportationInLabel>Freight Method *</TransportationInLabel>
                <TransportationRow>
                    <TransportationMethodItem active={freightMethod===1} onClick={e => onTransportationMethod(e, 1)} >
                        <DirectionsBoat />
                        Ocean Freight
                    </TransportationMethodItem>
                    <TransportationMethodItem active={freightMethod===2} onClick={e => onTransportationMethod(e, 2)} >
                        <span>
                            <FlightTakeoff />
                            <DirectionsBoat />
                        </span>
                        Show Both
                    </TransportationMethodItem>
                    <TransportationMethodItem active={freightMethod===3} onClick={e => onTransportationMethod(e, 3)} >
                        <FlightTakeoff />
                        Air Freight
                    </TransportationMethodItem>
                    <TransportationMethodItemLast active={freightMethod===4} onClick={e => onTransportationMethod(e, 4)} >
                        <LocalShipping />
                        Truck
                    </TransportationMethodItemLast>
                </TransportationRow>

                <TransportationInLabel>Shipment Type *</TransportationInLabel>
                <TransportationshipmentRow>
                    <TransportationShipmentTypeItem active={shipmentType===1} onClick={e => onChangeShipmentType(e, 1)}>
                        LCL
                    </TransportationShipmentTypeItem>
                    <TransportationShipmentTypeItem active={shipmentType===2} onClick={e=> onChangeShipmentType(e, 2)}>
                        FCL
                    </TransportationShipmentTypeItem>
                </TransportationshipmentRow>

                <TransportationInLabel>Container Type *</TransportationInLabel>
                <TransportationRow>
                    <TransportationMethodItem active={containerType===1} onClick={e => onChangeContainerType(e, 1)}>
                        20 ft
                    </TransportationMethodItem>
                    <TransportationMethodItem active={containerType===2} onClick={e => onChangeContainerType(e, 2)}>
                        40 ft
                    </TransportationMethodItem>
                    <TransportationMethodItem active={containerType===3} onClick={e => onChangeContainerType(e, 3)}>
                        40 ft HC
                    </TransportationMethodItem>
                    <TransportationMethodItemLast active={containerType===4} onClick={e => onChangeContainerType(e, 4)}>
                        45ft HC
                    </TransportationMethodItemLast>
                </TransportationRow>

                <TransportationInLabel>Incoterms *</TransportationInLabel>
                <TransportationIncotermsRow>
                    <TransportationMethodItem active={incoterms===1} onClick={e => onChangeIncotermsValue(e, 1)}>
                        FOB
                    </TransportationMethodItem>
                    <TransportationMethodItem active={incoterms===2} onClick={e => onChangeIncotermsValue(e, 2)}>
                        EXW
                    </TransportationMethodItem>
                    <TransportationMethodItem active={incoterms===3} onClick={e => onChangeIncotermsValue(e, 3)}>
                        Other
                    </TransportationMethodItem>
                </TransportationIncotermsRow>

            </TransportationContainer>

            <OriginContainer>
                <NameLabel>Origin</NameLabel>
                <OriginRow>
                    <OriginInLabel>Origin Location *</OriginInLabel>
                    <DefaultSelector value={originLocation} onChange={e => onLocationChanged(e)}>
                        <DefaultSelectorOption value="us" > United States </DefaultSelectorOption>
                        <DefaultSelectorOption value="ca" > Canada </DefaultSelectorOption>
                        <DefaultSelectorOption value="cn" > China </DefaultSelectorOption>
                        <DefaultSelectorOption value="ru" > Russia </DefaultSelectorOption>
                    </DefaultSelector>
                </OriginRow>
                <OriginRow>
                    <OriginInLabel>Origin Port *</OriginInLabel>
                    <DefaultSelector value={originPort} onChange={e => onOriginPortChanged(e)}>
                        <DefaultSelectorOption value={1} > Port of Houston </DefaultSelectorOption>
                        <DefaultSelectorOption value={2} > Port of Shanghai </DefaultSelectorOption>
                        <DefaultSelectorOption value={3} > Port of Qingdao </DefaultSelectorOption>
                        <DefaultSelectorOption value={4} > Port Metro Vancouver </DefaultSelectorOption>
                    </DefaultSelector>
                </OriginRow>
                <OriginRow>
                    <OriginInLabel>When will your cargo be ready for pickup? *</OriginInLabel>
                    <DateInputBox placeholder="MM/DD/YYYY" type="date" value={pickupReadyDate} onChange={e=>onChangePickupDate(e)}/>
                </OriginRow>
            </OriginContainer>

            <RequestFreightQuoteButton onClick={requestFreightQuote}>
                Request Freight Quote
            </RequestFreightQuoteButton>
        </Container>
    );

};

NewQuotePanel.propTypes = {
    requestFreightQuote: PropTypes.func.isRequired,
};

const actionCreators = {
    requestFreightQuote: quoteActions.requestFreightQuote,
};

export default connect(null, actionCreators)(NewQuotePanel);