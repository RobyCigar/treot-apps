const mongoose = require("mongoose");

const eachSoal = mongoose.Schema();

const soalSchema = mongoose.Schema({
	nama: {
		type: String,
		required: true,
	},
	time: {
		type: Number,
		required: true,
	},
	soal: [
		{
			soal: {
				type: Array,
				required: true,
			},
			pilihan: {
				type: Array,
				required: true,
			},
			jawaban: {
				type: String,
			},
		},
	],
	createdBy: {
		type: String,
		required: true,
	},
	updated: {
		type: Date,
		default: Date.now(),
	},

	created: {
		type: Date,
	},
});

module.exports = mongoose.model("Soal", soalSchema);
