import React, { Fragment } from 'react';
import './CartItem.css';

const CartItem = ({ image, name, price, quantity, attributes, removeCartItem, increaseQuantity, reduceQuantity }) => {
	return (
		<Fragment>
			<div className="col-md-3 mt-4">
				<div className="row">
					<div className="col-md-6 cart-img">
						<img
							src={require(`../../assets/images/product-images/${image}`)}
							className="pl-2"
							alt="product-img"
						/>
					</div>
					<div className="col-md-6">
						<h6>{name}</h6>
						<span className="text-danger remove-item" onClick={removeCartItem}>
							X Remove
						</span>
					</div>
				</div>
			</div>
			<div className="col-md-3 mt-4">
				<p>{attributes}</p>
			</div>
			<div className="col-md-3 mt-4">
				<button className="btn btn-primary mr-4" onClick={reduceQuantity}>
					-
				</button>
				<button className="btn btn-info">{quantity}</button>
				<button className="btn btn-primary ml-4" onClick={increaseQuantity}>
					+
				</button>
			</div>
			<div className="col-md-3 mt-4">
				<h6>
					<strong>{price}</strong>
				</h6>
			</div>
		</Fragment>
	);
};
export default CartItem;
