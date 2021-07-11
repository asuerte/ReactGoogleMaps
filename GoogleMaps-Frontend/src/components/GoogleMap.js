import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // for google map places autocomplete
            address: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter: {
                lat: -33.8688,
                lng: 151.2093,
            }
        };
    }

    handleChange = address => {
        this.setState({ address });
    };


    handleSelect = address => {
        this.setState({ address });
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.props.onAdd(latLng.lat, latLng.lng)
                this.props.getDetails()

                // update center state
                this.setState({ address });
                this.setState({ mapCenter: latLng });
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <div id='googleMaps'>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                    style: { width: '350px', height: '25px' },
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>

                <Map
                    google={this.props.google}
                    style={{
                        float: 'left',
                        position: 'relative',
                        marginTop: '30px',
                        marginLeft: '30px',
                        marginRight: '30px',
                        width: Object.entries(this.props.details).length === 0 ? "1300px" : "950px",
                        height: '530px'
                    }}
                    initialCenter={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    center={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                >
                    <Marker
                        position={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }} />
                </Map>
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCMvYtSxM7u76SEYbtTYTjdIiNYrDNv9wQ')
})(MapContainer)