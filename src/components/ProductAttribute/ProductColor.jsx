import React from 'react';

const ProductColor = ({ id, selectColor, colorClass }) => {
	return <button id={id} onClick={selectColor} className={colorClass} />;
};
export default ProductColor;
