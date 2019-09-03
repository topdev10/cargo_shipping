import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import AirplanemodeActiveOutlined from '@material-ui/icons/AirplanemodeActiveOutlined';
import LocalShipping from '@material-ui/icons/LocalShipping';
import DirectionsBoatOutlined from '@material-ui/icons/DirectionsBoatOutlined';

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
`;

const ShipmentItem = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #E8ECEF;
    padding: 5px 0px;
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
    color: #55f;
`;

const ShipmentProgressRow = styled.div`
    display: flex;
    flex-direction: column;
    font-familiy: 'Rubik';
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
`;

const ItemLocation = styled.h1`
    font-size: 14px;
    color: black;
    flex: 1;
`;

const ShipmentTypeItem = styled.div`
    display: flex-end;
`;

const CommitLabel = styled.h1`
    font-size: 14px;
    color: black;
    font-weight: 500;
`;

class ShipmentDashboardItem extends React.Component {

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
                            <IDLabel>{row.id} </IDLabel>
                            <VendLabel> - {row.venderID}</VendLabel>
                        </ShipmentItemRow>
                        <ShipmentItemRow>
                            <ItemLocation>
                                {row.location}
                            </ItemLocation>
                            <ShipmentTypeItem>
                                {row.route===2&&<AirplanemodeActiveOutlined />}
                                {row.route===3&&<LocalShipping />}
                                {row.route===1&&<DirectionsBoatOutlined />}
                            </ShipmentTypeItem>
                        </ShipmentItemRow>
                        <ShipmentProgressRow>
                            <ThemeProvider theme={theme}>
                                {
                                    row.state===1&&<LinearProgress style={{width: "100%", borderRadius: "2px" }}variant="determinate" value={row.progress} color="secondary"/>
                                }
                                {
                                    row.state!==1&&<LinearProgress style={{width: "100%", borderRadius: "2px" }}variant="determinate" value={row.progress} color="primary"/>
                                }
                                {row.progress}
                            </ThemeProvider>                            
                            {/* <CustomProgressBar max="100" value={row.progress}></CustomProgressBar> */}
                        </ShipmentProgressRow>
                        <CommitLabel>
                            {row.commit}
                        </CommitLabel>
                    </ShipmentItem>
                )}
            </Container>
        );
    }    
};

ShipmentDashboardItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    shipments: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
    return {
        shipments: props.shipments,
    };
};

export default connect(mapStateToProps)(ShipmentDashboardItem);