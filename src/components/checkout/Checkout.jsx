import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimeLine from '../timeline/TimeLine';
import TextInput from '../../containers/TextInput';
import { updateCustomer, fetchShippingOption, fetchShipping } from '../../store/actions/customerAddressActions';
import './Checkout.css';

class Checkout extends Component {
	state = {
		fullName: '',
		address1: '',
		address2: '',
		region: '',
		city: '',
		zipCode: '',
		country: '',
		shippingType: '',
		shippingRegion: '',
		shippingCost: 0,
	};
	changeHandler(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	submitHandler(event) {
		event.persist();
	}
	async goToConfirmation(event) {
		event.preventDefault();
		event.persist();
		const customerInfo = {
			address_1: this.state.address1,
			address_2: this.state.address2,
			city: this.state.city,
			region: this.state.region,
			postal_code: this.state.zipCode,
			country: this.state.country,
			shipping_region_id: parseInt(this.state.shippingRegion.split('.')[0]),
		};
		const shipping_id = parseInt(this.state.shippingType.split('.')[0]);
		await this.props.updateCustomer(customerInfo);
		await this.props.fetchShippingOption(this.state.shippingType);
		await this.props.fetchShipping(shipping_id);
		this.props.history.push('/confirmation');
	}
	render() {
		let { fullName, address1, address2, region, city, zipCode, shippingType, country, shippingRegion } = this.state;
		let { isLoading } = this.props;
		return (
			<div className="checkout-page">
				<TimeLine selectedOption="delivery" />
				<form className="delivery-form mt-4">
					<div className="row">
						<div className="col-md-6">
							<TextInput
								type="text"
								inputClass="form-control"
								describedby="nameHelp"
								placeholder="Full Name"
								name="fullName"
								changed={event => this.changeHandler(event)}
								value={fullName}
								required
							/>
							<TextInput
								type="text"
								inputClass="form-control"
								describedby="addressHelp"
								placeholder="Address 2"
								name="address2"
								changed={event => this.changeHandler(event)}
								value={address2}
							/>
							<TextInput
								type="text"
								inputClass="form-control"
								describedby="cityHelp"
								placeholder="City"
								name="city"
								changed={event => this.changeHandler(event)}
								value={city}
								required
							/>
							<TextInput
								type="text"
								inputClass="form-control"
								describedby="zipHelp"
								placeholder="Zip Code"
								name="zipCode"
								changed={event => this.changeHandler(event)}
								value={zipCode}
							/>
						</div>
						<div className="col-md-6">
							<TextInput
								type="text"
								inputClass="form-control"
								describedby="addressHelp"
								placeholder="Address 1"
								name="address1"
								changed={event => this.changeHandler(event)}
								value={address1}
								required
							/>
							<TextInput
								type="text"
								inputClass="form-control"
								describedby="regionHelp"
								placeholder="Region"
								name="region"
								changed={event => this.changeHandler(event)}
								value={region}
							/>
							<TextInput
								type="text"
								inputClass="form-control"
								describedby="countryHelp"
								placeholder="Country"
								name="country"
								changed={event => this.changeHandler(event)}
								value={country}
								required
							/>
							<div className="form-group">
								<select
									className="form-control"
									name="shippingRegion"
									value={shippingRegion}
									onChange={event => this.changeHandler(event)}
								>
									<option>1. Please select</option>
									<option>2. US/Canada</option>
									<option>3. Europe</option>
									<option>4. Rest of the world</option>
								</select>
							</div>
						</div>
					</div>
					<hr />
					<div>
						<h6>Shipping type</h6>
						<div className="row">
							<div className="col-md-12">
								<div className="form-group">
									<select
										className="form-control"
										name="shippingType"
										onChange={event => this.changeHandler(event)}
										value={shippingType}
									>
										<option>1. Next Day Delivery ($20)</option>
										<option>2. 3-4 Days ($10)</option>
										<option>3. 7 Days ($5)</option>
										<option>4. By air (7 days, $25)</option>
										<option>5. By sea (28 days, $10)</option>
										<option>6. By air (10 days, $35)</option>
										<option>7. By sea (28 days, $30)</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row next-steps">
							<div className="col-md-6">
								<Link to={`shopping_cart/${localStorage.getItem('cart_id')}`}>
									<button className="btn btn-info">Back</button>
								</Link>
							</div>
							<div className="col-md-6">
								<button
									className="btn btn-primary btn-next"
									onClick={event => this.goToConfirmation(event)}
								>
									{isLoading ? (
										<span
											className="spinner-border spinner-border-sm"
											role="status"
											aria-hidden="true"
										/>
									) : (
										'Next step'
									)}
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

Checkout.propTypes = {
	updateCustomer: PropTypes.func.isRequired,
	fetchShippingOption: PropTypes.func,
	customer: PropTypes.instanceOf(Object),
	error: PropTypes.instanceOf(Object),
	isLoading: PropTypes.bool,
	shipping: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
	customer: state.customerAddressReducer.customer,
	isLoading: state.customerAddressReducer.isLoading,
	error: state.customerAddressReducer.error,
	shipping: state.customerAddressReducer.shipping,
});

const mapDispatchToProps = dispatch => ({
	updateCustomer: customerInfo => dispatch(updateCustomer(customerInfo)),
	fetchShippingOption: shippingType => dispatch(fetchShippingOption(shippingType)),
	fetchShipping: shipping_id => dispatch(fetchShipping(shipping_id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
