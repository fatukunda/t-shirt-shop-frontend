import React from 'react';

const ProductSize = ({ id, selectSize, name, attributeClass }) => {
	return (
		<button id={id} className={attributeClass} onClick={selectSize}>
			{name}
		</button>
	);
};
export default ProductSize;
