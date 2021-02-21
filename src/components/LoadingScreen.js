import React from 'react';
import ReactLoading from 'react-loading';
import './loading.css';

const LoadingScreen = ({ type, color }) => (
	<div className='container-loading'>
		<h1>Loading...</h1>
		<ReactLoading type={type} color={color} height={'60%'} width={'30%'} />
	</div>
);

export default LoadingScreen;
