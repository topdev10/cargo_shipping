import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        width: ${props => 
    {
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
    margin-bottom: 8px;
`;

const ShipmentsFilterInput = styled.input`
    display: flex;
    padding: 8px 18px;
    border-radius: 20px;
    text-align: left;
    box-shadow: 2px 2px 5px #ccc;
    margin-right: ${props => {
        let size = "15px";
        if(props.left)
            size = "auto";
        return size;
    }}
`;

const ShipmentsFilterBtn = styled.div`
    display: flex;
    padding: 8px 18px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 2px 2px 5px #ccc;
    background: #fff;
    margin-right: 15px;
`;

class Shipments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // isflight: true,
            // isShip: true,
            // isVan: true,
            // location: "all",
            // Shipmentstate: 0,
            width: 0,
            // height: 0,
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
        this.setState({ width: window.innerWidth });
    };

    render() {
        const { menuState, pageStatus, onBackToMain } = this.props;
        // isflight, isShip, isVan, location, Shipmentstate, height,
        const { width } = this.state;
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
                        {width>1024?<KButton label="create booking" radius="small"/>:<KButton label="create" radius="small"/>}
                    </ShpimentExplorerHeader>
                }
                {
                    pageStatus===1&&
                    <ShipmentsFilterBar>
                        <ShipmentsFilterInput placeholder="Search by ID, Name here" left/>
                        <ShipmentsFilterBtn>Filter by Booking Dates</ShipmentsFilterBtn>
                        <ShipmentsFilterBtn>Sory By</ShipmentsFilterBtn>
                        <ShipmentsFilterInput placeholder="Search by ID, Name here"/>
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