import axios from "axios";

const API = axios.create({
  baseURL: "https://assignment-project-b7vi.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTicket = (ticketData) => {
  return API.post("/api/tickets", ticketData);
};

export const getTickets = () => {
  return API.get("/api/tickets");
};

export const getTicket = (ticketId) => {
  return API.get(`/api/tickets/${ticketId}`);
};

export const updateTicket = (ticketId, ticketData) => {
  return API.put(`/api/tickets/${ticketId}`, ticketData);
};

export default API;