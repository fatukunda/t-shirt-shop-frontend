import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeLine from '../timeline/TimeLine';
import { Link } from 'react-router-dom';
import './OrderConfirmation.css';
import ConfirmationItem from './ConfirmationItem';
import { fetchGrandTotal } from '../../store/actions/shoppingCartActions';

class OrderConfirmation extends Component {
	async componentDidMount() {
		await this.props.fetchGrandTotal();
	}
	render() {
		const { customer, cartItems, shippingOption, grandTotal, shipping_cost } = this.props;
		return (
			<div className="confirmation">
				<TimeLine selectedOption="confirmation" />
				<div className="row confirm-row mt-4">
					<div className="col-md-8">
						<div className="row">
							{cartItems.map(cartItem => {
								return (
									<ConfirmationItem
										item={cartItem.name}
										quantity={cartItem.quantity}
                                        price={cartItem.price}
                                        key={cartItem.item_id}
									/>
								);
							})}
						</div>
					</div>
					<div className="col-md-4 delivery-address">
						<h5 className="mb-4">Delivery address</h5>
						<p>{`${customer.address_1}, ${customer.city} ${customer.country}`}</p>
						<h6>Delivery Options</h6>
						<p>{shippingOption}</p>
					</div>
				</div>
				<hr className="total-hr" />
				<div className="row grand-total">
					<div className="col-md-8">
						<h5 className="text-warning">Grand Total</h5>
					</div>
					<div className="col-md-4">
						<h4 className="text-warning">{`$${grandTotal + parseInt(shipping_cost)}`}</h4>
					</div>
				</div>
				<div className="row more-options mt-4">
					<div className="col-md-6">
						<Link to="/checkout">
							<button className="btn btn-info">Back</button>
						</Link>
					</div>
					<div className="col-md-6">
						<Link to="/payment">
							<button className="btn btn-primary">PAY</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cartItems: state.shoppingCartReducer.cartItems,
	customer: state.customerAddressReducer.customer,
	shippingOption: state.customerAddressReducer.shippingOption,
	grandTotal: state.shoppingCartReducer.grandTotal,
	shipping_cost: state.customerAddressReducer.shipping.shipping_cost,
});

const mapDispatchToProps = dispatch => ({
	fetchGrandTotal: () => dispatch(fetchGrandTotal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
