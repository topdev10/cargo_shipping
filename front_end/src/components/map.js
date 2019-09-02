import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';
import Config from '../config';

const mapStyles = {
    position: "relative",
    background: "green",
    width: "calc(100vw - 246px)",
    height: "45%",
    minWidth: "500px",
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
                zoom={18}
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
                                onClick={this.onMarkerClick}
                                name={['move ment pattern']}
                                key={location.type}
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