import React, { Component } from 'react';

class ProductImage extends Component {
	state = {
		displayedImage: null,
		selectedImage: '',
	};
	componentDidMount() {
		this.setState({
			displayedImage: this.props.product.image,
		});
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			displayedImage: nextProps.product.image,
		});
	}
	selectImage(image, event) {
		event.persist();
		let clicked = event.target.id;
		if (event.target.id === clicked) {
			this.setState({
				selectedImage: clicked,
				displayedImage: image,
			});
		} else {
			this.setState({
				selectedImage: '',
			});
		}
	}
	render() {
		let { displayedImage, selectedImage } = this.state;
		const { product } = this.props;
		let placehoder = require('../../assets/images/product-images/placeholder.jpg');
		return (
			<div className="col-md-4">
				<div className="mt-4 displayed-img">
					<img
						src={
							displayedImage !== null
								? require(`../../assets/images/product-images/${displayedImage}`)
								: placehoder
						}
						alt="single-product"
					/>
				</div>
				<div className="row thumbnails mt-4 ml-2">
					<div className={`col-md-4 ml-4 product-one ${selectedImage === 'image1' ? 'selected' : null}`}>
						<img
							id="image1"
							src={require(`../../assets/images/product-images/${product.image}`)}
							alt="single-product"
							onClick={event => this.selectImage(product.image, event)}
						/>
					</div>
					<div className={`col-md-4 ${selectedImage === 'image2' ? 'selected' : null}`}>
						<img
							id="image2"
							src={require(`../../assets/images/product-images/${product.image_2}`)}
							alt="single-product"
							onClick={event => this.selectImage(product.image_2, event)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductImage;
