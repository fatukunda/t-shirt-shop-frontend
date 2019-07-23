import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextInput from '../../containers/TextInput';
import { loginUser } from '../../store/actions/userSignInActions';
import './signIn.css';

class SignIn extends Component {
	state = {
		email: '',
		password: '',
	};
	changeHandler(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	submitHandler(event) {
		event.preventDefault();
		event.persist();
		let { email, password } = this.state;
		const user = {
			email,
			password,
		};
		this.props.loginUser(user);
	}
	render() {
		let { email, password } = this.state;
		let { user, error, isLoading } = this.props;
		if (user.customer) {
			this.props.history.push('/');
		}
		return (
			<div className="signIn">
				<h4 className="text-center mt-4">Sign In</h4>
				<hr />
				<form className="signIn-form" onSubmit={event => this.submitHandler(event)}>
					<div>
						<TextInput
							type="email"
							describedb="emailHelp"
							placeholder="Enter Email"
							inputClass={`form-control ${error != null ? 'is-invalid' : ''}`}
							name="email"
							value={email}
							changed={event => this.changeHandler(event)}
							required
							isError={error !== null ? true : false}
							error={error}
						/>
						<TextInput
							type="password"
							describedb="passwordHelp"
							placeholder="Enter Password"
							inputClass="form-control"
							name="password"
							value={password}
							changed={event => this.changeHandler(event)}
							required
						/>
						<button type="submit" className="btn btn-primary btn-block mt-4 mb-4">
							{isLoading ? (
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
							) : (
								'Login'
							)}
						</button>

						<Fragment>
							<p>
								Have no account?{' '}
								<Link to="/register" className="ml-2">
									Sign up
								</Link>{' '}
							</p>
						</Fragment>
					</div>
				</form>
			</div>
		);
	}
}

SignIn.propTypes = {
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object),
	error: PropTypes.instanceOf(Object),
	isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
	user: state.signInReducer.user,
	isLoading: state.signInReducer.isLoading,
	error: state.signInReducer.error,
});

const mapDispatchToProps = dispatch => ({
	loginUser: user => dispatch(loginUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
