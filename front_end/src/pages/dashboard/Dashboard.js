import React from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import DirectionsBoatRounded from '@material-ui/icons/DirectionsBoatRounded';
import AssignmentRounded from '@material-ui/icons/AssignmentRounded';
import AssessmentRounded from '@material-ui/icons/AssessmentRounded';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
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
    position: relative;
    overflow: hidden;
    padding: 0px 20px 20px 20px;
    z-index: 999;
    width: 100%;
    left: 0px;
`;

class Dashboard extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }

    componentDidMount(){
        const {info} = this.props;
        if(info){
            const { loadPage } = this.props;
            loadPage(pageConstants.DASHBOARD);
        }
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
                        style={{height: "56px", alignItems: "center"}}
                    >
                        {/* <Tab icon={<DirectionsBoatRounded/>} label="Shipments" wrapped={flag}/> */}
                        <Tab icon={<AssignmentRounded />} label="Quotes"/>
                        <Tab icon={<MonetizationOn />} label="Invoices"/>
                        <Tab icon={<AssessmentRounded />}  label="Reports"/>
                    </Tabs>
                    {/* {tabIndex===0&&<ActiveShipments/>} */}
                    {tabIndex===0&&<ActiveQuotes/>}
                    {tabIndex===1&&<DashboardBillings/>}
                    {tabIndex===2&&<DashboardReports/>}
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