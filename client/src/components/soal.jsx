import { useState, useEffect} from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import styles from './soal.module.css'

// asset
import background from '../asset/background2.jpg'

const Soal = (props) => {
	const [soal, setSoal] = useState(false)
	let { soalId } = useParams();

	useEffect(() => {
		axios({
			method: "GET",
			data: soalId,
			url: `http://localhost:8000/soal/${soalId}`
		})
		.then(res => {

			console.log('ini data',res.data)

		})
		.catch(err => {
			console.log(err.response)
		})

	}, [])

	console.log('ini user params', soalId)
	return (
		<>
			<h1>Selamat Mengerjakan</h1>
		</>
	)
};

export default Soal;
