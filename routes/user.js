// User page
const express = require("express");
const router = express.Router()
const Ticket = require("../models/ticket")

router.post("/",  async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const description = req.body.description;
    const newTicket = {name: name, email: email, description: description}

    try {
        const ticket = await Ticket.create(newTicket);
        console.log("New ticket created: ", ticket);
        res.status(200).send("Ticket Created");
    } catch(err) {
        console.log("Error creating ticket:", newTicket, err);
        res.status(500).send("Error creating ticket");
    }
});

module.exports = router;
