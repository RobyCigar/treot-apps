import styles from './loading.module.css'

const Loading = ({color}) => {
	return (
		<div className={styles.ldsFacebook}>
			<div style={{backgroundColor: color}}></div>
			<div style={{backgroundColor: color}}></div>
			<div style={{backgroundColor: color}}></div>
		</div>
	);
};

export default Loading;