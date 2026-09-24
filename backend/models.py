from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# Model used when creating a new ticket
class TicketCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str


# Model used when updating a ticket
class TicketUpdate(BaseModel):
    status: str


# Complete ticket model
class Ticket(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str
    status: str = "Open"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None