const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	score: {
		type: Array,
	},

	role: {
		type: String,
		default: "PARTICIPANT",
		enum: ["ADMIN", "PARTICIPANT"],
	},

	avatar: {
		type: String,
	},

	updated: {
		type: Date,
		default: Date.now()
	},
	
	created: {
		type: Date,
	},
});

module.exports = mongoose.model("Users", userSchema);
