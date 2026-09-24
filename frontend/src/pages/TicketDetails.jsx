import { useEffect, useState } from "react";
import { getTicket, updateTicket } from "../services/api";

function TicketDetails({ ticketId, onBack }) {
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  const loadTicket = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Loading ticket:", ticketId);

      const response = await getTicket(ticketId);

      console.log("Ticket response:", response.data);

      setTicket(response.data);
      setStatus(response.data.status || "Open");
      setNotes(response.data.notes || "");
    } catch (error) {
      console.error("Error loading ticket:", error);

      setError(
        error.response?.data?.detail ||
        error.message ||
        "Failed to load ticket."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTicket(ticketId, {
        status,
        notes,
      });

      alert("Ticket updated successfully!");

      loadTicket();
    } catch (error) {
      console.error("Update error:", error);

      alert(
        error.response?.data?.detail ||
        "Failed to update ticket."
      );
    }
  };

  if (loading) {
    return <p>Loading ticket...</p>;
  }

  if (error) {
    return (
      <div>
        <button onClick={onBack}>← Back</button>

        <h3>Unable to load ticket</h3>

        <p>{error}</p>

        <p>
          Ticket ID: <strong>{ticketId}</strong>
        </p>

        <button onClick={loadTicket}>Try Again</button>
      </div>
    );
  }

  if (!ticket) {
    return <p>Ticket not found.</p>;
  }

  return (
    <div className="details-container">
      <button onClick={onBack}>← Back</button>

      <h2>Ticket #{ticket.ticket_id}</h2>

      <p>
        <strong>Customer:</strong> {ticket.customer_name}
      </p>

      <p>
        <strong>Email:</strong> {ticket.customer_email}
      </p>

      <p>
        <strong>Subject:</strong> {ticket.subject}
      </p>

      <p>
        <strong>Description:</strong> {ticket.description}
      </p>

      <p>
        <strong>Created:</strong> {ticket.created_at}
      </p>

      <label>Status</label>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>

      <label>Notes</label>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button onClick={handleUpdate}>
        Update Ticket
      </button>
    </div>
  );
}

export default TicketDetails;