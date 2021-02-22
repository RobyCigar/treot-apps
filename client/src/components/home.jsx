import { useEffect, useState, useContext } from "react";
import styles from "./home.module.css";
import { Link, Redirect } from "react-router-dom";
import { UserCtx } from '../context';

// import asset
import background from "../asset/bubble.jpg";
import twitter from "../asset/twitter.svg";
import instagram from "../asset/insta.svg";

const Home = (props) => {
	const user = useContext(UserCtx)

	console.log('ini user context ', user)
	if (!background || !twitter || !instagram) {
		return <h1>Loading...</h1>;
	}
	
	console.log('props di home', props)

	console.log('ini user', user)

	return (
		<div className={styles.container}>
			<img
				src={background}
				alt="background"
				className={styles.background}
			/>
			<nav className={`${styles.nav} poppins`}>
				<Link to="/login">
					<span className={styles.link}>Log In</span>
				</Link>
				<Link to="/register">
					<span className={styles.link}>Sign Up</span>
				</Link>
			</nav>
			<div className={`${styles.title} inter`}>
				<h1>TRY OUT APPS</h1>
			</div>
			<p className={`${styles.flw} poppins`}>Follow me :</p>
			<ul className={styles.icon}>
				<a href="https://www.instagram.com/rabih3.1415/">
					<img src={instagram} alt="icon" />
				</a>
				<a href="https://twitter.com/Robycigar">
					<img src={twitter} alt="also icon" />
				</a>
			</ul>
			<p className={`${styles.fig} poppins`}>Created By <span className={styles.footfig}>@RobyCigar</span></p>
		</div>
	);
};

export default Home;
