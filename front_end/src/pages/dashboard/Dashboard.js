import React from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DirectionsBoatRounded from '@material-ui/icons/DirectionsBoatRounded';
import AssignmentRounded from '@material-ui/icons/AssignmentRounded';
import AssessmentRounded from '@material-ui/icons/AssessmentRounded';
import AccountBalanceRounded from '@material-ui/icons/AccountBalanceRounded';

import Map from '../../components/map';
import ActiveShipments from '../../components/ActiveShipments/ActiveShipments';
import ActiveQuotes from '../../components/ActiveQuotes/ActiveQuotes';
import DashboardBillings from '../../components/DashboardBillings/DashboardBillings';
import DashboardReports from '../../components/DashboardReports/DashboardReports';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 999;
    top: 0px;
    left: 322px;
    margin-top: 64px;
    width: calc(100% - 320px);
    height: calc(100vh - 64px);
`;

const GoogleMapWrapper = styled.div`
    width: calc(100vw - 320px);
    height: 45%;
    min-width: 500px;
`;

const DetailsContainer = styled.div`
    width: calc(100vw - 320px);
    height: 55%;
    position: relative;
    overflow: hidden;
    padding: 0px 20px 20px 20px;
    z-index: 999;
`;

class Dashboard extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }

    componentDidMount(){

    }

    handleTabChange = (e, newValue) => {
        e.preventDefault();
        this.setState({tabIndex: newValue});
    }

    render(){
        const data = {latitude: 31.024956, longitude: 121.441061};
        const locationList = [
            {
                type: 1,
                latitude: 31.002152,
                longitude: 32.542654
            },
            {
                type: 2,
                latitude: 21.002152,
                longitude: 32.542654
            },
            {
                type: 3,
                latitude: 29.002152,
                longitude: 132.542654
            },
            {
                type: 4,
                latitude: 10.002152,
                longitude: 42.542654
            }
        ];
        const { tabIndex } = this.state;
        return (
            <Container>
                <GoogleMapWrapper>
                    <Map data={data} locationList={locationList}/>
                </GoogleMapWrapper>
                <DetailsContainer>
                    <Tabs
                        value={tabIndex}
                        onChange={this.handleTabChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="icon label tabs example"
                        style={{height: "48px", alignItems: "center"}}
                    >
                        <Tab icon={<DirectionsBoatRounded />} />
                        <Tab icon={<AssignmentRounded />} />
                        <Tab icon={<AccountBalanceRounded />} />
                        <Tab icon={<AssessmentRounded />} />
                    </Tabs>
                    {tabIndex===0&&<ActiveShipments/>}
                    {tabIndex===1&&<ActiveQuotes/>}
                    {tabIndex===2&&<DashboardBillings/>}
                    {tabIndex===3&&<DashboardReports/>}
                </DetailsContainer>
            </Container>
        );
    }
};

export default Dashboard;