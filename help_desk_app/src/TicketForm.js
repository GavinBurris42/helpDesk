import React, { useState } from 'react';

function TicketForm() {
    const [ticket, setTicket] = useState({
        name: '',
        email: '',
        description: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTicket(prevTicket => ({
            ...prevTicket,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket)
          })
          .then((response) => response.json())
          .catch((error) => console.error('Error creating ticket:', error));
        console.log(ticket);
        console.log('Ticket submitted successfully!');
        setTicket({name: '', email: '', description: ''});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={ticket.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={ticket.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description of the Problem:</label>
                <textarea
                    name="description"
                    value={ticket.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Submit Ticket</button>
            
        </form>
    );
}

export default TicketForm;