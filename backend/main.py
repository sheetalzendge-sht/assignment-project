from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import TicketCreate, TicketUpdate

from crud import (
    create_ticket,
    get_tickets,
    get_ticket_by_id,
    update_ticket
)

from database.database import create_tickets_table, create_notes_table


app = FastAPI(title="Customer Ticket System")


# Create database tables
create_tickets_table()
create_notes_table()


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://sunny-passion-production-c7ec.up.railway.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home
@app.get("/")
def home():
    return {
        "message": "Customer Ticket System API is running"
    }


# Create ticket
@app.post("/api/tickets")
def create_new_ticket(ticket: TicketCreate):
    return create_ticket(ticket)


# Get all tickets
@app.get("/api/tickets")
def get_all_tickets():
    return get_tickets()


# Get one ticket by ticket ID
@app.get("/api/tickets/{ticket_id}")
def get_single_ticket(ticket_id: str):
    ticket = get_ticket_by_id(ticket_id)

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


# Update ticket
@app.put("/api/tickets/{ticket_id}")
def update_existing_ticket(ticket_id: str, ticket: TicketUpdate):
    updated_ticket = update_ticket(ticket_id, ticket)

    if updated_ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return updated_ticket