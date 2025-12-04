import os

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")  # or your Atlas URI

client = AsyncIOMotorClient(MONGO_URI)
db = client["marketmycode"]

users_collection = db["users"]
