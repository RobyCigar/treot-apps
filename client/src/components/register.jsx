import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { Link, Redirect } from "react-router-dom";

// asset
import arrow from "../asset/arrow.svg";
import alert from "../asset/alert.svg";
import background from "../asset/background1.jpg";
import styles from "./register.module.css";

// reducer
const formReducer = (state, action) => {
	return action
}

const Register = () => {
	const [errMsg, setErrMsg] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [formData, dispatch] = useReducer(formReducer, false)

	useEffect(() => {
		if(formData) {
			axios.post(`http://localhost:8000/register`, {
				name: formData.name,
				email: formData.email,
				password: formData.password,
			})
			.then(res => {
				console.log(res)
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
			})
		}

	}, [formData])

	const handleForm = (e) => {
		e.preventDefault()

		const name = e.target.name.value;
		const email = e.target.email.value;
		const password1 = e.target.password1.value;
		const password2 = e.target.password2.value;

		if(password1 !== password2) {
			return setErrMsg("Password does not match !")
		}

		dispatch({
			name: name,
			email: email,
			password: password1
		})
	}
	console.log(isSuccess)
	if(isSuccess) {
		window.alert(isSuccess)
		return <Redirect to="/login" />
	}

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
					<h3 className={`${styles.title} poppins`}>Sign up</h3>
					<form className={`${styles.form} poppins`} onSubmit={handleForm}>
						<label htmlFor="name">Name :</label>
						<input name="name" type="text" placeholder="type your name" />
						
						<label htmlFor="email">Email :</label>
						<input name="email" type="email" placeholder="type your email" />
						
						<label htmlFor="password1">Password :</label>
						<input
							name="password1"
							type="password"
							placeholder="type your password"
						/>
						<label htmlFor="password2">Validate Password :</label>
						<input
							name="password2"
							type="password"
							placeholder="type your password again"
						/>
						<button className={styles.btn}>Register</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Register;
