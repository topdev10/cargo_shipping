import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Steps, { Step } from 'rc-steps';
import styled from 'styled-components';

import 'rc-steps/assets/index.css';

const Container = styled.div`
    display: flex;
    width: 100% !important;
`;

class ShipmentDetailProgress extends Component {

    componentWillMount() {

    }

    render() {
        const { progressDetail, stop } = this.props;
        return(
            <Container>
                <Steps current={stop} >
                    {
                        progressDetail.map((step)=> (
                            <Step title={step.location} key={step.location} description={step.date} />
                        ))
                    }
                </Steps>
            </Container>
        );
    }

}

ShipmentDetailProgress.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    progressDetail: PropTypes.array.isRequired,
    stop: PropTypes.number.isRequired
};

export default ShipmentDetailProgress;