function Navbar({ onCreateTicket }) {
  return (
    <nav className="navbar">
      <div className="logo">SUPPORT CRM</div>

      <button onClick={onCreateTicket}>
        + Create Ticket
      </button>
    </nav>
  );
}

export default Navbar;