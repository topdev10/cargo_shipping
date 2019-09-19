/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

import Config from '../config';

import Airplane from '../images/icons8-airplane-mode-on-100.png';
import Boat from '../images/icons8-cargo-ship-100.png';
import Van from '../images/icons8-van-100.png';

const mapStyles = {
    position: "relative",
    background: "green",
    height: "45%",
    minWidth: "500px",
    width: "100%",
    left: "0px",
    '@media (minWidth: 1024px)': {
        left: "320px",
        width: "calc(100% - 324px)",
    }
};

export class GoogleMap extends Component {

    state = {
        showingInfoWindow: false,  // Hides or the shows the infoWindow
        zoom: 15,
        center: {
            lat: 0.00,
            lng: 0.00,
        },
        once: false,
    };

    onMarkerClick = (pos) => {
        if(pos){
            this.setState({
                showingInfoWindow: true,
                center: pos,
                zoom: 19,
                once: true,
            });
            this.setState({
                zoom: 20,
            });
        }            
    }

    onClose = () => {
        const { showingInfoWindow } = this.state;
        if (showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
            });
        }
    };

    handleZoomChanged = () => {
        // console.log(this);
    }

    render() {
        // eslint-disable-next-line react/prop-types
        const { data, locationList, google } = this.props;
        const { zoom, once } = this.state;
        let { center } = this.state;
        if(!once){
            center = {
                lat: data!==null?(data.latitude):(0.00),
                lng: data!==null?(data.longitude):(0.00),
            };
        }
        return (
            <Map
                google={google}
                zoom={zoom}
                style={mapStyles}
                initialCenter={center}
                center={center}
                onZoomChanged={this.handleZoomChanged}
            >
                {
                    data!==null&&<Marker
                        position={{lat: data.latitude, lng: data.longitude}}
                        onClick={() => this.onMarkerClick({
                            lat: data.latitude,
                            lng: data.longitude
                        })}
                        name={['Kenyatta International Convention Centre']}
                    />
                }
                {
                    locationList!==null&&
                    locationList.map(
                        (location) => (
                            <Marker
                                position={{lat: location.latitude, lng: location.longitude}}
                                // lat={11.0168}
                                // lng={76.9558}
                                name={location.label} 
                                onClick={() => this.onMarkerClick({
                                    lat: location.latitude,
                                    lng: location.longitude
                                })}
                                key={location.type}
                                icon={{
                                    url: (location.type===1&&Airplane)||(location.type===2&&Boat)||(location.type===3&&Van)||(location.type===4&&Van),
                                    anchor: new google.maps.Point(16,16),
                                    scaledSize: new google.maps.Size(32,32)
                                }}
                            />
                        )
                    )
                }
            </Map>
        );
    }
}

GoogleMap.defaultProps = {
    data: {
        latitude: 0,
        longitude: 0,
    },
    locationList: [],
};

GoogleMap.propTypes = {
    data: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number
    }),
    // eslint-disable-next-line react/forbid-prop-types
    locationList: PropTypes.array,
};

export default GoogleApiWrapper({
    apiKey: `${Config.GOOGLE_PUBLIC_KEY}`
})(GoogleMap);