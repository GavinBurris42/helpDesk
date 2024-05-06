// Admin Page
const express = require("express")
const router = express.Router()
const Ticket = require('../models/ticket')


router.get('/tickets', async (req, res) => {
    try {
      const tickets = await Ticket.find(); 
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tickets' });
    }
  });
  
  router.get('/tickets/:id', async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      res.json(ticket);
    } catch (error) {
      res.status(404).json({ message: 'Ticket not found' });
    }
  });
  
  router.patch('/tickets/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      ticket.email
      console.log("Emailed user of updated ticket status, " + ticket.status + ", at " + ticket.email)
      res.json(ticket);
    } catch (error) {
      res.status(400).json({ message: 'Error updating ticket status' });
    }
  });
  
  router.post('/tickets/:id/comments', async (req, res) => {
    const { message } = req.body;
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: { message, date: new Date() } } },
        { new: true }
      );
      console.log("Emailed user of new comment at " + + ticket.email)
      res.json(ticket);
    } catch (error) {
      res.status(400).json({ message: 'Error adding comment' });
    }
  });

module.exports = router;