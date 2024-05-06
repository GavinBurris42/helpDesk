const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
	name: String,
	email: String,
    description: String,
	author: String,
	status: {
		type: String,
		enum: ["New", "In Progress", "Resolved"],
		default: "New"
	},
    comments: [{ message: String, date: Date }]
})

module.exports = mongoose.model("Ticket", ticketSchema);