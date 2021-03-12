import { useState } from "react";
import styles from "./soal.module.css";
import arrowLeft from "../asset/arrow-alt-circle-left.svg";
import arrowRight from "../asset/arrow-alt-circle-right.svg";

const SoalCard = ({
	numSoal,
	soal,
	currentSoal,
	handleAnswer,
	nextSoal,
	prevSoal,
	userAnswer,
}) => {
	const [selected, setSelected] = useState(-1);
	const [correct, setCorrect] = useState(false);
	const [answer, setAnswer] = useState(userAnswer);
	const [userScore, setUserScore] = useState(0);

	const handleChecked = (e, index) => {
		let tmpArr = answer;
		tmpArr[numSoal - 1] = e.target.textContent;
		if (e.target.textContent == currentSoal.jawaban) {
			setUserScore(userScore + 1);
		}
		setSelected(index);
	};

	// check user answer
	if (answer[numSoal - 1]) {
		let a = currentSoal.pilihan.indexOf(answer[numSoal - 1]);
		console.log("ini index", a);
	}

	return (
		<div className={styles.card}>
			<p className={styles.soal}>
				{numSoal}. {currentSoal.soal}
			</p>
			<div onChange={handleAnswer} className={styles.pilihan}>
				{currentSoal.pilihan.map((val, index) => {
					return (
						<div
							className={`${styles.pilgan} ${
								selected === index ? styles.selected : styles.unselected
							}`}
							onClick={(e) => handleChecked(e, index)}
						>
							<p>{val}</p>
						</div>
					);
				})}
			</div>
			<div className={styles.btns}>
				{numSoal === 1 ? null : (
					<button
						className={styles.btn}
						onClick={(e) =>
							prevSoal(
								e,
								setSelected,
								currentSoal.pilihan.indexOf(answer[numSoal - 2])
							)
						}
					>
						‹ Prev
					</button>
				)}
				{numSoal === soal.soal.length - 1 ? null : (
					<button
						className={styles.btn}
						onClick={(e) =>
							nextSoal(
								e,
								setSelected,
								currentSoal.pilihan.indexOf(answer[numSoal])
							)
						}
					>
						Next ›
					</button>
				)}
			</div>
		</div>
	);
};

export default SoalCard;
