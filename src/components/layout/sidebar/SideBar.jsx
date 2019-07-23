import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryItem from '../../productCategory/CategoryItem';
import { fetchCategories } from '../../../store/actions/categoryActions';
import './SideBar.css';

class SideBar extends Component {
	componentDidMount() {
		this.props.fetchCategories();
	}
	render() {
		const { categories } = this.props;
		return (
			<div className="side-bar">
				<h6 className="ml-4 pt-4">Categories</h6>
				<hr />
				<ul>
					{categories.length > 0 ? (
						categories.map(category => {
							return (
								<CategoryItem
									item={category.name}
									category_id={category.category_id}
									key={category.category_id}
								/>
							);
						})
					) : (
						<div>Loading .....</div>
					)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categoryReducer.categories,
	isLoading: state.categoryReducer.isLoading,
	error: state.categoryReducer.error,
});

const mapDispatchToProps = dispatch => ({
	fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
