import React, { useEffect, useState } from 'react';

const TicketManager = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/admin/tickets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setTickets(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectTicket = (ticketId) => {
    fetch(`http://localhost:8080/admin/tickets/${ticketId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch ticket');
        }
        return response.json();
      })
      .then((data) => {
        setSelectedTicket(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateStatus = (newStatus) => {
    if (!selectedTicket) return;

    fetch(`http://localhost:8080/admin/tickets/${selectedTicket._id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update status');
        }
        return response.json();
      })
      .then((updatedTicket) => {
        setSelectedTicket(updatedTicket);
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket._id === updatedTicket._id ? updatedTicket : ticket
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!selectedTicket || !comment.trim()) return;

    fetch(`http://localhost:8080/admin/tickets/${selectedTicket._id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: comment }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        return response.json();
      })
      .then((updatedTicket) => {
        setSelectedTicket(updatedTicket);
        setComment('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <h2>Tickets</h2>
        <ul>
          {tickets.map((ticket) => (
            <li
              key={ticket._id}
              onClick={() => handleSelectTicket(ticket._id)}
              style={{ cursor: 'pointer' }}
            >
              Name: {ticket.name}<br></br>
              Description: {ticket.description}<br></br>
              Status: {ticket.status}<br></br>
            </li>
          ))}
        </ul>
      </div>

      {selectedTicket && (
        <div>
          <h2>Selected Ticket</h2>
          <p>Description: {selectedTicket.description}</p>
          <p>Status: {selectedTicket.status}</p>

          <div>
            <h3>Update Status</h3>
            <button onClick={() => handleUpdateStatus('In Progress')}>Mark as In Progress</button>
            <button onClick={() => handleUpdateStatus('Resolved')}>Mark as Resolved</button>
          </div>

          <div>
            <h3>Comments</h3>
            <ul>
              {selectedTicket.comments.map((comment, index) => (
                <li key={index}>
                  {comment.message} - {new Date(comment.date).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Add a Comment</h3>
            <form onSubmit={handleAddComment}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManager;
