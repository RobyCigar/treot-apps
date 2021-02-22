import axios from "axios";
import { useState, useReducer, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserCtx } from '../context'

// asset
import arrow from "../asset/arrow.svg";
import alert from "../asset/alert.svg";
import background from "../asset/background1.jpg";
import styles from "./login.module.css";

// Using reducer for complex
const formReducer = (state, action) => {
	return {
		data: action,
	};
};

const Login = () => {
	const { handleUser, handleCookies } = useContext(UserCtx)
	const [formData, setFormData] = useReducer(formReducer, {});
	const [errMsg, setErrMsg] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false)

	useEffect(() => {
		if (formData.data) {
			axios
				.post("http://localhost:8000/login", {
					email: formData.data.email,
					password: formData.data.password,
				})
				.then(response => {
					console.log('login success', response.data)
					handleUser(response.data)
					handleCookies( "add", 'token', response.data.token)
					setIsSuccess(true)
				})
				.catch(error => {
					if (error.response) {
						// Request made and server responded
						console.log(error.response.data);
						setErrMsg(error.response.data.error);
					} else if (error.request) {
						// The request was made but no response was received
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log("Error", error.message);
					}
				});
		}
	}, [formData]);

	if(isSuccess) {
		return (
			<Redirect to="/dashboard"/>
		)
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;

		setFormData({
			email: email,
			password: password,
		});
	};

	return (
		<div className={styles.container}>
			<img src={background} alt="background" className={styles.background} />
			<main>
				{errMsg ? (
					<div className={styles.error}>
						<img src={alert} alt="!" />
						<p>{errMsg}</p>
					</div>
				) : null}
				<div className={styles.card}>
					<Link to="/" className={styles.back}>
						<img src={arrow} alt="arrow" />
						<p className="poppins">Back</p>
					</Link>
					<h3 className={`${styles.title} poppins`}>Login</h3>
					<form action="/dashboard" className={`${styles.form} poppins`} onSubmit={handleSubmit}>
						<label htmlFor="email">Email :</label>
						<input name="email" type="email" placeholder="type your email" />
						<label htmlFor="password">Password :</label>
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
