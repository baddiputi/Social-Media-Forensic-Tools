import os
from dotenv import load_dotenv

load_dotenv()  # load .env file

DATABASE_URL = os.getenv("DATABASE_URL")
REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
REDDIT_USER_AGENT = os.getenv("REDDIT_USER_AGENT")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in .env")
