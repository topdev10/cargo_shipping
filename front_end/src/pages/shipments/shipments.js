import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import DirectionsBoat from '@material-ui/icons/DirectionsBoat';
import LocalShipping from '@material-ui/icons/LocalShipping';
import Device from '../../css/device';
import ShipmentsTable from '../../components/ShipmentPage/ShipmentsTable';
import { menuConstants } from '../../constants';

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
    overflow: hidden;
    left: 0px;
    background: #cccccc40;
    transition: width 1s;
    @media ${Device.laptop} {    
        width: ${props => {
        let width = "100%";
        if (props.menuState === menuConstants.MENU_OPEN)
            width = "calc(100% - 320px)";
        return width;
    }}
    }
`;

const ShipmentsFilterBar = styled.div`
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

class Shipments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isflight: true,
            isShip: true,
            isVan: true,
            location: "all",
            Shipmentstate: 0,
        };
    }

    render() {
        const { menuState } = this.props;
        const { isflight, isShip, isVan, location, Shipmentstate } = this.state;
        return (
            <Container menuState={menuState}>
                <ShipmentsFilterBar>
                    <CustomSelector value={Shipmentstate} onChange={e => this.ShipmentscopeSelection(e)}>
                        <CustomSelectorOption value={0}>Latest Booking</CustomSelectorOption>
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
                        <CustomSelectorOption value='all'>All</CustomSelectorOption>
                        <CustomSelectorOption value='ca'>In Process</CustomSelectorOption>
                        <CustomSelectorOption value='us'>Finished</CustomSelectorOption>
                    </CustomSelector>

                </ShipmentsFilterBar>
                <ShipmentsTable />
            </Container>
        );
    };
};

function mapStateToProps(state) {
    return {
        menuState: state.menu.menuState,
    };
}

Shipments.propTypes = {
    menuState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Shipments);