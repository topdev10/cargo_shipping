import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import Device from '../../css/device';
import SearchBox from '../../components/BillFilters/SearchBox';
import StatusBox from '../../components/BillFilters/StatusBox';
import DateRangeBox from '../../components/BillFilters/DateRangeBox';
import CurrencyBox from '../../components/BillFilters/CurrencyBox';
import ToolBar from '../../components/BillFilters/ToolBar';
import BillsTable from '../../components/BillFilters/BillsTable';
import CardPayment from '../../components/BillFilters/CardPayment';

import "./style.css";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 12px;
    width: 100%;
    left: 0px;
    background: #cccccc40;
    @media ${Device.laptop} {
        left: 320px;
        width: calc(100% - 320px);
    }
`;

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');
// eslint-disable-next-line react/prefer-stateless-function
class Billing extends React.Component {
    constructor() {
        super();
     
        this.state = {
            modalIsOpen: false
        };
     
        this.closeModal = this.closeModal.bind(this);
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }
     
    afterOpenModal = () => {

    }
     
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        const { modalIsOpen } = this.state;
        return (
            <Container>
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
                <BillsTable makePayment={this.openModal}/>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                ><CardPayment /></Modal>
                
            </Container>
        );
    }
}

export default Billing;