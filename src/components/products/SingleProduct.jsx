import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSingleProduct } from '../../store/actions/productActions';
import { addToCart } from '../../store/actions/shoppingCartActions';
import ProductSizes from '../ProductAttribute/ProductSizes';
import ProductImages from '../ProductImages/ProductImages';
import ProductColors from '../ProductAttribute/ProductColors';
import './SingleProduct.css';

class SingleProduct extends Component {
	state = {
		quantity: 1,
		enabled: false,
		message: '',
	};
	componentDidMount() {
		const { product_id } = this.props.match.params;
		this.props.fetchSingleProduct(product_id);
	}
	plusClickHandler() {
		this.setState({
			quantity: this.state.quantity + 1,
		});
		this.enableButton();
	}
	minusClickHandler() {
		if (this.state.quantity === 1) {
			this.disableButton();
		} else {
			this.setState({
				quantity: this.state.quantity - 1,
			});
		}
	}
	enableButton() {
		this.setState({
			enabled: true,
		});
	}
	disableButton() {
		this.setState({
			enabled: false,
		});
	}
	addToCart() {
		let { product, selectedColor, selectedSize } = this.props;
		const cart_id = localStorage.getItem('cart_id');
		if (selectedColor === '' || selectedSize === '') {
			this.setState({
				message: 'Please select a color and Size',
			});
		} else {
			const cartItem = {
				product_id: product.product_id,
				cart_id,
				attributes: `${selectedSize}, ${selectedColor}`,
				quantity: this.state.quantity,
			};
			this.props.addToCart(cartItem);
		}
	}

	render() {
		const { product, isLoading } = this.props;
		let { message } = this.state;
		return (
			<div className="pdct">
				{product.product_id ? (
					<div className="row">
						<ProductImages product={product} />
						<div className="col-md-8 pdct-details pr-4">
							<div className="mt-2">
								<h3 className="text-warning">{product.name}</h3>
								<hr />
								<p>{product.description}</p>
								<h3>{`$${product.price}`}</h3>
							</div>
							<ProductColors />
							<ProductSizes />

							<div className="pdct-quantity">
								<h5 className="mt-4 mb-4 text-warning">Quantity</h5>
								<button
									onClick={() => this.minusClickHandler()}
									className="btn btn-info"
									disabled={!this.state.enabled}
								>
									-
								</button>
								<button className="btn btn-primary quantity-btn ml-4 mr-4">
									{this.state.quantity}
								</button>
								<button onClick={() => this.plusClickHandler()} className="btn btn-info">
									+
								</button>
							</div>
							<div className="mt-4">
								<button className="btn btn-primary" onClick={() => this.addToCart()}>
									{isLoading ? (
										<span
											className="spinner-border spinner-border-sm"
											role="status"
											aria-hidden="true"
										/>
									) : (
										'ADD TO CART'
									)}
								</button>
								{message !== '' ? <p className="text-danger mt-2">{message}</p> : null}
							</div>
						</div>
					</div>
				) : (
					<div className="spin d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				)}
			</div>
		);
	}
}

SingleProduct.propTypes = {
	fetchSingleProduct: PropTypes.func.isRequired,
	addToCart: PropTypes.func,
	generateCartId: PropTypes.func,
	product: PropTypes.instanceOf(Object),
	cartItem: PropTypes.instanceOf(Object),
	cartItems: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
	product: state.singleProductReducer.product,
	error: state.singleProductReducer.error,
	isLoading: state.shoppingCartReducer.isLoading,
	selectedColor: state.singleProductReducer.selectedColor,
	selectedSize: state.singleProductReducer.selectedSize,
	cartItem: state.shoppingCartReducer.cartItem,
	cartItems: state.shoppingCartReducer.cartItems,
});

const mapDispatchToProps = dispatch => ({
	fetchSingleProduct: product_id => dispatch(fetchSingleProduct(product_id)),
	addToCart: cartItem => dispatch(addToCart(cartItem)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
