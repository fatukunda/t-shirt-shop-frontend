import React from 'react';
import { Link } from 'react-router-dom';

const PaginationItem = ({ paginationClass, link, title }) => {
	return (
		<li className={paginationClass}>
			<Link className="page-link" to={link}>
				{title}
			</Link>
		</li>
	);
};

export default PaginationItem;
