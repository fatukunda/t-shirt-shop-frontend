import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CategoryItem = ({ item, category_id }) => {
	return (
		<Fragment>
			<li>
				<Link to={`/products/incategory/${category_id}`}>{item}</Link>
				<hr />
			</li>
		</Fragment>
	);
};

CategoryItem.propTypes = {
	item: PropTypes.string,
};
export default CategoryItem;
