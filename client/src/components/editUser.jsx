import axios from 'axios'
import { useParams } from "react-router-dom";
import { useState, useReducer, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserCtx } from "../context";

// asset
import arrow from "../asset/arrow.svg";
import alert from "../asset/alert.svg";
import background from "../asset/background1.jpg";
import styles from "./editUser.module.css";


const formReducer = (state, action) => {
	return action
}

const EditUser = (props) => {
	const { user } = useContext(UserCtx);
	const [ name, setName ] = useState(user.name)
	const [ success, setSuccess ] = useState(false)
	const [ errMsg, setErrMsg ] = useState(false)
	const [formData, dispatch] = useReducer(formReducer, false)

	useEffect(() => {
		if(formData) {

			let Data = new FormData();
			Data.append(`photo`, formData.avatar);
			Data.append(`name`, formData.name);

			console.log('ini data', Data)

			axios({
			  method: "PUT",
			  url: `http://localhost:8000/user/${user._id}`,
			  data: Data,
			  headers: {
			    "Content-Type": "multipart/form-data"
			  }
			})
			.then(res => {
				setSuccess('User has successfully edited')

			})
			.catch(error => {
				console.log(error)
					if (error.response) {
						// Request made and server responded
						console.log('error disini')
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


	const handleSubmit = (e) => {
		e.preventDefault()
		
		let name = e.target.name.value
		let image = e.target.avatar.files[0]

		if(!image || !name) {
			return setErrMsg('error, u must fill all the form ')
		}
		
		dispatch({
			name: name,
			avatar: image
		})
	}

	console.log('ini success' , success)
	if(!user || success) {
		if(success) {
			window.alert(success)
		}
		return <Redirect to="/dashboard"/>
	}

	return (
		<div>
			<img src={background} alt="Background" className={styles.background} />
			{errMsg ? (
				<div className={styles.error}>
					<img src={alert} alt="!" />
					<p>{errMsg}</p>
				</div>
			) : null}
			<div className={styles.card}>
				<Link to="/dashboard" className={styles.backBtn}>
					<img src={arrow} alt="arrow" />
					<p className="poppins">Back</p>
				</Link>
				<h3 className={`${styles.title} poppins`}>Edit</h3>
				<form method="POST" action="/dashboard" encType="multipart/form-data" onSubmit={handleSubmit} className={`${styles.form} poppins`}>
					<label htmlFor="name">Name :</label>
					<input value={name} onChange={e => setName(e.target.value)} name="name" type="text" placeholder="type new username" />
					<label htmlFor="avatar">Avatar :</label>
					<input type="file" name="avatar"
					/>
					<button className={styles.submitBtn}>Edit</button>
				</form>
			</div>
		</div>
	);
};

export default EditUser;
