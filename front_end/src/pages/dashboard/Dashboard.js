import React from 'react';
import styled from 'styled-components';
import Map from '../../components/map';
import ActiveShipments from '../../components/ActiveShipments/ActiveShipments';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 999;
    top: 0px;
    left: 245px;
    margin-top: 64px;
    width: calc(100% - 244px);
    height: calc(100vh - 64px);
`;

const GoogleMapWrapper = styled.div`
    width: calc(100vw - 244px);
    height: 50%;
    min-width: 500px;
`;

const DetailsContainer = styled.div`
    width: calc(100vw - 244px);
    height: 50%;
    overflow: hidden;
    padding: 20px;
    z-index: 999;
`;

class Dashboard extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount(){

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
        return (
            <Container>
                <GoogleMapWrapper>
                    <Map data={data} locationList={locationList}/>
                </GoogleMapWrapper>
                <DetailsContainer>
                    <ActiveShipments/>
                </DetailsContainer>
            </Container>
        );
    }
};

export default Dashboard;