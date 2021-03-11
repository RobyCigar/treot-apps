import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import styles from "./soal.module.css";
import Modal from "./modal";

// asset
import background from "../asset/background1.jpg";

const Soal = (props) => {
	const [soal, setSoal] = useState(false);
	const [currentSoal, setCurrentSoal] = useState(null);
	const [time, setTime] = useState(0);
	const [exit, setExit] = useState(false);
	const [score, setScore] = useState(0);

	let { soalId } = useParams();

	useEffect(() => {
		axios({
			method: "GET",
			data: soalId,
			url: `http://localhost:8000/soal/${soalId}`,
		})
			.then((res) => {
				setSoal(res.data.soal);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);

	const handleCurrentSoal = () => {
		setCurrentSoal();
	};

	if (exit) {
		return <Redirect to="/dashboard" />;
	}

	if (!soal) {
		return <h1>Loading...</h1>;
	}

	console.log("ini soal", soal);
	console.log("ini current soal map", currentSoal.pilihan);

	return (
		<>
			<img className={styles.background} src={background} alt="" />
			<div className={styles.container}>
				{currentSoal ? (
					<>
						<p className={styles.soal}>{currentSoal.soal}</p>
						<div className={styles.pilihan}>
							{currentSoal.pilihan.map(val => {
								<>
									<input type="radio" />
									<label for={val}>{val}</label>
								</>
							})}
							<br />
							<input type="radio" id="female" name="gender" value="female" />
							<label for="female">Female</label>
							<br />
							<input type="radio" id="other" name="gender" value="other" />
							<label for="other">Other</label>
						</div>
					</>
				) : (
					<>
						<Modal
							text={"Apakah kamu yakin ingin mengerjakan? "}
							yesOption={(e) => setCurrentSoal(soal.soal[0])}
							noOption={(e) => setExit(true)}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default Soal;
