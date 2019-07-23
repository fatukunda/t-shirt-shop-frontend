import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextInput from '../../containers/TextInput';
import { createUser } from '../../store/actions/userSignupActions';
import './signUp.css';

class SignUp extends Component {
	state = {
		name: '',
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
		let { name, email, password } = this.state;
		const user = {
			name,
			email,
			password,
		};
		this.props.createUser(user);
	}
	render() {
		let { name, email, password } = this.state;
		let { user, error, isLoading } = this.props;
		if (user.customer) {
            this.props.history.push('/')
        }
		return (
			<div className="signup">
				<h4 className="text-center mt-4">Sign Up</h4>
				<hr />
				<form className="signup-form" onSubmit={event => this.submitHandler(event)}>
					<div>
						<TextInput
							type="text"
							describedb="fullNamelHelp"
							placeholder="Enter Full Name"
							inputClass="form-control mb-4"
							name="name"
							value={name}
							changed={event => this.changeHandler(event)}
							required
						/>
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
						<small id="emailHelp" className="form-text text-muted mb-2">
							We'll never share your email with anyone else.
						</small>
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
								'Submit'
							)}
						</button>
						<Fragment>
							<p>
								Aleady a member?{' '}
								<Link to="/login" className="ml-2">
									Sign In
								</Link>{' '}
							</p>
						</Fragment>
					</div>
				</form>
			</div>
		);
	}
}

SignUp.propTypes = {
	createUser: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object),
	error: PropTypes.instanceOf(Object),
	isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
	user: state.userSignupReducer.user,
	isLoading: state.userSignupReducer.isLoading,
	error: state.userSignupReducer.error,
});

const mapDispatchToProps = dispatch => ({
	createUser: user => dispatch(createUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
