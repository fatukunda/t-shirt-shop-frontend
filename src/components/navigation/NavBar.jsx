import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';
import shoppingIcon from '../../assets/icons/cart.svg';
import { generateCartId } from '../../store/actions/shoppingCartActions';

class NavBar extends Component {
	componentDidMount() {
		if (this.props.cart_id === '' || localStorage.getItem('cart_id') === null) {
			this.props.generateCartId();
		}
	}
	logout() {
		localStorage.removeItem('cart_id');
		localStorage.removeItem('auth_token');
		window.location.href = '/';
	}
	render() {
		let { isAuthenticated, cartItemNo, cart_id } = this.props;
		if (localStorage.getItem('cart_id') === '' || localStorage.getItem('cart_id') === null) {
			localStorage.setItem('cart_id', cart_id);
		}
		const userIcon = require('../../assets/icons/user.svg');
		return (
			<Fragment>
				<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark nav-main">
					<Link className="navbar-brand" to="/">
						TEE SHOP
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarColor02"
						aria-controls="navbarColor02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarColor02">
						<ul className="navbar-nav mr-auto">
							<form className="form-inline my-4 my-lg-0">
								<input className="form-control mr-sm-2" type="text" placeholder="Search products" />
								<button className="btn btn-primary my-2 my-sm-0" type="submit">
									SEARCH
								</button>
							</form>
						</ul>
						<span className="badge badge-warning">{cartItemNo}</span>
						<Link to={`/shopping_cart/${localStorage.getItem('cart_id')}`}>
							<img src={shoppingIcon} className="mr-4 cart-icon" alt="shopping cart" />
						</Link>
						<ul className="navbar-nav">
							{!isAuthenticated && localStorage.getItem('auth_token') === null ? (
								<li className="nav-item">
									<Link to="/login" className="nav-link">
										Login
									</Link>
								</li>
							) : (
								<Fragment>
									<img src={userIcon} alt="user-icon" />
									<li className="nav-item logout" onClick={() => this.logout()}>
										Logout
									</li>
								</Fragment>
							)}
						</ul>
						{!isAuthenticated && localStorage.getItem('auth_token') === null ? (
							<form className="form-inline my-2 my-lg-2 ml-4">
								<Link to="/register">
									<button className="btn btn-primary my-2 my-sm-0" type="submit">
										Sign Up
									</button>
								</Link>
							</form>
						) : null}
					</div>
				</nav>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.navBarReducer.isAuthenticated,
	cartItemNo: state.shoppingCartReducer.cartItemNo,
	cart_id: state.shoppingCartReducer.cart_id,
});

const mapDispatchToProps = dispatch => ({
	generateCartId: () => dispatch(generateCartId()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
