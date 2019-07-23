import React, { Component } from 'react';
import { CardNumberElement, CardCVCElement, injectStripe, CardExpiryElement } from 'react-stripe-elements';
import TimeLine from '../timeline/TimeLine';
import TextInput from '../../containers/TextInput';
import { connect } from 'react-redux';
import { createOrder, charge } from '../../store/actions/ordersActions';
import './Payment.css';

class Payment extends Component {
	state = {
		errorMessage: '',
		cardName: '',
	};
	changeHandler({ error }) {
		if (error) {
			this.setState({
				errorMessage: error.message,
			});
		}
		// this.setState({
		// 	[event.target.name]: event.target.value,
		// });
	}
	async charge(token) {
		const { order_id } = this.props.order_id;
		const { id } = token.token;
		const chargeInfo = { order_id, stripeToken: id };
		await this.props.charge(chargeInfo);
		if (!this.props.error) {
			localStorage.removeItem('cart_id');
			this.props.history.push('/finish');
		}
	}
	async makeOrder(token) {
		let { shoppingCart } = this.props;
		let { shipping_cost } = this.props.shipping;
		const orderDetails = {
			shipping_id: this.props.shipping.shipping_id,
			total_amount: shoppingCart.grandTotal + parseInt(shipping_cost),
		};
		await this.props.createOrder(orderDetails);
		this.charge(token);
	}
	async submitHandler(event) {
		event.persist();
		event.preventDefault();
		if (this.props.stripe) {
			try {
				const token = await this.props.stripe.createToken();
				this.makeOrder(token);
			} catch (error) {
				this.setState({
					errorMessage: error,
				});
			}
		} else {
			console.log('Stripe has not loaded yet');
		}
	}
	render() {
		let { shoppingCart, error, isLoading } = this.props;
		let { shipping_cost } = this.props.shipping;
		return (
			<div className="payment">
				<TimeLine selectedOption="payment" />
				<form className="payment-form mt-4" onSubmit={event => this.submitHandler(event)}>
					<div className="row">
						<div className="col-md-6">
							<TextInput
								type="text"
								inputClass="form-control StripeElement"
								describedby="nameHelp"
								placeholder="Cardholder's Name"
								name="cardName"
								changed={e => this.changeHandler(e)}
								required
							/>
						</div>
						<div className="col-md-6 split-form">
							<CardNumberElement className="form-control" onChange={() => this.changeHandler} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<label htmlFor="date">Valid thru</label>
							<CardExpiryElement className="form-control" onchange={() => this.changeHandler} />
						</div>
						<div className="col-md-6">
							<label htmlFor="date">CVV/CVC *</label>
							<CardCVCElement className="form-control" onchange={() => this.changeHandler} />
							<small id="cvcHelp" className="form-text text-muted">
								* CVV or CVC is the card security code, unique three digits number on the back of your
								card seperate from its number.
							</small>
						</div>
					</div>
					<div className="row">
						{error ? (
							<div className="col-md-12">
								<p className="text-danger">{error}</p>
							</div>
						) : null}
					</div>
					<div className="row mt-4">
						<div className="col-md-12">
							<button className="btn btn-primary btn-block">
								{isLoading ? (
									<span
										className="spinner-border spinner-border-sm"
										role="status"
										aria-hidden="true"
									/>
								) : (
									`PAY $${shoppingCart.grandTotal + parseInt(shipping_cost)}`
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	order_id: state.ordersReducer.order_id,
	isLoading: state.ordersReducer.isLoading,
	error: state.ordersReducer.error,
	shipping: state.customerAddressReducer.shipping,
	shoppingCart: state.shoppingCartReducer,
	chargeInfo: state.ordersReducer.chargeInfo,
});

const mapDispatchToProps = dispatch => ({
	createOrder: orderDetails => dispatch(createOrder(orderDetails)),
	charge: chargeInfo => dispatch(charge(chargeInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(Payment));
