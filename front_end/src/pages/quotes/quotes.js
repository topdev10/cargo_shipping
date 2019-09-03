import React from 'react';
import styled from 'styled-components';

import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import DirectionsBoat from '@material-ui/icons/DirectionsBoat';
import LocalShipping from '@material-ui/icons/LocalShipping';

import QuotesTableHeader from './QuotesTableHeader';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    left: 320px;
    margin-top: 64px;
    width: calc(100% - 320px);
    height: calc(100vh - 64px);
    padding: 12px;
`;

const QuotesFilterBar = styled.div`
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

const QuotesTableContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 150px);
    border: top: 2px solid #ccc;
`;

const FreightSelectionButtonLeft = styled.button`

    border: ${props => {
        let border = "2px solid #576cef";
        if(props.active)
            border = "2px solid #007708";
        return border;
    }}

    background: ${props => {
        let background = "white";
        if(props.active)
            background = "#d3f1ef";
        return background;
    }}

    display: flex;
    border-radius: 6px 0px 0px 6px;
    padding: 0px 8px;

    &:hover {
        border: 2px solid #007708;
        background: #d3f1ef;
    }
`;

const FreightSelectionButtonCenter = styled.button`

    border-top: ${props => {
        let border = "2px solid #576cef";
        if(props.active)
            border = "2px solid #007708";
        return border;
    }}

    border-bottom: ${props => {
        let border = "2px solid #576cef";
        if(props.active)
            border = "2px solid #007708";
        return border;
    }}
    padding: 0px 8px;

    background: ${props => {
        let background = "white";
        if(props.active)
            background = "#d3f1ef";
        return background;
    }}

    display: flex;

    &:hover {
        border: 2px 0px 2px 0px solid #576cef;
        background: #d3f1ef;
    }
`;

const FreightSelectionButtonRight = styled.button`

    border: ${props => {
        let border = "2px solid #576cef";
        if(props.active)
            border = "2px solid #007708";
        return border;
    }}

    background: ${props => {
        let background = "white";
        if(props.active)
            background = "#d3f1ef";
        return background;
    }}

    display: flex;
    border-radius: 0px 6px 6px 0px;
    padding: 0px 8px;

    &:hover {
        border: 2px solid #007708;
        background: #d3f1ef;
    }
`;

const RequestQuoteButton = styled.button`
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
    padding: 0px 8px;
    flex: flex-end;
    
    &:hover {
        background: #6688e4;
    }
`;

const Quotes = () => {
    
    const [quotes, SelectQuotes] = React.useState(0);
    const [location, SelectLocation] = React.useState('ca');
    const [isflight, SetFlight] = React.useState(false);
    const [isShip, SetShip] = React.useState(false);
    const [isVan, SetVan] = React.useState(false);

    function handleQuoteScopeSelection(event) {
        SelectQuotes(event.target.value);
    }

    function handleLocationSeltion(event) {
        SelectLocation(event.target.value);
    }

    function onFlightButton(event) {
        event.preventDefault();
        SetFlight(!isflight);
    }

    function onShipButton(event) {
        event.preventDefault();
        SetShip(!isShip);
    }

    function onVanButton(event) {
        event.preventDefault();
        SetVan(!isVan);
    }

    return (
        <Container>
            <QuotesFilterBar>
                <CustomSelector value={quotes} onChange={handleQuoteScopeSelection}>
                    <CustomSelectorOption value={0}>All</CustomSelectorOption>
                    <CustomSelectorOption value={1}>Active Quotes</CustomSelectorOption>
                    <CustomSelectorOption value={2}>Ready to Book</CustomSelectorOption>
                    <CustomSelectorOption value={3}>Accepted Quotes</CustomSelectorOption>
                    <CustomSelectorOption value={4}>Expired Quotes</CustomSelectorOption>
                    <CustomSelectorOption value={5}>All Quotes</CustomSelectorOption>
                </CustomSelector>
                {isflight?<FreightSelectionButtonLeft active onClick={onFlightButton}>
                    <FlightTakeoff></FlightTakeoff>
                </FreightSelectionButtonLeft>:<FreightSelectionButtonLeft onClick={onFlightButton}>
                    <FlightTakeoff></FlightTakeoff>
                </FreightSelectionButtonLeft>}
                
                {isShip?<FreightSelectionButtonCenter active onClick={onShipButton}>
                    <DirectionsBoat></DirectionsBoat>
                </FreightSelectionButtonCenter>:<FreightSelectionButtonCenter onClick={onShipButton}>
                    <DirectionsBoat></DirectionsBoat>
                </FreightSelectionButtonCenter>}

                {isVan?<FreightSelectionButtonRight active onClick={onVanButton}>
                    <LocalShipping></LocalShipping>
                </FreightSelectionButtonRight>:<FreightSelectionButtonRight onClick={onVanButton}>
                    <LocalShipping></LocalShipping>
                </FreightSelectionButtonRight>}

                {/* Location Selctor */}
                <CustomSelector value={location} onChange={handleLocationSeltion}>
                    <CustomSelectorOption value='all'>Select a Location</CustomSelectorOption>
                    <CustomSelectorOption value='ca'>Canada</CustomSelectorOption>
                    <CustomSelectorOption value='us'>United States</CustomSelectorOption>
                    <CustomSelectorOption value='cn'>China</CustomSelectorOption>
                    <CustomSelectorOption value='au'>Australia</CustomSelectorOption>
                    <CustomSelectorOption value='ru'>Russia</CustomSelectorOption>
                </CustomSelector>
                <RequestQuoteButton>Request Quote</RequestQuoteButton>
            </QuotesFilterBar>
            <QuotesTableContainer>
                <QuotesTableHeader/>
            </QuotesTableContainer>
        </Container>
    );
};

export default Quotes;