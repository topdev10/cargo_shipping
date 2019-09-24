import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { billActions } from '../../actions';
import { menuConstants } from '../../constants';
import Device from '../../css/device';
import SearchBox from '../../components/BillFilters/SearchBox';
import StatusBox from '../../components/BillFilters/StatusBox';
import DateRangeBox from '../../components/BillFilters/DateRangeBox';
import CurrencyBox from '../../components/BillFilters/CurrencyBox';
import ToolBar from '../../components/BillFilters/ToolBar';
import BillsTable from '../../components/BillFilters/BillsTable';
import CardPayment from '../../components/BillFilters/CardPayment';

import './style.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    float: left;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 12px;
    width: 100%;
    background: #cccccc40;
    transition: width 1s;
    @media ${Device.laptop} {
        width: ${props => {
        let width = "100%";
        if(props.menuState === menuConstants.MENU_OPEN)
            width = "calc(100% - 320px)";
        return width;
    }}
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');
// eslint-disable-next-line react/prefer-stateless-function
class Billing extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedRow: [],
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitPayment = this.submitPayment.bind(this);
    }

    submitPayment = (payload) => {
        const { PaymentRequest } = this.props;
        const { selectedRow } = this.state;
        PaymentRequest({
            token_id: payload.token.id,
            amount: selectedRow.balance,
            ship_id: selectedRow.shipID
        });
    }

    openModal(record) {
        const { ModalOpen } = this.props;
        ModalOpen();
        this.setState({ selectedRow:record });
    }

    closeModal() {
        const { ModalClose } = this.props;
        ModalClose();
    }

    // eslint-disable-next-line class-methods-use-this
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
        // return 0;
    }

    render() {
        const { modalStatus, menuState } = this.props;
        return (
            <Container menuState={menuState}>
                <ToolBar />
                <div className="w-100 card board">
                    <div className="row">
                        <div className="col-md-3">
                            <SearchBox />
                        </div>
                        <div className="col-md-3">
                            <StatusBox />
                        </div>
                        <div className="col-md-3">
                            <DateRangeBox />
                        </div>
                        <div className="col-md-3">
                            <CurrencyBox />
                        </div>
                    </div>
                </div>
                <BillsTable makePayment={this.openModal} />
                <Modal
                    isOpen={modalStatus}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <CardPayment
                        stripePublicKey="pk_test_mfCPqZtW4If6nVmSF2Ahv2xp0013VlcByR"
                        handleCharge={this.submitPayment}
                    />
                </Modal>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        modalStatus: state.bill.modal_status,
        menuState: state.menu.menuState,
    };
}

const actionCreators = {
    PaymentRequest: billActions.onPaymentRequest,
    ModalOpen: billActions.onClickModal,
    ModalClose: billActions.onMissModal,
};

Billing.propTypes = {
    modalStatus: PropTypes.bool.isRequired,
    ModalOpen: PropTypes.func.isRequired,
    ModalClose: PropTypes.func.isRequired,
    PaymentRequest: PropTypes.func.isRequired,
    menuState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Billing);
