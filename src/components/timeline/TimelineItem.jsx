import React from 'react';

const TimelineItem = ({ id, image, selectedOption, selectedHr, optionName }) => {
	return (
		<div id={id}>
			<img src={image} alt={`${selectedOption} icon`} />
			<h6 className={`pt-2 ${selectedOption}`}>{optionName}</h6>
			<hr className={selectedHr} />
		</div>
	);
};

export default TimelineItem;
