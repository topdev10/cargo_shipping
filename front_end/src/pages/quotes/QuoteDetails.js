import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { quoteActions } from '../../actions';
import Device from '../../css/device';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 40px 25px 0px 25px;
    overflow: auto;
    width: 100%;
    left: 0px;
`;

const HeadRow = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 18px;
    font-weight: 600;
    font-family: Arial;
    border-top: 3px solid #ddd;
    padding: 2px 5px;
`;

const HeadTitle = styled.h1`
    display: flex;
    flex: 1;
    font-size: 20px;
`;

const DownloadButton = styled.button`
    display: flex;
    border-radius: 6px;
    padding: 0px 8px;
    border: 2px solid #576cef;

    &:hover {
        border: 2px solid #007708;
        background: #d3f1ef;
    }
`;

const ContainerTitle = styled.h1`
    display: flex;
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    padding: 5px 0px;
`;

const TransitInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 0px;
`;

const TransitInformationFirstRow = styled.div`
    display: flex;
    flex-direction: row;
    border-top: 2px solid #ccc;
    padding: 10px;
`;

const TransitInformationSecondRow = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #ccc;
    padding: 10px;
`;

const TransitItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;    
`;

const TransitItemTop = styled.h1`
    display: flex;
    font-size: 18px;
    font-weight: 400;
    color: #ccc;
`;

const TransitItemBottom = styled.h1`
    display: flex;
    font-size: 18px;
    font-weight: 400;
    color: #000;
`;

const RestInformationContainer = styled.div`
    display: flex;
`;

const RequestButton = styled.button`
    width: 186px;
    height: 46px;
    background: #FFFFFF;
    border: 1px solid #778CA2;
    border-radius: 4px;
    margin-left: 20px;
    font-weight: 500;
    font-size: 18px;

    &:hover {
        background: #4D7CFE;
        color: white;
    }
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
                <HeadRow>
                    <HeadTitle>
                        Quote Details:
                    </HeadTitle>
                    <DownloadButton>
                        Download
                    </DownloadButton>
                </HeadRow>
                <TransitInformationContainer>
                    <ContainerTitle>
                        Transit Information
                    </ContainerTitle>
                    <TransitInformationFirstRow>
                        <TransitItem>
                            <TransitItemTop>Mode</TransitItemTop>
                            <TransitItemBottom>{newquote.freightMethod}</TransitItemBottom>
                        </TransitItem>
                        <TransitItem>
                            <TransitItemTop>Port to Port</TransitItemTop>
                            <TransitItemBottom>{newquote.pickupReadyDate}</TransitItemBottom>
                        </TransitItem>
                        <TransitItem>
                            <TransitItemTop>Rate expiration</TransitItemTop>
                            <TransitItemBottom>{newquote.targetDeliveryDate}</TransitItemBottom>
                        </TransitItem>
                        <TransitItem>
                            <TransitItemTop>Carrier</TransitItemTop>
                            <TransitItemBottom>Mode</TransitItemBottom>
                        </TransitItem>
                    </TransitInformationFirstRow>
                    <TransitInformationSecondRow>
                        <TransitItem>
                            <TransitItemTop>Freight Service</TransitItemTop>
                            <TransitItemBottom>Unspecified</TransitItemBottom>
                        </TransitItem>
                        <TransitItem>
                            <TransitItemTop>Closing days</TransitItemTop>
                            <TransitItemBottom>Unspecified</TransitItemBottom>
                        </TransitItem>
                        <TransitItem>
                            <TransitItemTop>Departure Days</TransitItemTop>
                            <TransitItemBottom>Unspecified</TransitItemBottom>
                        </TransitItem>
                        <TransitItem>
                            <TransitItemTop>Pre-carriage</TransitItemTop>
                            <TransitItemBottom>Unspecified</TransitItemBottom>
                        </TransitItem>
                    </TransitInformationSecondRow>
                </TransitInformationContainer>
                <RestInformationContainer>
                    <RequestButton onClick={e => requestFreightQuote(e, newquote)} > Next </RequestButton>
                </RestInformationContainer>
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
    }).isRequired,
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