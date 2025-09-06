from app.database import engine, Base
from app.models.user_model import User  # Import first
from app.models.post_model import Post  # Import second

# Create all tables
Base.metadata.create_all(bind=engine)
print("Tables created successfully")
