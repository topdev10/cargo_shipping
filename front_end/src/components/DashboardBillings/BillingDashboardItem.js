import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import Device from '../../css/device';
import { KButton } from '../Basic';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#ec4535',
        },
        primary: {
            main: "#32CD32",
        },
        accent: {
            backgroundColor: "#ec4535", // import purple doesnt work
            color: '#000',
        },
    },
});

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: white;
    @media ${Device.laptop} {
        height: calc(100% - 48px);
    }
`;

const ShipmentItem = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #E8ECEF;
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
        background: #f1f1f1;
        border-radius: 5px;
    }
`;

const ShipmentItemRow = styled.div`
    display: flex;
    flex-direction: row;
    font-familiy: 'Rubik';
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
`;

const IDLabel = styled.h1`
    align-items: center;
    font-style: normal;
    font-size: 15px;
    color: #000;
`;

const VendLabel = styled.h1`
    align-items: center;
    font-style: normal;
    font-size: 15px;
    color: black;
    font-weight: bold;
`;

const Date = styled.p`
font-style: normal;
font-size: 12px;
color: #ccc;
font-weight: normal;
margin-left: auto;
margin-bottom: 0px;
align-self: start;
`;

const ShipmentProgressRow = styled.div`
    display: flex;
    flex-direction: row;
    font-familiy: 'Rubik';
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const ItemLocation = styled.h1`
    font-size: 14px;
    color: #ccc;
    flex: 1;
    text-align: left;
`;

const ShipmentTypeItem = styled.h1`
    display: flex;
    font-size: 14px;
    flex: 1;
    color: #ccc;
`;

const CommitLabel = styled.h1`
    font-size: 14px;
    color: black;
    font-weight: 500;
    text-align: left;
`;

class BillingDashboardItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    render(){
        const { shipments } = this.props;
        return(
            <Container>
                {shipments!==null&&
                // eslint-disable-next-line react/prop-types
                shipments.map((row) => 
                    <ShipmentItem key={row.id}>
                        <ShipmentItemRow>
                            {/* <IDLabel>{row.id} </IDLabel> */}
                            <VendLabel> {row.venderID}</VendLabel>
                            <Date>2 days ago</Date>
                        </ShipmentItemRow>
                        <ShipmentItemRow>
                            <ItemLocation>
                                Houston
                            </ItemLocation>
                            <ShipmentTypeItem>
                                {/* {row.route===2&&<AirplanemodeActiveOutlined />}
                                {row.route===3&&<LocalShipping />}
                                {row.route===1&&<DirectionsBoatOutlined />} */}
                                China
                            </ShipmentTypeItem>
                        </ShipmentItemRow>
                        <ShipmentProgressRow>
                            <div style={{display: "flex",flex: 1}}>
                                <KButton label="MAKE A PAYMENT" radius="circle"/>
                            </div>
                            <div style={{display: "flex", flex: 1}}>
                                <KButton label="RE-SCHEDULE" color="gray" radius="circle"/>
                            </div>
                        </ShipmentProgressRow>
                    </ShipmentItem>
                )}
            </Container>
        );
    }
};

BillingDashboardItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    shipments: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
    return {
        shipments: props.shipments,
    };
};

export default connect(mapStateToProps)(BillingDashboardItem);