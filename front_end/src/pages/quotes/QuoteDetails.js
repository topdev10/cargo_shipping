import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { quoteActions } from '../../actions';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    left: 320px;
    margin-top: 64px;
    width: calc(100% - 320px);
    height: calc(100vh - 64px);
    padding: 7px;
    overflow: auto;
`;

class QuoteDetails extends React.Component{

    constructor(props){
        super(props);
        this.state= {

        };
    }

    render(){
        const {requestFreightQuote, newquote} = this.props;
        return(
            <Container>
                This is Quote details page... <br/>
                {newquote.shipmentName}
                <input type="button" onClick={e => requestFreightQuote(e, newquote)} value="press me" />
            </Container>
        );
    }
}

QuoteDetails.propTypes = {
    requestFreightQuote: PropTypes.func.isRequired,
    newquote: PropTypes.shape({
        shipmentName: PropTypes.string.isRequired,
        freightMethod: PropTypes.number.isRequired,
        shipmentType: PropTypes.number.isRequired,
        containerType: PropTypes.number.isRequired,
        incoterms: PropTypes.number.isRequired,
        originLocation: PropTypes.string.isRequired,
        originPort: PropTypes.number.isRequired,
        pickupReadyDate: PropTypes.string.isRequired,
        delieverToLocation: PropTypes.bool.isRequired,
        destLocation: PropTypes.string.isRequired,
        destPort: PropTypes.number.isRequired,
        targetDeliveryDate: PropTypes.string.isRequired,
        cargoUnit: PropTypes.bool.isRequired,
        ispackageDetails: PropTypes.bool.isRequired,
        cargoweight: PropTypes.number.isRequired,
        cargovolume: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        haveBattery: PropTypes.bool.isRequired,
        haveHazardous: PropTypes.bool.isRequired,
        haveLiquids: PropTypes.bool.isRequired,
        haveNothing: PropTypes.bool.isRequired,
        instruction: PropTypes.string.isRequired,
    }),
};

function mapStateToProps(state) {
    return {
        newquote: state.quote.newquote,
    };
}

const actionCreators = {
    requestFreightQuote: quoteActions.requestFreightQuote,
};

export default connect(mapStateToProps, actionCreators)(QuoteDetails);