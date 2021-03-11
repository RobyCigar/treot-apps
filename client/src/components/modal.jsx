import styles from "./modal.module.css";

const Modal = ({ text, yesOption, noOption }) => {
	return (
		<div className={styles.card}>
			<p className={styles.title}>{text}</p>
			<div className={styles.option}>
				<p onClick={yesOption}>Yes</p>
				<p onClick={noOption}>No</p>
			</div>
		</div>
	);
};

export default Modal;
