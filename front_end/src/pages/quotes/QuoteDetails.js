import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pdf from "react-to-pdf";
import { connect } from 'react-redux';
import { quoteActions } from '../../actions';

import Device from '../../css/device';

import PinStart from '../../images/maps-and-flags.png';
import Anchor from '../../images/big-anchor.png';
import DownloadIcon from '../../images/file.png';

const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: "a3",
};

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    height: calc(100vh - 64px);
    padding: 40px 25px 10px 25px;
    overflow: auto;
    width: 100%;
    left: 0px;
`;

const PDFContainer = styled.div`
    display: flex;
    flex-direction: column;
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

    &:hover {
        background: #d3f1ef;
    }
`;

const ContainerTitle = styled.h1`
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
    flex-direction: row;
    padding: 0px 12px;
    margin: 12px 0px;
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
        background: #FE7C4D;
        color: white;
    }
`;

const RateAndRouteContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media ${Device.laptopL} {
        flex-direction: row;
    }
`;

const RateInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const RouteContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 0px;
    @media ${Device.laptopL} {
        margin-left: 16px;
        width: 400px;
        min-width: 340px;
    }
`;

const RateSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8px 0px;
`;

const SubLabelRow = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #ccc;
`;

const SubValueRow = styled.div`
    padding: 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SubtotalRow = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 18px;
    font-weight: 600;
    padding: 5px 0px;
`;

const BLabel = styled.h1`
    flex: 2;
    font-size: 16px;
    font-weight: 500;
`;

const SLabel = styled.h1`
    flex: 1;
    font-size: 16px;
    font-weight: 400;
`;

const RouteHeadRow = styled.div`
    display: flex;
    flex-direction: row;
`;

const RouteFirstForm = styled.div`
    display: flex;
    flex-direction: column;
    margin: 12px 0px;
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    padding: 8px 0px;
`;

const RouteFirstFormRow = styled.div`
    display: flex;
    flex-direction: row;
`;

const RouteFirstFormElement = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`;

const RouteSecondForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RouteSecondFormPlaceRow = styled.div`
    display: flex;
    flex-direction: row;
    border-left: 2px solid #ccc;
    width: calc(100% - 67px);
    height: 45px;
    justify-content: center;
`;

const RouteSecondFormLabelRow = styled.div`
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    width: 100%;
    padding: 0px 20px;
`;

const CustomIcon = styled.img`
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    height: 24px;
    width: 30px;
    background: #eee;
    border: 2px solid #ccc;
`;

const RouteDiaLabel = styled.h1`
    display: flex;
    flex: 1;
    justify-content: center;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

class QuoteDetails extends React.Component{

    constructor(props){
        super(props);
        this.state= {

        };
    }

    render(){
        const {requestFreightQuote, backRequestFreightQuote, newquote} = this.props;
        return(
            <Container ref={ref}>
                {/* <Pdf targetRef={ref} filename="code-example.pdf">
                    {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
                </Pdf> */}
                <PDFContainer>
                    <HeadRow>
                        <HeadTitle>
                            Quote Details:
                        </HeadTitle>
                        
                        <Pdf targetRef={ref} filename="QuoteDetails.pdf" options={options} onComplete={e => requestFreightQuote(e, newquote)}>
                            {({ toPdf }) => <DownloadButton onClick={toPdf}><img src={DownloadIcon} alt="Download"/></DownloadButton>}
                        </Pdf>
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
                    <RateAndRouteContainer>
                        <RateInformationContainer>
                            <ContainerTitle>Rate Information</ContainerTitle>
                            <RateSubContainer>
                                <SubLabelRow>
                                    <BLabel>Freight Charges</BLabel>
                                    <SLabel>Rate</SLabel>
                                    <SLabel>Quantity</SLabel>
                                    <SLabel style={{textAlign: "right", flex: 2}}>Price</SLabel>
                                </SubLabelRow>
                                <SubValueRow>
                                    <BLabel>FCL - 40 HQ Container</BLabel>
                                    <SLabel>$1,917.60</SLabel>
                                    <SLabel>x 1 container</SLabel>
                                    <SLabel style={{textAlign: "right", flex: 2}}>$1,917.60</SLabel>
                                </SubValueRow>
                                <SubtotalRow>
                                    <ContainerTitle>Subtotal</ContainerTitle>
                                    <ContainerTitle style={{textAlign: "right", flex: 2}}>$1,917.60</ContainerTitle>
                                </SubtotalRow>
                            </RateSubContainer>
                            <RateSubContainer>
                                <SubLabelRow>
                                    <BLabel>Destination Charges</BLabel>
                                    <SLabel>Rate</SLabel>
                                    <SLabel>Quantity</SLabel>
                                    <SLabel style={{textAlign: "right", flex: 2}}>Price</SLabel>
                                </SubLabelRow>
                                <SubValueRow>
                                    <BLabel>Destination Handling</BLabel>
                                    <SLabel></SLabel>
                                    <SLabel></SLabel>
                                    <SLabel style={{textAlign: "right", flex: 2}}>$63.00</SLabel>
                                </SubValueRow>
                                <SubtotalRow>
                                    <ContainerTitle>Subtotal</ContainerTitle>
                                    <ContainerTitle style={{textAlign: "right", flex: 2}}>$63.60</ContainerTitle>
                                </SubtotalRow>
                            </RateSubContainer>
                            <RateSubContainer>
                                <SubLabelRow>
                                    <BLabel>Additional Charges</BLabel>
                                    <SLabel>Rate</SLabel>
                                    <SLabel>Quantity</SLabel>
                                    <SLabel style={{textAlign: "right", flex: 2}}>Price</SLabel>
                                </SubLabelRow>
                                <SubValueRow>
                                    <BLabel>Freight Insurance 2</BLabel>
                                    <SLabel></SLabel>
                                    <SLabel></SLabel>
                                    <SLabel style={{textAlign: "right", flex: 2}}>0.4% of Insured Amount</SLabel>
                                </SubValueRow>
                                <SubtotalRow>
                                    <ContainerTitle>Subtotal</ContainerTitle>
                                    <ContainerTitle style={{textAlign: "right", flex: 2}}>$0.00</ContainerTitle>
                                </SubtotalRow>
                            </RateSubContainer>
                        </RateInformationContainer>
                        <RouteContainer>
                            <RouteHeadRow>
                                <ContainerTitle style={{flex: 1}}>Route</ContainerTitle>
                                <BLabel style={{textAlign: "right"}}>Port To Port Estimate</BLabel>
                            </RouteHeadRow>
                            <RouteFirstForm>
                                <RouteFirstFormRow>
                                    <RouteFirstFormElement>Origin:</RouteFirstFormElement>
                                    <RouteFirstFormElement>Port to Port:</RouteFirstFormElement>
                                    <RouteFirstFormElement>Destination:</RouteFirstFormElement>
                                </RouteFirstFormRow>
                                <RouteFirstFormRow>
                                    <RouteFirstFormElement>--</RouteFirstFormElement>
                                    <RouteFirstFormElement>~ 13 days</RouteFirstFormElement>
                                    <RouteFirstFormElement>--</RouteFirstFormElement>
                                </RouteFirstFormRow>
                            </RouteFirstForm>
                            <RouteSecondForm>
                                <RouteSecondFormLabelRow>
                                    <CustomIcon src={PinStart}/>
                                    <RouteDiaLabel>
                                        Place of Pickup
                                    </RouteDiaLabel>
                                </RouteSecondFormLabelRow>
                                <RouteSecondFormPlaceRow>Yantian, China</RouteSecondFormPlaceRow>
                                <RouteSecondFormLabelRow>
                                    <CustomIcon src={Anchor}/>
                                    <RouteDiaLabel>
                                        Place of Pickup
                                    </RouteDiaLabel>
                                </RouteSecondFormLabelRow>
                                <RouteSecondFormPlaceRow>Yantian, China</RouteSecondFormPlaceRow>
                                <RouteSecondFormLabelRow>
                                    <CustomIcon src={Anchor} />
                                    <RouteDiaLabel>
                                        Place of Pickup
                                    </RouteDiaLabel>
                                </RouteSecondFormLabelRow>
                                <RouteSecondFormPlaceRow>Yantian, China</RouteSecondFormPlaceRow>
                            </RouteSecondForm>
                        </RouteContainer>
                    </RateAndRouteContainer>
                    <RestInformationContainer>
                        <RequestButton onClick={ backRequestFreightQuote } > Back </RequestButton>
                        <RequestButton onClick={e => requestFreightQuote(e, newquote)} > Add </RequestButton>
                    </RestInformationContainer>
                </PDFContainer>
            </Container>
        );
    }
}

QuoteDetails.propTypes = {
    requestFreightQuote: PropTypes.func.isRequired,
    backRequestFreightQuote: PropTypes.func.isRequired,
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
    backRequestFreightQuote: quoteActions.backRequestFreightQuote,
};

export default connect(mapStateToProps, actionCreators)(QuoteDetails);