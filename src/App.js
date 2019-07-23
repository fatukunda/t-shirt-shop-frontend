import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StripeProvider, Elements } from 'react-stripe-elements';
import './App.css';
import AppLayout from './components/layout/main/AppLayout';
import Products from './components/products/Products';
import SingleProduct from './components/products/SingleProduct';
import SignUp from './components/signUp/signUp';
import SignIn from './components/signIn/signIn';
import CartItems from './components/shoppingCart/CartItems';
import Checkout from './components/checkout/Checkout';
import OrderConfirmation from './components/confirmation/OrderConfirmation';
import Payment from './components/payment/Payment';
import FinishShopping from './components/finish/FinishShopping'
import PrivateRoute from './utils/PrivateRoute';

function App() {
	return (
		<StripeProvider apiKey="pk_test_Yvwxg2od3CTRYOm9uXxvxIaZ00gSkkpjLV">
			<Router>
				<div>
					<AppLayout>
						<Route exact path="/" component={Products} />
						<Route path="/products/incategory/:category_id" component={Products} />
						<Route exact path="/products/:product_id" component={SingleProduct} />
						<Route exact path="/register" component={SignUp} />
						<Route exact path="/login" component={SignIn} />
						<Route exact path="/shopping_cart/:cart_id" component={CartItems} />
						<PrivateRoute exact path="/checkout" component={Checkout} />
						<PrivateRoute exact path="/confirmation" component={OrderConfirmation} />
						<Elements>
							<PrivateRoute exact path="/payment" component={Payment} />
						</Elements>
						<PrivateRoute exact path="/finish" component={FinishShopping}/>
					</AppLayout>
				</div>
			</Router>
		</StripeProvider>
	);
}

export default App;
