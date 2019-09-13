import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Subtitles from '@material-ui/icons/SubtitlesOutlined';
import Device from '../../css/device';

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    height: auto;
    overflow-y: auto;
    @media ${Device.laptop} {
        height: calc(100% - 48px);
    }
`;

const BillingsItem = styled.div`
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

const BillingsItemRow = styled.div`
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

const InvoiceState = styled.div`
    display: flex;
    flex:1;
    font-size: 14px;
    color: black;
    font-weight: 500;
`;

const DateLabel = styled.h1`
    font-size: 14px;
    color: black;
    font-weight: 500;
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
        const { billings } = this.props;
        return(
            <Container>
                {billings!==null&&
                // eslint-disable-next-line react/prop-types
                billings.map((row) => 
                    <BillingsItem key={row.id}>
                        <BillingsItemRow>
                            <IDLabel>{row.id} </IDLabel>
                            <VendLabel> - {row.venderID}</VendLabel>
                        </BillingsItemRow>
                        {row.state===1&&
                        <BillingsItemRow>
                            <InvoiceState>
                                <Subtitles></Subtitles>
                                Invoice Overdue
                            </InvoiceState>
                            <DateLabel>
                                {row.date}
                            </DateLabel>
                        </BillingsItemRow>
                        }
                    </BillingsItem>
                )}
            </Container>
        );
    }    
};

BillingDashboardItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    billings: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
    return {
        billings: props.billings,
    };
};

export default connect(mapStateToProps)(BillingDashboardItem);