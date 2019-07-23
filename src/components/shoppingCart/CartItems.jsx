import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import cartImage from '../../assets/icons/cart.svg';
import { fetchCartItems, emptyCart, removeCartItem } from '../../store/actions/shoppingCartActions';
import './CartItems.css';

class CartItems extends Component {
	componentDidMount() {
		let { cart_id } = this.props.match.params;
		this.props.fetchCartItems(cart_id);
	}
	emptyCart() {
		let { cart_id } = this.props.match.params;
		this.props.emptyCart(cart_id);
	}
	async removeCartItem(item_id) {
		let { cart_id } = this.props.match.params;
		await this.props.removeCartItem(item_id);
		this.props.fetchCartItems(cart_id);
	}
	render() {
		let { cartItems, isLoading } = this.props;
		return (
			<div className="cart-items">
				{isLoading ? (
					<div className="spin d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				) : (
					<Fragment>
						<h5 className="ml-4 mt-4">{`${cartItems.length} Items in the Cart`}</h5>
						{cartItems.length > 0 ? (
							<Fragment>
								{cartItems.map(item => {
									let { name, price, quantity, attributes, image, item_id } = item;
									return (
										<Fragment key={item_id}>
											<div className="row">
												<CartItem
													image={image}
													name={name}
													price={price}
													quantity={quantity}
													attributes={attributes}
													removeCartItem={() => this.removeCartItem(item_id)}
												/>
											</div>
											<hr />
										</Fragment>
									);
								})}
								<div className="row">
									<div className="col-md-6 empty-cart-div">
										<button className="btn btn-danger" onClick={() => this.emptyCart()}>
											{isLoading ? (
												<span
													className="spinner-border spinner-border-sm"
													role="status"
													aria-hidden="true"
												/>
											) : (
												'Empty Cart'
											)}
										</button>
									</div>
									<div className="col-md-6 checkout">
										<Link to="/checkout">
											<button className="btn btn-success">Checkout</button>
										</Link>
									</div>
								</div>
							</Fragment>
						) : (
							<div className="text-center">
								<img src={cartImage} alt="empty cart" className="empty-cart mt-4" />
								<h2 className="mt-4 text-warning"> No Items in the cart. Please add some.</h2>
							</div>
						)}
					</Fragment>
				)}
			</div>
		);
	}
}

CartItems.propTypes = {
	cartItems: PropTypes.instanceOf(Object),
	emptyCart: PropTypes.func,
	removeCartItem: PropTypes.func,
	isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
	cartItems: state.shoppingCartReducer.cartItems,
	isLoading: state.shoppingCartReducer.isLoading,
});

const mapDispatchToProps = dispatch => ({
	fetchCartItems: cart_id => dispatch(fetchCartItems(cart_id)),
	emptyCart: cart_id => dispatch(emptyCart(cart_id)),
	removeCartItem: item_id => dispatch(removeCartItem(item_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
