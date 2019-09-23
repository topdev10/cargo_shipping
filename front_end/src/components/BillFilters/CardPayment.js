import React, { Component } from 'react';
import PropsType from 'prop-types';
import './card.css';
import {
    CardElement,
    injectStripe,
    StripeProvider,
    Elements
} from 'react-stripe-elements';

const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: 'Open Sans, sans-serif',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#c23d4b'
            }
        }
    };
};

class _CardForm extends Component {

    constructor(props){
        super(props);
        this.state={};
    }

    state = {
        errorMessage: ''
    };

    handleChange = ({ error }) => {
        if (error) {
            this.setState({ errorMessage: error.message });
        }
    };

    handleSubmit = evt => {
        evt.preventDefault();
        // eslint-disable-next-line react/prop-types
        const { handlePayment, stripe } = this.props;

        if (stripe) {
            stripe
                // eslint-disable-next-line react/prop-types
                .createToken()
                .then(payload => handlePayment(payload));
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

    render() {
        const {errorMessage} = this.state;
        return (
            <div className="CardDemo">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Card details
                        <CardElement
                            onChange={this.handleChange}
                            {...createOptions()}
                        />
                    </label>
                    <div className="error" role="alert">
                        {errorMessage}
                    </div>
                    <button>Pay</button>
                </form>
            </div>
        );
    }
}

const CardForm = injectStripe(_CardForm);

// eslint-disable-next-line react/prefer-stateless-function
class CardPayment extends React.Component {
    render() {
        const { handleCharge, stripePublicKey, handleResult } = this.props;
        return (
            <StripeProvider apiKey={stripePublicKey}>
                <Elements>
                    <CardForm 
                        handleResult={ handleResult }
                        handlePayment={ handleCharge }
                    />
                </Elements>
            </StripeProvider>
        );
    }
}

CardPayment.propTypes = {
    handleCharge: PropsType.func.isRequired,
    stripePublicKey: PropsType.string.isRequired,
};

export default CardPayment;