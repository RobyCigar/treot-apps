import axios from 'axios'

const URL = 'http://localhost:8000';

export const deleteSoal = async (query) => {
	await axios.delete(`${URL}/soal/${query}`)
		.then(res => {
			console.log('ini response', res)
		})
		.catch(err => {
			console.log('ini error', err)
		})
}


export const getUsers = async (setState) => {
	await axios({
		method: 'get',
		url: `${URL}/user`
	})
	.then(res => {
		setState(res.data.success)
	})
	.catch(function (error) {
	if (error.response) {
	  console.log(error.response.data);
	  console.log(error.response.status);
	  console.log(error.response.headers);
	} else if (error.request) {
	  console.log(error.request);
	} else {
	  console.log('Error', error.message);
	}
	console.log(error.config);
	});

}


export const deleteUser = async (id) => {
	await axios({
		method: 'delete',
		url: `${URL}/user/${id}`
	})
	.then(res => {
		console.log('ini res', res)
	})
	.catch(function (error) {
	if (error.response) {
	  console.log(error.response.data);
	  console.log(error.response.status);
	  console.log(error.response.headers);
	} else if (error.request) {
	  console.log(error.request);
	} else {
	  console.log('Error', error.message);
	}
	console.log(error.config);
	});
} 