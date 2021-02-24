const mongoose = require('mongoose');

const soalSchema = mongoose.Schema({
	nama: {
		type: String,
		required: true
	},
	time: {
		type: Number,
		required: true
	},
	soal: {
		type: Array,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	}
	,
	updated: {
		type: Date,
		default: Date.now()
	},

	created: {
		type: Date
	}
})

module.exports = mongoose.model('Soal', soalSchema)