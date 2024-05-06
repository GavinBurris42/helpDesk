require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("./database");
const app = express();
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const seedTickets = require('./seed');


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
console.log(username, password)
seedTickets();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use("/admin", adminRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// module.exports = app  