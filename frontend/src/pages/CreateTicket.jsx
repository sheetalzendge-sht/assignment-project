import { useState } from "react";
import { createTicket } from "../services/api";

function CreateTicket({ onBack, onCreated }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createTicket(formData);

      setMessage(
        `Ticket created successfully! ID: ${response.data.ticket_id}`
      );

      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
      });

      if (onCreated) {
        onCreated();
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to create ticket.");
    }
  };

  return (
    <div className="form-container">
      <button onClick={onBack}>← Back</button>

      <h2>Create New Ticket</h2>

      <form onSubmit={handleSubmit}>
        <label>Customer Name</label>
        <input
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
          required
        />

        <label>Customer Email</label>
        <input
          type="email"
          name="customer_email"
          value={formData.customer_email}
          onChange={handleChange}
          required
        />

        <label>Issue Title</label>
        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Ticket</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateTicket;