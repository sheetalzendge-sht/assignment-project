from database.database import get_connection
from models import TicketCreate, TicketUpdate
from datetime import datetime


# Generate Ticket ID
def generate_ticket_id():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT ticket_id FROM tickets ORDER BY id DESC LIMIT 1"
    )

    result = cursor.fetchone()

    connection.close()

    if result is None:
        return "TKT-001"

    last_ticket_id = result["ticket_id"]

    number = int(last_ticket_id.split("-")[1])

    new_number = number + 1

    return f"TKT-{new_number:03d}"


# Create Ticket
def create_ticket(ticket: TicketCreate):
    connection = get_connection()
    cursor = connection.cursor()

    ticket_id = generate_ticket_id()
    current_time = datetime.now().isoformat()

    cursor.execute("""
        INSERT INTO tickets (
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description,
            status,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        ticket_id,
        ticket.customer_name,
        ticket.customer_email,
        ticket.subject,
        ticket.description,
        "Open",
        current_time,
        current_time
    ))

    connection.commit()
    connection.close()

    return {
        "ticket_id": ticket_id,
        "created_at": current_time
    }


# Get All Tickets
def get_tickets():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description,
            status,
            created_at,
            updated_at
        FROM tickets
        ORDER BY id DESC
    """)

    tickets = cursor.fetchall()

    connection.close()

    return [dict(ticket) for ticket in tickets]


# Get One Ticket By Ticket ID
def get_ticket_by_id(ticket_id: str):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description,
            status,
            created_at,
            updated_at
        FROM tickets
        WHERE ticket_id = ?
    """, (ticket_id,))

    ticket = cursor.fetchone()

    connection.close()

    if ticket is None:
        return None

    return dict(ticket)


# Update Ticket
def update_ticket(ticket_id: str, ticket: TicketUpdate):
    connection = get_connection()
    cursor = connection.cursor()

    current_time = datetime.now().isoformat()

    # Check if ticket exists
    cursor.execute("""
        SELECT ticket_id
        FROM tickets
        WHERE ticket_id = ?
    """, (ticket_id,))

    existing_ticket = cursor.fetchone()

    if existing_ticket is None:
        connection.close()
        return None

    # Update ticket status
    cursor.execute("""
        UPDATE tickets
        SET
            status = ?,
            updated_at = ?
        WHERE ticket_id = ?
    """, (
        ticket.status,
        current_time,
        ticket_id
    ))

    connection.commit()

    # Get updated ticket
    cursor.execute("""
        SELECT
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description,
            status,
            created_at,
            updated_at
        FROM tickets
        WHERE ticket_id = ?
    """, (ticket_id,))

    updated_ticket = cursor.fetchone()

    connection.close()

    return dict(updated_ticket)