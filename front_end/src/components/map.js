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
    };

    onMarkerClick = () => {
        this.setState({
            showingInfoWindow: true
        });
    }

    onClose = () => {
        const { showingInfoWindow } = this.state;
        if (showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
            });
        }
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { data, locationList, google } = this.props;
        return (
            <Map
                google={google}
                zoom={15}
                style={mapStyles}
                initialCenter={{
                    lat: data!==null?(data.latitude):(0.00),
                    lng: data!==null?(data.longitude):(0.00),
                }}
                center={{
                    lat: data!==null?(data.latitude):(0.00),
                    lng: data!==null?(data.longitude):(0.00),
                }}
            >
                {
                    data!==null&&<Marker
                        position={{lat: data.latitude, lng: data.longitude}}
                        onClick={this.onMarkerClick}
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
                                onClick={this.onMarkerClick}
                                key={location.type}
                                icon={{
                                    url: (location.type===1&&Airplane)||(location.type===2&&Boat)||(location.type===3&&Van),
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