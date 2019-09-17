import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NewReportNormal from '../../images/add-report-normal.png';
import NewReportActive from '../../images/add-report-active.png';

const Container = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px dashed #51d1f5;
    color: #51d1f5;
    cursor: pointer;
    margin: 0px 8px;

    &:hover{
        border: 2px solid #51d1f5;
    }
`;

const ActionContainerBackImage = styled.img`
    display: flex;
    height: 80%;
    opacity: 0.8;

    &:hover{
        opacity: 0.9;
    }
`;

const NewReport = (props) => {
    const { onNewReport } = props;
    const [background, setBackground] = React.useState(NewReportNormal);

    return(
        <Container onClick={onNewReport}
            onMouseEnter={() => setBackground(NewReportActive)}
            onMouseLeave={() => setBackground(NewReportNormal)}>
            <ActionContainerBackImage src={background} />
        </Container>
    );
};

NewReport.propTypes = {
    onNewReport: PropTypes.func.isRequired,
};

function mapStateToProps(state, props){
    return {
        onNewReport: props.onNewReport,
    };
}

export default connect(mapStateToProps)(NewReport);