import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Product from './Product';
import { connect } from 'react-redux';
import { fetchProducts, fetchProductsByCategory } from '../../store/actions/productActions';
import './Products.css';

export class Products extends Component {
	state = {
		category_id: null,
	};
	componentDidMount() {
		const { category_id } = this.props.match.params;
		category_id !== undefined ? this.props.fetchProductsByCategory(category_id) : this.props.fetchProducts();
	}
	render() {
		const { products } = this.props;
		return (
			<div className="products">
				{products.count ? (
					products.rows.map(product => {
						return (
							<Product
								name={product.name}
								description={product.description.substring(0, 100) + ` ...`}
								price={parseInt(product.price)}
								image={product.thumbnail}
								product_id={product.product_id}
								key={product.product_id}
							/>
						);
					})
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
Products.propTypes = {
	fetchProducts: PropTypes.func.isRequired,
	fetchProductsByCategory: PropTypes.func,
	products: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
	products: state.productReducer.products,
	error: state.productReducer.error,
	isLoading: state.productReducer.isLoading,
});

const mapDispatchToProps = dispatch => ({
	fetchProducts: () => dispatch(fetchProducts()),
	fetchProductsByCategory: category_id => dispatch(fetchProductsByCategory(category_id)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));
