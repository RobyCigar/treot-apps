import { useContext, useEffect, useState } from "react";
import { UserCtx } from "../context";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import styles from "./dashboard.module.css";

// asset
import background from "../asset/background1.jpg";
import logoutIcon from "../asset/logout.svg";
import profilePic from "../asset/default.png";

const Dashboard = (props) => {
	const { user, cookies, handleCookies, handleUser } = useContext(UserCtx);
	const [isLogout, setIsLogout] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [soal, setSoal] = useState(false);

	useEffect(() => {
		// if user come from login, do this
		if (user.token) {
			axios
				.post(`http://localhost:8000/user`, {
					token: user.token.split(" ")[1],
				})
				.then((res) => {
					console.log("ini response", res);
					handleUser(res.data.success);
				})
				.catch((err) => {
					console.log("ini error", err);
				});
			// if user come from closed tab or end session, do this
		} else if (cookies.token) {
			axios
				.post(`http://localhost:8000/user`, {
					token: cookies.token.split(" ")[1],
				})
				.then((res) => {
					console.log("ini response", res);
					handleUser(res.data.success);
					if (res.data.success.role == "ADMIN") {
						setIsAdmin(true);
					}
				})
				.catch((err) => {
					console.log("ini error", err);
				});
		}
	}, []);

	useEffect(() => {
			// fetch soal
			axios
				.get(`http://localhost:8000/soal`)
				.then((res) => {
					setSoal(res.data.soal);
				})
				.catch((err) => {
					console.log(err);
				});

	}, [])

	if (!cookies.token) {
		return <Redirect to="/login" />;
	} else {
		console.log("ini user", user);
		console.log("ini cookies", cookies);
	}

	if (!user) {
		return <p className={styles.loading}>Loading</p>;
	}

	if (isLogout) {
		return <Redirect to="/" />;
	}

	const handleLogout = () => {
		handleCookies("remove", "token");
		setIsLogout(true);
		handleUser(null);
	};

	console.log("soal state", soal);

	return (
		<div>
			<img
				src={background}
				alt="background"
				className={styles.background}
			/>
			<Link to="/" onClick={handleLogout} className={styles.logout}>
				<img src={logoutIcon} alt="icon" />
				<p>Logout</p>
			</Link>
			<main className={styles.container}>
				<div className={styles.profile}>
					<img src={profilePic} alt="Profile" />
				</div>
				<div className={styles.name}>
					<p className="poppins">Welcome, {user.name}</p>
				</div>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>No</th>
							<th>Try Out</th>
							<th>Tanggal Pengerjaan</th>
							<th>Waktu</th>
							{isAdmin ? (
								<>
									<th>Edit</th>
									<th>Delete</th>
								</>
							) : null}
						</tr>
					</thead>
					<tbody>
						{soal
							? soal.map((val, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{val.nama}</td>
											<td>{val.createdBy}</td>
											<td>{val.created}</td>
											{isAdmin ? (
												<>
													<td>edit</td>
													<td>delete</td>
												</>
											) : null}
										</tr>
									);
							  })
							: 
							<>
								<p>Loading...</p>
							</>
						}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default Dashboard;
