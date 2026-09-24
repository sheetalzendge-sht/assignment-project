import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const openTicket = (ticketId) => {
    setSelectedTicket(ticketId);
    setPage("details");
  };

  return (
    <>
      <Navbar onCreateTicket={() => setPage("create")} />

      <main className="main-container">

        {page === "home" && (
          <Home onTicketClick={openTicket} />
        )}

        {page === "create" && (
          <CreateTicket
            onBack={() => setPage("home")}
            onCreated={() => setPage("home")}
          />
        )}

        {page === "details" && (
          <TicketDetails
            ticketId={selectedTicket}
            onBack={() => setPage("home")}
          />
        )}

      </main>
    </>
  );
}

export default App;