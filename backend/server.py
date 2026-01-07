from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ValidationError
from typing import List
import uuid
from datetime import datetime

from models.contact import ContactMessage, ContactMessageCreate


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str


# ============ CONTACT ENDPOINTS ============

@api_router.post("/contact", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_contact_message(message_data: ContactMessageCreate):
    """
    Create a new contact message and store in MongoDB
    """
    try:
        # Create contact message with additional fields
        contact_message = ContactMessage(**message_data.dict())
        
        # Insert into MongoDB
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if not result.inserted_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error al guardar el mensaje"
            )
        
        logger.info(f"Contact message created: {contact_message.id}")
        
        return {
            "success": True,
            "message": "Mensaje recibido correctamente. Te contactaremos pronto.",
            "data": {
                "id": contact_message.id,
                "name": contact_message.name,
                "email": contact_message.email,
                "phone": contact_message.phone,
                "created_at": contact_message.created_at.isoformat()
            }
        }
    
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error creating contact message: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al procesar el mensaje"
        )


@api_router.get("/contact", response_model=dict)
async def get_contact_messages(
    limit: int = 100,
    skip: int = 0,
    status_filter: str = None
):
    """
    Get all contact messages (for admin purposes)
    Optional filters: status (new, read, replied)
    """
    try:
        query = {}
        if status_filter:
            query["status"] = status_filter
        
        # Get messages sorted by created_at descending
        cursor = db.contact_messages.find(query).sort("created_at", -1).skip(skip).limit(limit)
        messages = await cursor.to_list(length=limit)
        
        # Convert ObjectId to string for JSON serialization
        for message in messages:
            message["_id"] = str(message["_id"])
        
        return {
            "success": True,
            "count": len(messages),
            "data": messages
        }
    
    except Exception as e:
        logger.error(f"Error fetching contact messages: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al obtener los mensajes"
        )


@api_router.get("/contact/{message_id}", response_model=dict)
async def get_contact_message(message_id: str):
    """
    Get a specific contact message by ID
    """
    try:
        message = await db.contact_messages.find_one({"id": message_id})
        
        if not message:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mensaje no encontrado"
            )
        
        message["_id"] = str(message["_id"])
        
        return {
            "success": True,
            "data": message
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact message: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al obtener el mensaje"
        )


# ============ ORIGINAL ENDPOINTS ============

@api_router.get("/")
async def root():
    return {"message": "Ingeniería Automotriz Ríos API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
