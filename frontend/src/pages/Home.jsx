import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TicketTable from "../components/TicketTable";
import { getTickets } from "../services/api";

function Home({ onTicketClick }) {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await getTickets();
      setTickets(response.data);
    } catch (error) {
      console.error("Error loading tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      ticket.customer_name?.toLowerCase().includes(searchText) ||
      ticket.ticket_id?.toLowerCase().includes(searchText) ||
      ticket.customer_email?.toLowerCase().includes(searchText) ||
      ticket.description?.toLowerCase().includes(searchText);

    const ticketStatus = ticket.status || "Open";

    const matchesStatus =
      status === "All" || ticketStatus === status;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  return (
    <div>
      <div className="stats">
        <div className="card">
          <h3>Total Tickets</h3>
          <p>{tickets.length}</p>
        </div>

        <div className="card">
          <h3>Open</h3>
          <p>
            {tickets.filter((t) => (t.status || "Open") === "Open").length}
          </p>
        </div>

        <div className="card">
          <h3>In Progress</h3>
          <p>
            {
              tickets.filter(
                (t) => t.status === "In Progress"
              ).length
            }
          </p>
        </div>

        <div className="card">
          <h3>Closed</h3>
          <p>
            {tickets.filter((t) => t.status === "Closed").length}
          </p>
        </div>
      </div>

      <div className="filters">
        <SearchBar search={search} setSearch={setSearch} />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <TicketTable
        tickets={filteredTickets}
        onTicketClick={onTicketClick}
      />
    </div>
  );
}

export default Home;