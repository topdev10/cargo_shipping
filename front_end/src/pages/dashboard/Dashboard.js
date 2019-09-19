import React from 'react';
import styled from 'styled-components';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import DirectionsBoatRounded from '@material-ui/icons/DirectionsBoatRounded';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { pageActions } from '../../actions';
import { pageConstants } from '../../constants';
import Map from '../../components/map';
// import ActiveShipments from '../../components/ActiveShipments/ActiveShipments';
import ActiveQuotes from '../../components/ActiveQuotes/ActiveQuotes';
import DashboardBillings from '../../components/DashboardBillings/DashboardBillings';
import DashboardReports from '../../components/DashboardReports/DashboardReports';
import Device from '../../css/device';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 999;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    width: 100%;
    left: 0px;
    @media ${Device.laptop} {
        left: 322px;
        width: calc(100% - 320px);
    }
`;

const GoogleMapWrapper = styled.div`
    height: 45%;
    min-width: 500px;
    width: 100%;
    left: 0px;
    @media ${Device.laptop} {
        left: 320px;
        width: calc(100% - 320px);
    }
`;

const DetailsContainer = styled.div`
    height: 55%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    padding: 0px 20px 20px 20px;
    z-index: 999;
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
            const { loadPage } = this.props;
            loadPage(pageConstants.DASHBOARD);
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
        // const { tabIndex } = this.state;
        return (
            <Container>
                <GoogleMapWrapper>
                    <Map data={data} locationList={locationList}/>
                </GoogleMapWrapper>
                <DetailsContainer>
                    {/* <Tab icon={<DirectionsBoatRounded/>} label="Shipments" wrapped={flag}/>
                    <Tab icon={<AssignmentRounded />} label="Quotes" disabled/>
                    <Tab icon={<MonetizationOn />} label="Invoices" disabled/>
                    <Tab icon={<AssessmentRounded />}  label="Reports" disabled/> */}
                    {/* {tabIndex===0&&<ActiveShipments/>} */}
                    <InfosContainer>
                        <ActiveQuotes/>
                        <DashboardBillings />
                        <DashboardReports />
                    </InfosContainer>
                    {/* {tabIndex===0&&<ActiveQuotes/>}
                    {tabIndex===1&&<DashboardBillings/>}
                    {tabIndex===2&&<DashboardReports/>} */}
                </DetailsContainer>
            </Container>
        );
    }
};

function mapStateToProps(state) {
    return {
        info: state.page.info,
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
};

const actionCreators = {
    loadPage: pageActions.loadPage,
};

export default connect(mapStateToProps, actionCreators)(Dashboard);