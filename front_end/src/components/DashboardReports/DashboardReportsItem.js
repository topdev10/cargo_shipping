import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AirplanemodeActiveOutlined from '@material-ui/icons/AirplanemodeActiveOutlined';
import LocalShipping from '@material-ui/icons/LocalShipping';
import DirectionsBoatOutlined from '@material-ui/icons/DirectionsBoatOutlined';

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;

const ReportsItem = styled.div`
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

const ReportsItemRow = styled.div`
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

const ItemLocation = styled.h1`
    font-size: 14px;
    color: black;
    flex: 1;
`;

const ReportsStateItem = styled.div`
    display: flex-end;
`;

class DashboardReportsItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    render(){
        const { reports } = this.props;
        return(
            <Container>
                {reports!==null&&
                // eslint-disable-next-line react/prop-types
                reports.map((row) => 
                    <ReportsItem key={row.id}>
                        <ReportsItemRow>
                            <IDLabel>{row.id} </IDLabel>
                            <VendLabel> - {row.venderID}</VendLabel>
                        </ReportsItemRow>
                        <ReportsItemRow>
                            <ItemLocation>
                                Here is your reports state..
                            </ItemLocation>
                            <ReportsStateItem>
                                {row.state===2&&<AirplanemodeActiveOutlined />}
                                {row.state===3&&<LocalShipping />}
                                {row.state===1&&<DirectionsBoatOutlined />}
                            </ReportsStateItem>
                        </ReportsItemRow>
                    </ReportsItem>
                )}
            </Container>
        );
    }    
};

DashboardReportsItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    reports: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
    return {
        reports: props.reports,
    };
};

export default connect(mapStateToProps)(DashboardReportsItem);