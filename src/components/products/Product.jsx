import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './product.css';

const Product = ({ name, description, price, image, product_id }) => {
	return (
		<Link to={`/products/${product_id}`}>
			<div className="product card">
				<img src={require(`../../assets/images/product-images/${image}`)} className="pt-4" alt="thumbnail" />
				<h6 className="text-center pt-2">{name}</h6>
				<p className="pr-2 pl-2">{description}</p>
				<h5 className="text-center price">{`$${price}`}</h5>
			</div>
		</Link>
	);
};

Product.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
};
export default Product;
