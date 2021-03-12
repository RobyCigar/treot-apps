import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import styles from "./soal.module.css";
import Modal from "./modal";
import Timer from "./timer";
import SoalCard from './soalCard'
import Loading from './loading'

// asset
import background from "../asset/background1.jpg";


const Soal = (props) => {
	const [soal, setSoal] = useState(false);
	const [currentSoal, setCurrentSoal] = useState(false);
	const [modal, setModal] = useState(false);
	const [time, setTime] = useState(0);
	const [numSoal, setNumSoal] = useState(1);
	const [timeOver, setTimeOver] = useState(false);
	const [exit, setExit] = useState(false);
	const [userAnswer, setUserAnswer] = useState([])

	let { soalId } = useParams();

	useEffect(() => {
		axios({
			method: "GET",
			data: soalId,
			url: `http://localhost:8000/soal/${soalId}`,
		})
			.then((res) => {
				const { soal } = res.data;
				setSoal(soal);
				setTime(soal.time);
				soal.soal.forEach((val, i) => {
					setUserAnswer(userAnswer => [...userAnswer, false])
				})
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);

	const handleCurrentSoal = () => {
		setCurrentSoal();
	};

	const handleModal = () => {
		setModal(!modal);
	};

	const handleTimeout = () => {
		setTimeOver(true);
	};

	const prevSoal = (e, setState, state) => {
		if(setState) {
			setState(state)
		}
		setNumSoal(numSoal - 1);
		setCurrentSoal(soal.soal[numSoal]);
	};

	const nextSoal = (e, setState, state) => {
		if(setState) {
			setState(state)
		}
		setNumSoal(numSoal + 1);
		setCurrentSoal(soal.soal[numSoal]);
	};

	const handleAnswer = (e) => {
		if (currentSoal.jawaban === e.target.value) {
			console.log("benar");
		} else {
			console.log("salah");
		}
	};

	if (exit) {
		return <Redirect to="/dashboard" />;
	}

	if (!soal && !currentSoal) {
		return <Loading/>;
	}

	return (
		<>
			<img className={styles.background} src={background} alt="" />
			<div className={styles.container}>
				{currentSoal ? (
					<>
						<div className={styles.head}>
							<p onClick={handleModal} style={{cursor:"pointer"}}> ← Exit</p>
							<div>
								<Timer handleTimeout={handleTimeout} time={time} />
								<div onClick={handleModal} className={styles.submit}>Submit</div>
							</div>
						</div>
						<SoalCard
							numSoal={numSoal}
							currentSoal={currentSoal}
							handleAnswer={handleAnswer}
							userAnswer={userAnswer}
							prevSoal={prevSoal}
							nextSoal={nextSoal}
							soal={soal}
						/>

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

				{modal ? (
					<>
						<Modal
							text={"Apakah kamu yakin ingin meninggalkan ujian & menyimpan jawaban? "}
							yesOption={(e) => setExit(true)}
							noOption={handleModal}
						/>
					</>
				) : null}

				{timeOver ? (
					<>
						<Modal
							text={"Waktu kamu sudah habis"}
							okOption={(e) => setExit(true)}
						/>
					</>
				) : null}
			</div>
		</>
	);
};

export default Soal;
