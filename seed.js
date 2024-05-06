const Ticket = require('./models/ticket')

const seedData = [
  {
    name: "User1",
    description: "User unable to log in",
    email: "user1@example.com",
    status: "New",
  },
  {
    name: "User2",
    description: "Application crash on start",
    email: "user2@example.com",
    status: "In Progress",
    comments: [{message: "Beginning to resolve the issue.", date: Date.now()}]
  },
  {
    description: "Payment processing error",
    email: "user3@example.com",
    status: "Resolved",
    comments: [{message: "Beginning to resolve the issue.", date: Date.now()}, 
               {message: "Payment processing error has been resolved.", date: Date.now()}]
  },
];

const seedTickets = async () => {
  try {
    const existingTickets = await Ticket.find();
    if (existingTickets.length === 0) {
      await Ticket.insertMany(seedData);
      console.log('Seed data inserted successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedTickets;
