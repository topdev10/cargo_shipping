import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import DirectionsBoat from '@material-ui/icons/DirectionsBoat';
import LocalShipping from '@material-ui/icons/LocalShipping';
import Device from '../../css/device';
import ShipmentsTable from '../../components/ShipmentPage/ShipmentsTable';
import ShipmentDetails from '../../components/ShipmentPage/ShipmentDeatils';
import { menuConstants } from '../../constants';
import { shipActions } from '../../actions';
import { KButton } from '../../components/Basic';

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
        padding: 30px 40px 50px 40px;
        width: ${props => {
            let width = "100%";
            if (props.menuState === menuConstants.MENU_OPEN)
                width = "calc(100% - 320px)";
            return width;
        }
        }
    }
`;

const ShpimentExplorerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px 18px;
    margin-bottom: 24px;
`;

const ShipmentExploreTitle = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
`;

const ShipmentTitleContentH1 = styled.span`
    display:  flex;
    font-size: 18px;
    color: black;
    font-weight: 500;
`;

const ShipmentTitleContentH2 = styled.span`
    display:  flex;
    font-size: 14px;
    color: black;
`;

const ShipmentsFilterBar = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 8px;
    height: 64px;
    // border-top: 2px solid #ccc;
    // border-bottom: 2px solid #ccc;
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
            width: 0,
            height: 0,
        };
    }
    /* Get Window Height&Width (get Resize event) */

    // getWindowDimensions = () => {
    //     const { innerWidth: width, innerHeight: height } = window;
    //     return {
    //         width,
    //         height
    //     };
    // }
    
    // useWindowDimensions = () => {
    //     const [windowDimensions, setWindowDimensions] = useState(
    //         getWindowDimensions()
    //     );

    //     useEffect(() => {
    //         function handleResize() {
    //             setWindowDimensions(getWindowDimensions());
    //         }

    //         window.addEventListener("resize", handleResize);
    //         return () => window.removeEventListener("resize", handleResize);
    //     }, []);

    //     return windowDimensions;
    // }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    render() {
        const { menuState, pageStatus, onBackToMain } = this.props;
        const { isflight, isShip, isVan, location, Shipmentstate, height, width } = this.state;
        return (
            <Container menuState={menuState}>
                {
                    pageStatus===1&&
                    <ShpimentExplorerHeader>
                        <ShipmentExploreTitle>
                            <ShipmentTitleContentH1>
                                Shipment Expoloer
                            </ShipmentTitleContentH1>
                            <ShipmentTitleContentH2>
                                All the active Shipment requests are listed here
                            </ShipmentTitleContentH2>
                        </ShipmentExploreTitle>
                        {width>1024?<KButton label="create booking"/>:<KButton label="create"/>}
                    </ShpimentExplorerHeader>
                }
                {
                    pageStatus===1&&
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
                }
                <div className="w-100">
                    {
                        pageStatus===1&&<ShipmentsTable />
                    }
                    {
                        pageStatus===2&&<ShipmentDetails onBack={onBackToMain}/>
                    }
                </div>
            </Container>
        );
    };
};

function mapStateToProps(state) {
    return {
        menuState: state.menu.menuState,
        pageStatus: state.ships.pageStatus,
    };
}

Shipments.propTypes = {
    menuState: PropTypes.string.isRequired,
    pageStatus: PropTypes.number.isRequired,
    onBackToMain: PropTypes.func.isRequired,
};

const actionCreators = {
    onBackToMain: shipActions.onBackToMain,
};

export default connect(mapStateToProps, actionCreators)(Shipments);