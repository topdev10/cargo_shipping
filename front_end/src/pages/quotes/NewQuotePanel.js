import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import DirectionsBoat from '@material-ui/icons/DirectionsBoat';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import LocalShipping from '@material-ui/icons/LocalShipping';
import BatteryCharging50 from '@material-ui/icons/BatteryCharging50';
import Warning from '@material-ui/icons/Warning';

import { quoteActions } from '../../actions';
import NuClearIcon from '../../images/Nuclear_symbol.svg';
import LocationSearchInput from '../../components/FunctionalComponents/LocationSearchInputBox';

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
    text-align: center;

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
    text-align: center;

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

const DestinationContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding: 0px 0px 20px 0px;
    border-bottom: 2px solid #ccc;
`;

const DestinationRow = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 0px;
`;

const DestinationInLabel = styled.h1`
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #808080;
    margin: 5px 0px;
`;

const DestinationYesNoButton = styled.button`
    display: flex;
    padding: 5px 15px;
    border-radius: 4px;
    border: ${props => {
        let border = "2px solid #ccc";
        if(props.active)
            border = "2px solid #576cef";
        return border;
    }}
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        border: 2px solid #576cef;
    }
`;

const CargoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding: 0px 0px 20px 0px;
    border-bottom: 2px solid #ccc;
`;

const CargoRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 0px;
`;

const CargoInlabel = styled.h1`
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #808080;
    margin: 5px 0px;
`;

const CargoRadioBound = styled.label`
    display: flex;
    flex-direction: row;
    padding: 5px 8px;
    margin-right: 12px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const ProductComplianceContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding: 0px 0px 20px 0px;
    border-bottom: 2px solid #ccc;
`;

const ProductComplianceRow = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 0px;
`;

const ProductInlabel = styled.h1`
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #808080;
    margin: 5px 0px;
`;

const PruductCheckBoxBound = styled.label`
    display: flex;
    padding: 5px 8px;
    align-items: center;
    text-align: left;
    border-radius: 5px;

    border: 2px solid #ccc
`;

const NewQuotePanel = (props) => {

    const [shipmentName, setShipmentName] = React.useState('');
    const [freightMethod, setFreightMethod] = React.useState(1);    // 1: ocean freight, 2: both, 3: airfreight, 4: truck
    const [shipmentType, setShipmentType] = React.useState(2);
    const [containerType, setContainerType] = React.useState(1);
    const [incoterms, setIncotermsValue] = React.useState(1);
    const [originPort, setOriginPort] = React.useState(1);
    const [pickupReadyDate, setPickupReadyDate] = React.useState("");
    const [delieverToLocation, setDelieverToLocation] = React.useState(false);
    const [destPort, setDestPort] = React.useState(1);
    const [targetDeliveryDate, setTargetDeliveryDate] = React.useState("");
    const [cargoUnit, setCargoUnit] = React.useState(true);
    const [ispackageDetails, setPackageDetails] = React.useState(false);
    const [cargoweight, setCargoWeight] = React.useState(0);
    const [cargovolume, setCargoVolume] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [haveBattery, setHaveBattery] = React.useState(false);
    const [haveHazardous, setHaveHazardous] = React.useState(false);
    const [haveLiquids, setHaveLiquids] = React.useState(false);
    const [haveNothing, setHaveNothing] = React.useState(true);
    const [instruction, setInstruction] = React.useState("");
    const [originAddress, setOriginAddress] = React.useState("Canada");
    const [destAddress, setDestAddress] = React.useState("Canada");

    function handleChangeOrigin(address){
        setOriginAddress(address);
    };

    function handleChangeDest(address){
        setDestAddress(address);
    };

    function handleSelect(address) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

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

    function onOriginPortChanged(event) {
        setOriginPort(parseInt(event.target.value,10));
    }

    function onChangePickupDate(event) {
        setPickupReadyDate(event.target.value);
    }

    function onClickDelieveryMode(event, type) {
        event.preventDefault();
        setDelieverToLocation(type);
    }

    function onDestPortChanged(event) {
        setDestPort(parseInt(event.target.value, 10));
    }

    function onChangeTargetDeliveryDate(event) {
        setTargetDeliveryDate(event.target.value);
    }

    function handleChangeUnitSelection(event, mode) {
        setCargoUnit(mode);
    }

    function handleIfKnowPackageDetails(event, mode) {
        setPackageDetails(mode);
    }

    function handleChangeWeight(event) {
        setCargoWeight(event.target.value);
    }

    function handleChangeVolume(event) {
        setCargoVolume(event.target.value);
    }

    function onChangeDescription(event) {
        setDescription(event.target.value);
    }

    function onChangeNothing(event) {
        setHaveNothing(!haveNothing);
        if(event.target.value){
            setHaveBattery(false);
            setHaveHazardous(false);
            setHaveLiquids(false);
        }
    }

    function onChangeInstruction(event) {
        setInstruction(event.target.value);
    }

    function handleReviewQuote(event) {
        event.preventDefault();
        const { onReviewFreightQuote } = props;
        const data = {
            shipmentName,
            freightMethod,
            shipmentType,
            containerType,
            incoterms,
            originAddress,
            originPort,
            pickupReadyDate,
            delieverToLocation,
            destAddress,
            destPort,
            targetDeliveryDate,
            cargoUnit,
            ispackageDetails,
            cargoweight,
            cargovolume,
            description,
            haveBattery,
            haveHazardous,
            haveLiquids,
            haveNothing,
            instruction,
        };
        onReviewFreightQuote(data);
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
                    <LocationSearchInput address={originAddress} handleChange={handleChangeOrigin} handleSelect={handleSelect}/>
                    {/* <DefaultSelector value={originLocation} onChange={e => onOriginLocationChanged(e)}>
                        <DefaultSelectorOption value="us" > United States </DefaultSelectorOption>
                        <DefaultSelectorOption value="ca" > Canada </DefaultSelectorOption>
                        <DefaultSelectorOption value="cn" > China </DefaultSelectorOption>
                        <DefaultSelectorOption value="ru" > Russia </DefaultSelectorOption>
                    </DefaultSelector> */}
                </OriginRow>
                <OriginRow>
                    <OriginInLabel>Origin Port *</OriginInLabel>
                    <DefaultSelector value={originPort} onChange={e => onOriginPortChanged(e)}>
                        <DefaultSelectorOption value="1" > Port of Houston </DefaultSelectorOption>
                        <DefaultSelectorOption value="2" > Port of Shanghai </DefaultSelectorOption>
                        <DefaultSelectorOption value="3" > Port of Qingdao </DefaultSelectorOption>
                        <DefaultSelectorOption value="4" > Port Metro Vancouver </DefaultSelectorOption>
                    </DefaultSelector>
                </OriginRow>
                <OriginRow>
                    <OriginInLabel>When will your cargo be ready for pickup? *</OriginInLabel>
                    <DateInputBox placeholder="MM/DD/YYYY" type="date" value={pickupReadyDate} onChange={e=>onChangePickupDate(e)}/>
                </OriginRow>
            </OriginContainer>

            <DestinationContainer>
                <NameLabel>Destination</NameLabel>
                <DestinationRow>
                    <DestinationInLabel>I want Flexport to deliever the cargo from the port to the destination location.</DestinationInLabel>
                    <div style={{display : "flex", flexDirection: "row"}}>
                        <DestinationYesNoButton active={delieverToLocation} onClick={e=>onClickDelieveryMode(e, true)}>Yes</DestinationYesNoButton>
                        <DestinationYesNoButton active={!delieverToLocation} onClick={e=>onClickDelieveryMode(e, false)}>No</DestinationYesNoButton>
                    </div>
                </DestinationRow>
                <DestinationRow>
                    <DestinationInLabel>Destination Port *</DestinationInLabel>
                    <DefaultSelector value={destPort} onChange={e => onDestPortChanged(e)}>
                        <DefaultSelectorOption value="1" > Port of Houston </DefaultSelectorOption>
                        <DefaultSelectorOption value="2" > Port of Shanghai </DefaultSelectorOption>
                        <DefaultSelectorOption value="3" > Port of Qingdao </DefaultSelectorOption>
                        <DefaultSelectorOption value="4" > Port Metro Vancouver </DefaultSelectorOption>
                    </DefaultSelector>
                </DestinationRow>
                <DestinationRow>
                    <DestinationInLabel>Destination Location *</DestinationInLabel>
                    <LocationSearchInput address={destAddress} handleChange={handleChangeDest} handleSelect={handleSelect}/>
                    {/* <DefaultSelector value={destLocation} onChange={e => onDestLocationChanged(e)}>
                        <DefaultSelectorOption value="us" > United States </DefaultSelectorOption>
                        <DefaultSelectorOption value="ca" > Canada </DefaultSelectorOption>
                        <DefaultSelectorOption value="cn" > China </DefaultSelectorOption>
                        <DefaultSelectorOption value="ru" > Russia </DefaultSelectorOption>
                    </DefaultSelector> */}
                </DestinationRow>
                <DestinationRow>
                    <OriginInLabel>What is your target delivery date? *</OriginInLabel>
                    <DateInputBox placeholder="MM/DD/YYYY" type="date" value={targetDeliveryDate} onChange={e=>onChangeTargetDeliveryDate(e)}/>
                </DestinationRow>
            </DestinationContainer>

            <CargoContainer>
                <NameLabel>Cargo</NameLabel>
                <CargoInlabel>Cargo Units</CargoInlabel>
                <CargoRow>
                    <CargoRadioBound>
                        <Radio
                            checked={cargoUnit}
                            onChange={e => handleChangeUnitSelection(e, true)}
                            value="kg/cbm"
                            name="radio-button-unit"
                            inputProps={{ 'aria-label': 'kg/cbm' }}
                        />
                        kg/cbm
                    </CargoRadioBound>
                    <CargoRadioBound>
                        <Radio
                            checked={!cargoUnit}
                            onChange={e => handleChangeUnitSelection(e, false)}
                            value="lb/cft"
                            name="radio-button-unit"
                            inputProps={{ 'aria-label': 'lb/cft' }}
                        />
                        lb/cft
                    </CargoRadioBound>
                </CargoRow>
                <CargoInlabel>Do you know package details?</CargoInlabel>
                <CargoRow>
                    <CargoRadioBound>
                        <Radio
                            checked={ispackageDetails}
                            onChange={e => handleIfKnowPackageDetails(e, true)}
                            value="yes"
                            name="radio-button-unit"
                            inputProps={{ 'aria-label': 'yes' }}
                        />
                        Yes
                    </CargoRadioBound>
                    <CargoRadioBound>
                        <Radio
                            checked={!ispackageDetails}
                            onChange={e => handleIfKnowPackageDetails(e, false)}
                            value="no"
                            name="radio-button-unit"
                            inputProps={{ 'aria-label': 'no' }}
                        />
                        No
                    </CargoRadioBound>
                </CargoRow>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{display: "flex", flexDirection: "column", marginRight: "15px"}}>
                        <CargoInlabel>Total Weight *</CargoInlabel>
                        <TextField
                            id="outlined-adornment-weight"
                            variant="outlined"
                            value={cargoweight}
                            onChange={e => handleChangeWeight(e)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                            }}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <CargoInlabel>Total Volume *</CargoInlabel>
                        <TextField
                            id="outlined-adornment-weight"
                            variant="outlined"
                            value={cargovolume}
                            onChange={e => handleChangeVolume(e)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cbm</InputAdornment>,
                            }}
                        />
                    </div>
                </div>
            </CargoContainer>

            <ProductComplianceContainer>
                <NameLabel>Product & Compliance</NameLabel>
                <ProductComplianceRow>
                    <ProductInlabel>Description of Products</ProductInlabel>
                    <TextField
                        multiline
                        rows="3"
                        value={description}
                        margin="normal"
                        variant="outlined"
                        onChange={e => onChangeDescription(e)}
                        style={{display: "flex", width: "100%"}}
                    />
                </ProductComplianceRow>
                <ProductComplianceRow>
                    <ProductInlabel>Does your shipment contain any of the following goods? *</ProductInlabel>
                    <PruductCheckBoxBound>
                        <Checkbox
                            checked={haveBattery}
                            onChange={()=>!haveNothing&&setHaveBattery(!haveBattery)}
                            value={haveBattery}
                            color="secondary"
                            inputProps={{
                                'aria-label': 'secondary checkbox',
                            }}
                        />
                        <div style={{display: "flex", flex: 1, flexDirection: "row"}}>
                            <BatteryCharging50 />
                            Batterries
                        </div>
                    </PruductCheckBoxBound>
                    <PruductCheckBoxBound>
                        <Checkbox
                            checked={haveHazardous}
                            onChange={()=>!haveNothing&&setHaveHazardous(!haveHazardous)}
                            value={haveHazardous}
                            color="secondary"
                            inputProps={{
                                'aria-label': 'secondary checkbox',
                            }}
                        />
                        <div style={{display: "flex", flex: 1, flexDirection: "row"}}>
                            <img src={NuClearIcon} alt="nuclear" style={{height: "24px", width: "24px"}}/>
                            Hazardous Materials
                        </div>
                    </PruductCheckBoxBound>
                    <PruductCheckBoxBound>
                        <Checkbox
                            checked={haveLiquids}
                            onChange={()=>!haveNothing&&setHaveLiquids(!haveLiquids)}
                            value={haveLiquids}
                            color="secondary"
                            inputProps={{
                                'aria-label': 'secondary checkbox',
                            }}
                        />
                        <div style={{display: "flex", flex: 1, flexDirection: "row"}}>
                            <Warning />
                            Other (Creams, Liquids, Powders)
                        </div>
                    </PruductCheckBoxBound>
                    <PruductCheckBoxBound>
                        <Checkbox
                            checked={haveNothing}
                            onChange={(e)=>onChangeNothing(e)}
                            value={haveNothing}
                            color="primary"
                            inputProps={{
                                'aria-label': 'secondary checkbox',
                            }}
                        />
                        <div style={{display: "flex", flex: 1, flexDirection: "row"}}>
                            No, my shipment does not contain any of the goods listed
                        </div>
                    </PruductCheckBoxBound>
                </ProductComplianceRow>
            </ProductComplianceContainer>
            <NameLabel>Special Instructions</NameLabel>
            <TextField
                multiline
                rows="3"
                value={instruction}
                margin="normal"
                variant="outlined"
                onChange={e => onChangeInstruction(e)}
                style={{display: "flex", width: "100%"}}
            />

            <RequestFreightQuoteButton onClick={e => handleReviewQuote(e)}>
                Request Freight Quote
            </RequestFreightQuoteButton>
        </Container>
    );

};

NewQuotePanel.propTypes = {
    onReviewFreightQuote: PropTypes.func.isRequired,
};

const actionCreators = {
    onReviewFreightQuote: quoteActions.onReviewFreightQuote,
};

export default connect(null, actionCreators)(NewQuotePanel);