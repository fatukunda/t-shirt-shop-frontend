import React, { Fragment } from 'react';

const ConfirmationItem = ({ item, quantity, price }) => {
	return (
		<Fragment>
			<div className="col-md-6">
				<p> {item}</p>
			</div>
			<div className="col-md-3">
				<h6 className="text-center">{quantity}</h6>
			</div>
			<div className="col-md-3">
				<h6 className="text-center">{`$${price}`}</h6>
			</div>
            <hr/>
		</Fragment>
	);
};
export default ConfirmationItem;
