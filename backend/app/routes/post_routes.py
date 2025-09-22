from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.post_model import Post
from app.models.user_model import User

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

  

@router.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    return db.query(Post).all()



@router.post("/posts")
def create_post(content: str, user_id: int, db: Session = Depends(get_db)):
    post = Post(content=content, user_id=user_id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post



@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()



@router.post("/users")
def create_user(username: str, db: Session = Depends(get_db)):
    user = User(username=username)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
