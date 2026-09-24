import StatusBadge from "./StatusBadge";

function TicketTable({ tickets, onTicketClick }) {
  return (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Subject</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {tickets.length === 0 ? (
          <tr>
            <td colSpan="5">No tickets found</td>
          </tr>
        ) : (
          tickets.map((ticket) => (
            <tr
              key={ticket.ticket_id}
              onClick={() => onTicketClick(ticket.ticket_id)}
            >
              <td>{ticket.ticket_id}</td>
              <td>{ticket.customer_name}</td>
              <td>{ticket.subject}</td>
              <td>
                <StatusBadge status={ticket.status || "Open"} />
              </td>
              <td>
                {ticket.created_at
                  ? new Date(ticket.created_at).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default TicketTable;