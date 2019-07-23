import React, { Component } from 'react';
import deliveryIcon from '../../assets/icons/truck.svg';
import paymentIcon from '../../assets/icons/credit-card.svg';
import confirmationIcon from '../../assets/icons/checkmark.svg';
import finishIcon from '../../assets/icons/exit.svg';
import deliverySelectedIcon from '../../assets/icons/truck-selected.svg';
import finishSelectedIcon from '../../assets/icons/exit-selected.svg';
import confirmationSelectedIcon from '../../assets/icons/checkmark-selected.svg';
import paymentSelectedIcon from '../../assets/icons/credit-card-selected.svg';
import TimelineItem from './TimelineItem';
import './Timeline.css';

class TimeLine extends Component {
	render() {
		let { selectedOption } = this.props;
		return (
			<div className="checkout-pdct">
				<h5 className="mt-4 text-center mb-4">Checkout</h5>
				<div className="timeline text-center">
					<TimelineItem
						id="delivery"
						selectedOption={selectedOption === 'delivery' ? 'selected-item' : 'not-selected-item'}
						selectedHr={selectedOption === 'delivery' ? 'selectedhr' : 'not-selectedhr'}
						optionName="Delivery"
						image={selectedOption === 'delivery' ? deliverySelectedIcon : deliveryIcon}
					/>
					<TimelineItem
						id="confirmation"
						selectedOption={selectedOption === 'confirmation' ? 'selected-item' : 'not-selected-item'}
						selectedHr={selectedOption === 'confirmation' ? 'selectedhr' : 'not-selectedhr'}
						optionName="Confirmation"
						image={selectedOption === 'confirmation' ? confirmationSelectedIcon : confirmationIcon}
					/>
					<TimelineItem
						id="payment"
						selectedOption={selectedOption === 'payment' ? 'selected-item' : 'not-selected-item'}
						selectedHr={selectedOption === 'payment' ? 'selectedhr' : 'not-selectedhr'}
						optionName="Payment"
						image={selectedOption === 'payment' ? paymentSelectedIcon : paymentIcon}
					/>
					<TimelineItem
						id="finish"
						selectedOption={selectedOption === 'finish' ? 'selected-item' : 'not-selected-item'}
						selectedHr={selectedOption === 'finish' ? 'selectedhr' : 'not-selectedhr'}
						optionName="Finish"
						image={selectedOption === 'finish' ? finishSelectedIcon : finishIcon}
					/>
				</div>
			</div>
		);
	}
}

export default TimeLine;
