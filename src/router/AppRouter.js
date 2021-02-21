import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import LoadingScreen from '../components/LoadingScreen';

export const AppRouter = () => {
	const dispatch = useDispatch();
	const { checking, uid } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(startChecking());
	}, [dispatch]);

	if (checking) {
		return <LoadingScreen type='spin' color='#103C94'></LoadingScreen>;
	}
	return (
		<Router>
			<div>
				<Switch>
					<PublicRoutes
						exact
						path='/login'
						isAuthenticated={Boolean(uid)}
						component={LoginScreen}
					/>
					<PrivateRoutes
						exact
						path='/'
						isAuthenticated={Boolean(uid)}
						component={CalendarScreen}
					/>
					<Redirect to='/' />
				</Switch>
			</div>
		</Router>
	);
};
