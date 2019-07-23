import React, { Component } from 'react';
import PaginationItem from './PaginationItem';

class PaginationItems extends Component {
	state = {};
	render() {
		return (
			<div>
				<ul class="pagination">
					<PaginationItem paginationClass="page-item disabled" title="&laquo;" />
					<li class="page-item active">
						<a class="page-link" href="#">
							1
						</a>
					</li>
					{/* <li class="page-item">
						<a class="page-link" href="#">
							2
						</a>
					</li>
					<li class="page-item">
						<a class="page-link" href="#">
							3
						</a>
					</li>
					<li class="page-item">
						<a class="page-link" href="#">
							4
						</a>
					</li>
					<li class="page-item">
						<a class="page-link" href="#">
							5
						</a>
					</li> */}
					<li class="page-item">
						<a class="page-link" href="#">
							&raquo;
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default PaginationItems;
