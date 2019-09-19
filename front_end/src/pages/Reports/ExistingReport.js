import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Edit from '@material-ui/icons/Edit';
import Schedule from '@material-ui/icons/Schedule';

import CustomTooltip from '../../components/CustomToolTip/CustomToolTip';

import ReportNormal from '../../images/report-normal.png';
import ReportActive from '../../images/report-active.png';
import Device from '../../css/device';

const maincolor = "#51d1f5";

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px solid ${maincolor};
    color: ${maincolor};
    cursor: pointer;
    width: calc((100vw - 16px - 64px) / 4);
    height: calc((100vw - 16px - 36px) / 8);
    float: left;
    margin: 4px;

    @media ${Device.laptopL} {
        width: calc((100vw - 320px - 96px - 48px) / 4);
        height: calc((100vw - 320px - 96px - 36px) / 8);
    }

    &:hover{
        border: 2px solid red;
    }
`;

const ActionContainer = styled.div`
    position: relative;    
    display: flex;
    flex: 1;
    height: calc(100% - 48px);
    justify-content: center;
    align-items: center;
    padding: 8px;
`;

const ActionContainerBackImage = styled.img`
    display: flex;
    height: 80%;
    opacity: 0.8;

    &:hover{
        opacity: 0.9;
    }
`;

const DetailsContainer = styled.div`
    height: 32px;
    width: 100%;
    padding: 2px 4px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-top: 2px solid;
    background: #ececec;
    font-size: 14px;
    display: flex;
    
    @media ${Device.laptop} {
        height: 48px
    }
`;

const RouteAndDateWrapper = styled.div`
    display: none;
    flex-direction: column;
    flex: 3;
    color: black;
    @media ${Device.laptop} {
        display: flex;
    }
`;

const ExtensionWrapper = styled.div`
    display: flex;
    flex: 2
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ActionButtonContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0px
    right: 4px;
`;

const EditWrapper = styled.span`
    color: ${maincolor};
    &:hover{
        color: red;
    }
`;

const ScheduleWrapper = styled.span`
    color: ${maincolor};
    &:hover{
        color: red;
    }
`;

const ExistingReport = (props) => {
    const { onExistingReport } = props;

    const [background, setBackground] = React.useState(ReportNormal);

    function onEditReport(e) {
        e.preventDefault();
        onExistingReport();
    }

    return(
        <Container onClick={onExistingReport} 
            onMouseEnter={() => setBackground(ReportActive)}
            onMouseLeave={() => setBackground(ReportNormal)}>
            <ActionContainer>
                <ActionContainerBackImage src={background} />
            </ActionContainer>
            <ActionButtonContainer>
                <EditWrapper>
                    <CustomTooltip title="Edit" onClick={e=> onEditReport(e)}>
                        <Edit />
                    </CustomTooltip>
                </EditWrapper>
                <ScheduleWrapper>
                    <CustomTooltip title="Schedule">
                        <Schedule />
                    </CustomTooltip>
                </ScheduleWrapper>
            </ActionButtonContainer>
            
            <DetailsContainer>
                <RouteAndDateWrapper>
                    <div>Report - Routes FCL</div>
                    <div>Created at 09.05.2018</div>
                </RouteAndDateWrapper>
                <ExtensionWrapper>
                    <CustomTooltip title="Download .csv File">
                        <div style={{flex: 1}}>.csv</div>
                    </CustomTooltip>
                    <CustomTooltip title="Download .xlsx File">
                        <div style={{flex: 1}}>.xlsx</div>
                    </CustomTooltip>
                </ExtensionWrapper>
            </DetailsContainer>
        </Container>
    );
};

ExistingReport.propTypes = {
    onExistingReport: PropTypes.func.isRequired,
};

function mapStateToProps(state, props){
    return {
        onExistingReport: props.onExistingReport,
    };
}

export default connect(mapStateToProps)(ExistingReport);