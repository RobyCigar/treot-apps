import axios from 'axios'

export const deleteSoal = async (query) => {
	await axios.delete(`http://localhost:8000/soal/${query}`)
		.then(res => {
			console.log('ini response', res)
		})
		.catch(err => {
			console.log('ini error', err)
		})
}