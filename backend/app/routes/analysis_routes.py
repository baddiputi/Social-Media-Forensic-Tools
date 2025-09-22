
from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.post_model import Post
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from typing import List, Dict, Any

router = APIRouter()

@router.post("/sentiment/batch")
def sentiment_batch(posts: List[Dict[str, Any]] = Body(...)):
    analyzer = SentimentIntensityAnalyzer()
    results = []
    dist = {"positive": 0, "neutral": 0, "negative": 0, "threat": 0}
    for post in posts:
        content = post.get("content", "")
        score = analyzer.polarity_scores(content)
        if score["compound"] >= 0.4:
            sentiment = "positive"
            dist["positive"] += 1
        elif score["compound"] <= -0.4:
            sentiment = "negative"
            dist["negative"] += 1
        elif score["compound"] < -0.7:
            sentiment = "threat"
            dist["threat"] += 1
        else:
            sentiment = "neutral"
            dist["neutral"] += 1
        results.append({
            "content": content,
            "user": post.get("user"),
            "sentiment": sentiment,
            "score": score["compound"]
        })
    return {
        "distribution": dist,
        "results": results
    }



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
  

@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    # Placeholder: aggregate analytics from posts/users
    return {
        "timeline": [],
        "wordcloud": [],
        "network": {"nodes": [], "links": []},
        "map": []
    }


@router.post("/collect")
def collect_posts(
    query: str,
    platform: str,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    # Placeholder: return posts matching query/platform
    posts = db.query(Post).limit(limit).all()
    return posts




@router.get("/sentiment")
def get_sentiment(db: Session = Depends(get_db)):
    analyzer = SentimentIntensityAnalyzer()
    posts = db.query(Post).all()
    results = []
    dist = {"positive": 0, "neutral": 0, "negative": 0, "threat": 0}
    for post in posts:
        content = post.content or ""
        score = analyzer.polarity_scores(content)
        # Classify sentiment
        if score["compound"] >= 0.4:
            sentiment = "positive"
            dist["positive"] += 1
        elif score["compound"] <= -0.4:
            sentiment = "negative"
            dist["negative"] += 1
        elif score["compound"] < -0.7:
            sentiment = "threat"
            dist["threat"] += 1
        else:
            sentiment = "neutral"
            dist["neutral"] += 1
        results.append({
            "content": content,
            "user": getattr(post, "user_id", None),
            "sentiment": sentiment,
            "score": score["compound"]
        })
    return {
        "distribution": dist,
        "results": results
    }


@router.get("/timeline")
def get_timeline(db: Session = Depends(get_db)):
    # Placeholder: timeline data
    return {
        "timeline": [],
        "activityLog": []
    }


@router.get("/network")
def get_network(db: Session = Depends(get_db)):
    # Placeholder: network graph and stats
    return {
        "graph": {"nodes": [], "links": []},
        "stats": {
            "totalUsers": 0,
            "connections": 0,
            "clusters": 0,
            "isolated": 0,
            "topInfluencers": [],
            "suspiciousPatterns": []
        }
    }


@router.get("/geolocation")
def get_geolocation(db: Session = Depends(get_db)):
    # Placeholder: user geolocation data
    return {
        "users": []
    }


@router.get("/report-summary")
def get_report_summary(db: Session = Depends(get_db)):
    # Placeholder: summary data
    return {
        "summary": []
    }


@router.get("/wordcloud")
def get_wordcloud(db: Session = Depends(get_db)):
    # Placeholder: word frequency data
    return {
        "words": []
    }
