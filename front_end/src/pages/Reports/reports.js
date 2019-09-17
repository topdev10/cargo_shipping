import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { pageConstants } from '../../constants';
import { pageActions } from '../../actions';

import Device from '../../css/device';
import NewReport from './NewReport';
import ExistingReport from './ExistingReport';

const Container = styled.div`
    displa: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    margin-top: 64px;
    padding: 8px;
    height: calc(100vh - 64px);
    width: 100%;
    left: 0px;
    @media ${Device.laptop} {
        left: 320px;
        width: calc(100% - 320px);
        padding: 48px;
    }
`;

const ReportsContainerRow = styled.div`
    display: flex;
    flex-direction: row;
    height: calc((100vw - 16px - 36px) / 8);

    @media ${Device.laptop} {
        height: calc((100vw - 320px - 96px - 36px) / 8);
    }
`;

class Reports extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            pageIndex: 0,   // 0: main page, 1: new report page, 2: Edit report page
        };
    }

    componentDidMount(){
        const { reports, loadPage } = this.props;
        if(reports === null){
            loadPage(pageConstants.REPORTS);
        }
    }
    
    onNewReport = () => {
        this.setState({ pageIndex: 1 });
    }

    onExistingReport = () => {

    }

    render(){
        const { reports } = this.props;
        const { pageIndex } = this.state;
        return (
            <Container>
                {
                    reports === null
                        ?<div>Reports null</div>
                        :<div>Have reports</div>
                }
                <ReportsContainerRow>
                    <NewReport onNewReport={this.onNewReport}></NewReport>
                    <ExistingReport onExistingReport={this.onExistingReport} />
                    <ExistingReport onExistingReport={this.onExistingReport} />
                    <ExistingReport onExistingReport={this.onExistingReport} />
                </ReportsContainerRow>
                This is Reports page
                {pageIndex&&<div>New Report Clicked</div>}
            </Container>
        );
    }
}

Reports.defaultProps = {
    reports: null,
};

Reports.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    reports: PropTypes.array,
    loadPage: PropTypes.func.isRequired,
};

const actionCreators = {
    loadPage: pageActions.loadPage,
};

function mapStateToProps(state) {
    return {
        reports: state.page.info!==null?state.page.info.reports: null,
    };
}

export default connect(mapStateToProps, actionCreators)(Reports);