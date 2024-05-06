require('dotenv').config();
const mongoose = require('mongoose');

const clusterName = process.env.CLUSTER_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const url = "mongodb+srv://" + username + ":" + password + "@cluster0.blv94xu.mongodb.net/?retryWrites=true&w=majority&appName=" + clusterName;

mongoose.connect(url).then(() => {
	console.log("Connected to DB");
}).catch(err => {
	console.log("Error: ", err.message);
});

module.exports = mongoose;