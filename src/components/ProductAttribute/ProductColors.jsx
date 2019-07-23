import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductColor from './ProductColor';
import { setSelectedColor } from '../../store/actions/productActions';
import './ProductColors.css';

class ProductColors extends Component {
	selectColor(event) {
		event.persist();
		let clicked = event.target.id;
		if (event.target.id === clicked) {
			this.props.setSelectedColor(clicked);
		} else {
			this.props.setSelectedColor('');
		}
	}
	render() {
		let { selectedColor } = this.props;
		return (
			<div className="color-section mb-2">
				<h5 className="mb-4 text-warning">Color</h5>
				<ProductColor
					id="white"
					selectColor={event => this.selectColor(event)}
					colorClass={`mr-2 ${selectedColor === 'white' ? 'chosen' : 'color-white'}`}
				/>
				<ProductColor
					id="Black"
					selectColor={event => this.selectColor(event)}
					colorClass={`mr-2 ${selectedColor === 'Black' ? 'chosen' : 'color-black'}`}
				/>
				<ProductColor
					id="Red"
					selectColor={event => this.selectColor(event)}
					colorClass={`mr-2 ${selectedColor === 'Red' ? 'chosen' : 'color-red'}`}
				/>
				<ProductColor
					id="Orange"
					selectColor={event => this.selectColor(event)}
					colorClass={`mr-2 ${selectedColor === 'Orange' ? 'chosen' : 'color-orange'}`}
				/>
				<ProductColor
					id="Yellow"
					selectColor={event => this.selectColor(event)}
					colorClass={`mr-2 ${selectedColor === 'Yellow' ? 'chosen' : 'color-yellow'}`}
				/>
				<ProductColor
					id="Green"
					selectColor={event => this.selectColor(event)}
					colorClass={`mr-2 ${selectedColor === 'Green' ? 'chosen' : 'color-green'}`}
				/>
				<ProductColor
					id="Blue"
					selectColor={event => this.selectColor(event)}
					colorClass={`mr-2 ${selectedColor === 'Blue' ? 'chosen' : 'color-blue'}`}
				/>
				<ProductColor
					id="Indigo"
					selectColor={event => this.selectColor(event)}
					colorClass={`mr-2 ${selectedColor === 'Indigo' ? 'chosen' : 'color-indigo'}`}
				/>
				<ProductColor
					id="Purple"
					selectColor={event => this.selectColor(event)}
					colorClass={`mr-2 ${selectedColor === 'Purple' ? 'chosen' : 'color-purple'}`}
				/>
			</div>
		);
	}
}

ProductColors.propTypes = {
	setSelectedColor: PropTypes.func,
	selectedColor: PropTypes.string,
};

const mapStateToProps = state => ({
	selectedColor: state.singleProductReducer.selectedColor,
});

const mapDispatchToProps = dispatch => ({
	setSelectedColor: color => dispatch(setSelectedColor(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductColors);
