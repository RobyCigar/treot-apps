import { useContext, useEffect, useState } from "react";
import { UserCtx } from "../context";
import { Redirect, Link, useParams, useRouteMatch, Route, Switch } from "react-router-dom";
import axios from "axios";
import styles from "./dashboard.module.css";

// Component

// asset
import background from "../asset/background1.jpg";
import logoutIcon from "../asset/logout.svg";
import profilePic from "../asset/default.png";
import editIcon from '../asset/pencil.svg';

const Dashboard = (props) => {
	const { user, cookies, handleCookies, handleUser } = useContext(UserCtx);
	const [isLogout, setIsLogout] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [soal, setSoal] = useState(false);
	const { path, url } = useRouteMatch()
	const { userId } = useParams()

	useEffect(() => {
		// if user come from login, do this
		if (cookies.token) {
			axios
				.post(`http://localhost:8000/user`, {
					token: cookies.token.split(" ")[1],
				})
				.then((res) => {
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
		handleUser(false);
	};

	console.log('ini soal', soal)

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


			<Link to={`${path}/${user._id}`} className={styles.editUser}>
				<div>
					<img src={editIcon} alt=""/>
					<p>Edit</p>
				</div>
			</Link>


			<main className={styles.container}>
				<div className={styles.profile}>
					{ user.avatar ?
					<img src={`http://localhost:8000/${user.avatar}`} alt=""/> 
					: 
					<img src={profilePic} alt="Profile" />
					}
				</div>
				<div className={styles.name}>
					<p className="poppins">Welcome, {user.name}</p>
				</div>
				<table className={styles.table}>
					<thead>
						<tr className={`${styles.tr} ${styles.white}`}>
							<th>No</th>
							<th>Try Out</th>
							<th>Created By</th>
							<th>Created At</th>
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
							? soal.map((val, i) => {
									return (
										<tr key={`${i} `} className={i%2==0?`${styles.transparent}`:`${styles.white}`}>
											<td>{i + 1}</td>
											<td><Link to={`soal/${val._id}`}>{val.nama}</Link></td>
											<td>{val.createdBy}</td>
											<td>{val.created.split("T")[0]}</td>
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
								<tr>Loading...</tr>
							</>
						}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default Dashboard;
