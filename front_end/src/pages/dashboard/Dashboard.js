import React from 'react';
import styled from 'styled-components';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import DirectionsBoatRounded from '@material-ui/icons/DirectionsBoatRounded';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { pageActions } from '../../actions';
import { pageConstants, menuConstants } from '../../constants';
import Map from '../../components/map';
import ActiveShipments from '../../components/ActiveShipments/ActiveShipments';
import ActiveQuotes from '../../components/ActiveQuotes/ActiveQuotes';
import DashboardBillings from '../../components/DashboardBillings/DashboardBillings';
// import DashboardReports from '../../components/DashboardReports/DashboardReports';
import Device from '../../css/device';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    float: left;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    width: 100%;
    background: #cccccc40;
    transition: width 1s;
    @media ${Device.laptop} {    
        width: ${props => {
        let width = "100%";
        if(props.menuState === menuConstants.MENU_OPEN)
            width = "100%";
        return width;
    }}
    }
`;

const GoogleMapWrapper = styled.div`
    height: 45%;
    min-width: 500px;
    width: 100%;
`;

const DetailsContainer = styled.div`
    height: 55%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    padding: 0px 20px 20px 20px;
    width: 100%;
    left: 0px;
`;

const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
    @media ${Device.laptop} {
        flex-direction: row;
    }
`;

class Dashboard extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            // tabIndex: 0,
        };
    }

    componentDidMount(){
        const {info} = this.props;
        if(info){
            const { loadPage, token, email } = this.props;
            loadPage(pageConstants.DASHBOARD, token, email);
        }
    }

    // handleTabChange = (e, newValue) => {
    //     e.preventDefault();
    //     this.setState({tabIndex: newValue});
    // }

    render(){
        const data = {latitude: 31.023536, longitude: 121.424031};
        const locationList = [
            {
                type: 1,
                label:"Flight",
                latitude: 31.024056,
                longitude: 121.441071
            },
            {
                type: 2,
                label:"Boat",
                latitude: 31.025976,
                longitude: 121.431021
            },
            {
                type: 3,
                label:"Local",
                latitude: 31.023936,
                longitude: 121.421031
            },
            {
                type: 4,
                label:"Paused",
                latitude: 31.022916,
                longitude: 121.413090
            }
        ];
        const { menuState, dashboardState } = this.props;
        // const { tabIndex } = this.state;
        return (
            <Container menuState={menuState}>
                {
                    dashboardState!=="loading"&&
                    <GoogleMapWrapper>
                        <Map data={data} locationList={locationList}/>
                    </GoogleMapWrapper>
                }
                {
                    dashboardState!=="loading"&&
                    <DetailsContainer>
                        <InfosContainer>
                            <ActiveQuotes/>
                            <ActiveShipments/>
                            <DashboardBillings/>
                        </InfosContainer>
                    </DetailsContainer>
                }
                {
                    dashboardState==="loading"&&<div>Loading...</div>
                }
                
            </Container>
        );
    }
};

function mapStateToProps(state) {
    return {
        info: state.page.info,
        menuState: state.menu.menuState,
        dashboardState: state.page.dashboardState,
        token: state.auth.user.token,
        email: state.auth.user.email,
    };
}

Dashboard.defaultProps = {
    info: null,
};

Dashboard.propTypes = {
    info: PropTypes.shape({
        shipments: PropTypes.array,
        quotes: PropTypes.array,
        billings: PropTypes.array,
        reports: PropTypes.array,
    }),
    loadPage: PropTypes.func.isRequired,
    menuState: PropTypes.string.isRequired,
    dashboardState: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
};

export default connect(mapStateToProps, actionCreators)(Dashboard);