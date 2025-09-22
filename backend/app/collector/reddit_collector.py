import os
from fastapi import APIRouter, Depends
from pydantic import BaseModel
import praw
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.post_model import Post
from app.models.user_model import User

reddit_collector_router = APIRouter(
    prefix="/reddit",
    tags=["Reddit Collector"]
)


class RedditCollectRequest(BaseModel):
    subreddit: str
    limit: int = 5


@reddit_collector_router.get("/test")
def test_reddit():
    return {"message": "Reddit collector working!"}




def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@reddit_collector_router.post("/collect")
def collect_reddit_data(
    req: RedditCollectRequest,
    db: Session = Depends(get_db)
):
    reddit = praw.Reddit(
        client_id=os.getenv("REDDIT_CLIENT_ID"),
        client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
        user_agent=os.getenv("REDDIT_USER_AGENT") or "sm_forensics_tool"
    )
    posts = []
    import hashlib
    try:
        for submission in reddit.subreddit(req.subreddit).hot(limit=req.limit):
            content = submission.title
            if submission.selftext:
                content += "\n" + submission.selftext
            # Shorten hash input line
            hash_input = (
                f"reddit|{req.subreddit}|{str(submission.author)}|"
                f"{submission.created_utc}|{content}|{submission.score}|{submission.url}"
            )
            hash_val = hashlib.sha256(hash_input.encode('utf-8')).hexdigest()

            username = str(submission.author)
            user = db.query(User).filter_by(username=username).first()
            if not user:
                user = User(username=username)
                db.add(user)
                db.commit()
                db.refresh(user)


            existing_post = db.query(Post).filter_by(
                content=content, user_id=user.id
            ).first()
            if not existing_post:
                import datetime
                post = Post(
                    content=content,
                    user_id=user.id,
                    timestamp=datetime.datetime.utcfromtimestamp(submission.created_utc)
                )
                db.add(post)
                db.commit()
                db.refresh(post)

            posts.append({
                "platform": "reddit",
                "query": req.subreddit,
                "user": username,
                "timestamp": submission.created_utc,
                "content": content,
                "engagement": {
                    "likes": submission.score,
                    "shares": 0,
                    "comments": submission.num_comments
                },
                "url": submission.url,
                "hash": hash_val
            })
    except Exception as e:
        return {"error": str(e)}
    return {
        "platform": "Reddit",
        "subreddit": req.subreddit,
        "limit": req.limit,
        "data": posts
    }
