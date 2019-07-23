import React, { Fragment } from 'react';
import NavBar from '../../navigation/NavBar';
import SideBar from '../sidebar/SideBar';
import Footer from '../footer/Footer';
import './AppLayout.css';

const AppLayout = ({ children }) => {
	return (
		<div className="layout">
			<Fragment>
				<NavBar />
			</Fragment>
			<div className="main">
				<SideBar />
				{children}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};
export default AppLayout;
