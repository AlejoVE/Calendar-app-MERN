import React from 'react';
import { useForm } from '../../hooks/useForm';
import {useDispatch} from 'react-redux'
import './login.css';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

    const dispatch = useDispatch()

	const [formLoginValues, handleLoginInputChanges] = useForm({
		lEmail: 'angelo@gmail.com',
		lPassword: '123456',
	});

	const [formRegisterValues, handleRegisterChanges] = useForm({
		rName:'',
		rEmail: '',
		rPassword: '',
		cPassword: ''
	});

	const { lEmail, lPassword } = formLoginValues;
	const { rEmail, rPassword, rName, cPassword } = formRegisterValues;

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLogin(lEmail, lPassword));
    };
    
	const handleRegister = (e) => {
		e.preventDefault();
		
		if(rPassword !== cPassword){
			return Swal.fire('Error', 'Password do not match', 'error')
		}

		dispatch(startRegister(rEmail, rPassword, rName))
		
    };
    


	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
								name="lEmail"
								value={lEmail}
								onChange={handleLoginInputChanges}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="lPassword"
								value={lPassword}
								onChange={handleLoginInputChanges}
							/>
						</div>
						<div className="form-group">
							<input type="submit" className="btnSubmit" value="Login" />
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={handleRegister}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name='rName'
								value={rName}
								onChange={handleRegisterChanges}
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name='rEmail'
								value={rEmail}
								onChange={handleRegisterChanges}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name='rPassword'
								value={rPassword}
								onChange={handleRegisterChanges}
							/>
						</div>

						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name='cPassword'
								value={cPassword}
								onChange={handleRegisterChanges}
							/>
						</div>

						<div className="form-group">
							<input
								type="submit"
								className="btnSubmit"
								value="Crear cuenta"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
