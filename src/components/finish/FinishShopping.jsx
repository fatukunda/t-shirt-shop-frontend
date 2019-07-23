import React from 'react';
import { Link } from 'react-router-dom';
import TimeLine from '../timeline/TimeLine';
import successImage from '../../assets/icons/checkmark-selected.svg';
import './FinishShopping.css';

const FinishShopping = () => {
	return (
		<div className="finish">
			<TimeLine selectedOption="finish" />
			<div className="main-container mt-4">
				<img src={successImage} alt="success-purchase" />
				<h2>SUCCESS!</h2>
				<p>Your items will be shipped shortly, You will get email with details.</p>
				<p>Thank you for shopping with us.</p>
				<Link to="/">
					<button className="btn btn-primary mb-4">Back to shop</button>
				</Link>
			</div>
		</div>
	);
};

export default FinishShopping;
