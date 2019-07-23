import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductSize from './ProductSize';
import { setSelectedSize } from '../../store/actions/productActions';

class ProductSizes extends Component {
	selectSize(event) {
		event.persist();
		let clicked = event.target.id;
		if (event.target.id === clicked) {
			this.props.setSelectedSize(clicked);
		} else {
			this.props.setSelectedSize('');
		}
	}
	render() {
		let { selectedSize } = this.props;
		return (
			<div className="shirt-size">
				<h5 className="mb-4 text-warning">Size</h5>
				<ProductSize
					id="SM"
					selectSize={event => this.selectSize(event)}
					name="S"
					attributeClass={`btn mr-4 ${selectedSize === 'SM' ? 'btn-warning' : 'btn-primary'}`}
				/>
				<ProductSize
					id="MD"
					selectSize={event => this.selectSize(event)}
					name="M"
					attributeClass={`btn mr-4 ${selectedSize === 'MD' ? 'btn-warning' : 'btn-primary'}`}
				/>
				<ProductSize
					id="LG"
					selectSize={event => this.selectSize(event)}
					name="L"
					attributeClass={`btn mr-4 ${selectedSize === 'LG' ? 'btn-warning' : 'btn-primary'}`}
				/>
				<ProductSize
					id="XL"
					selectSize={event => this.selectSize(event)}
					name="XL"
					attributeClass={`btn mr-4 ${selectedSize === 'XL' ? 'btn-warning' : 'btn-primary'}`}
				/>
			</div>
		);
	}
}

ProductSizes.propTypes = {
	setSelectedSize: PropTypes.func,
	selectedSize: PropTypes.string,
};

const mapStateToProps = state => ({
	selectedSize: state.singleProductReducer.selectedSize,
});

const mapDispatchToProps = dispatch => ({
	setSelectedSize: size => dispatch(setSelectedSize(size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductSizes);
