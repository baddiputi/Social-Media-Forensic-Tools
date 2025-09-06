from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base
# <-- change this from app.config to app.database


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    posts = relationship("Post", back_populates="user")
