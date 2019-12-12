import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components';

const DefaultInputBox = styled.input`
    height: 42px;
    margin: 8px 0px;
    border-radius: 4px;
    border: 2px solid #ccc;
    padding: 5px 10px 5px 12px;
    width: 100%;

    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #252631;

    &:hover {
        border: 2px solid #576cef;
    }
`;

const HintBox = styled.div`
    border-radius: 4px;
    border: 2px solid #c33;
    padding: 5px 10px 5px 12px;
    width: 100%;

    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 19px;
    color: #292631;
`;

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { address, handleChange, handleSelect } = this.props;
        return (
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div>
                        <DefaultInputBox
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        {suggestions.length>0&&
                        <HintBox>
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
                        </HintBox>}
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

LocationSearchInput.propTypes = {
    address: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
};

export default LocationSearchInput;