import { useContext, useEffect, useState } from "react";
import { UserCtx } from "../context";
import {
	Redirect,
	Link,
	useParams,
	useRouteMatch,
	Route,
	Switch,
} from "react-router-dom";
import axios from "axios";
import styles from "./dashboard.module.css";

// Component
import Modal from "./modal";
import SoalTable from "./soalTable";
import UsersTable from './usersTable';
import { deleteSoal } from "./api.js";

// asset
import background from "../asset/background1.jpg";
import logoutIcon from "../asset/logout.svg";
import profilePic from "../asset/default.png";
import editIcon from "../asset/pencil.svg";

const types = ["Soal", "Users"];

const Dashboard = (props) => {
	const { user, cookies, handleCookies, handleUser } = useContext(UserCtx);
	const [showModal, setShowModal] = useState(false);
	const [isLogout, setIsLogout] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [msg, setMsg] = useState(false);
	const [active, setActive] = useState(types[0]);
	const [soal, setSoal] = useState(false);
	const [soalId, setSoalId] = useState("");
	const { path, url } = useRouteMatch();
	const { userId } = useParams();

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

		// Fetch Soal

		axios
			.get(`http://localhost:8000/soal`)
			.then((res) => {
				setSoal(res.data.soal);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [msg]);

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

	const handleDeleteSoal = async (e) => {
		console.log("ini id", soalId);
		await deleteSoal(soalId);
		setMsg("Soal successfully delete");
		handleModal();
	};

	const handleEditSoal = (e, id) => {
		console.log("ini id", id);
	};

	const handleModal = (e, id) => {
		setShowModal(!showModal);
		if (id) {
			setSoalId(id);
		}
	};

	return (
		<div>
			<img src={background} alt="background" className={styles.background} />
			<Link to="/" onClick={handleLogout} className={styles.logout}>
				<img src={logoutIcon} alt="icon" />
				<p>Logout</p>
			</Link>

			<Link to={`${path}/edit/${user._id}`} className={styles.editUser}>
				<div>
					<img src={editIcon} alt="" />
					<p>Edit</p>
				</div>
			</Link>

			<main className={styles.container}>
				<div className={styles.profile}>
					{user.avatar ? (
						<img src={`http://localhost:8000/${user.avatar}`} alt="" />
					) : (
						<img src={profilePic} alt="Profile" />
					)}
				</div>
				<div className={styles.name}>
					<p className="poppins">Welcome, {user.name}</p>
				</div>

				{/* TABS */}
				{isAdmin ? 
				<ul className={styles.tab}>
					{types.map((type) => (
						<li>
							<div
								key={type}
								active={active === type}
								onClick={() => setActive(type)}
								className={
									active == type
										? `${styles.tabList} ${styles.active}`
										: `${styles.tabList}`
								}
							>
								{" "}
								{type}
							</div>
						</li>
					))}
				</ul> : null
			} 

				{ active == 'Soal' ? 

				<SoalTable
					soal={soal}
					active={active}
					isAdmin={isAdmin}
					path={path}
					handleModal={handleModal}
					/>
					: null
				}

				{ active == 'Users' ? 

				<UsersTable
					soal={soal}
					active={active}
					isAdmin={isAdmin}
					path={path}
					handleModal={handleModal}
					/>
					: null
				}

			</main>
			{showModal ? (
				<Modal
					text={"Are you sure want to delete ? "}
					yesOption={(e) => handleDeleteSoal(e, soalId)}
					noOption={handleModal}
				/>
			) : null}
		</div>
	);
};

export default Dashboard;
