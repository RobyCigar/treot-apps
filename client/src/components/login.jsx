import axios from "axios";
import { useState, useReducer, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserCtx } from '../App'

// asset
import arrow from '../asset/arrow.svg'
import background from "../asset/background1.jpg";
import styles from "./login.module.css";

// Using reducer instead of useState 
const formReducer = (state, action) => {
	return {
		data: action
	}
}

const Login = ({addCookies, currentCookies}) => {
	const [ formData, setFormData ] = useReducer(formReducer, {})
	const user = useContext(UserCtx)

	console.log('ini user ctx', user)

	useEffect(() => {
		if(formData.data) {
			axios.post('http://localhost:8000/login', {
				email: formData.data.email,
				password: formData.data.password
			  })
			  .then(function (response) {
			  	const { token, user: { email, id, name, role}} = response.data
			    console.log('Success : ', response);
			    // Store cookie with params key value
			    addCookies(name, token.split(" ")[1]) 
			  })
			  .catch(function (error) {
				console.log(error);
			  });
		}
	}, [formData])

	const handleSubmit = (event) => {
		event.preventDefault()
		const email = event.target.email.value
		const password = event.target.password.value

		setFormData({
			email: email,
			password: password
		})
	};

	return (
		<div className={styles.container}>
			<img
				src={background}
				alt="background"
				className={styles.background}
			/>
			<main>
				<div className={styles.card}>
					<Link to="/" className={styles.back}>
						<img src={arrow} alt="arrow"/>
						<p className="poppins">Back</p>
					</Link>
					<h3 className={`${styles.title} poppins`}>Login</h3>
					<form className={`${styles.form} poppins`} onSubmit={handleSubmit} >
						<label htmlFor="email">Email :</label>
						<input name="email" type="email" placeholder="type your email" />
						<label htmlFor="password">Password</label>
						<input
							name="password"
							type="password"
							placeholder="type your password"
						/>
						<button className={styles.btn}>Login</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Login;
