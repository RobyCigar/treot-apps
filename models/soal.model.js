const mongoose = require('mongoose');

const soalSchema = mongoose.Schema({
	soal: {
		type: Array,
		required: true
	},

	updated: {
		type: Date,
		default: Date.now()
	},

	created: {
		type: Date
	}
})

module.exports = mongoose.model('Soal', soalSchema)