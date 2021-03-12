import styles from "./modal.module.css";

const Modal = ({ text, yesOption, noOption, okOption }) => {
	return (
		<div className={styles.card}>
			<p className={styles.title}>{text}</p>
			<div className={styles.option}>
				{yesOption && noOption ? (
					<>
						<p onClick={yesOption}>Yes</p>
						<p onClick={noOption}>No</p>
					</>
				) : (
					<>
						<p onClick={okOption}>Ok</p>
					</>
				)}
			</div>
		</div>
	);
};

export default Modal;
