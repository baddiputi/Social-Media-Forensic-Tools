from fastapi import APIRouter

reddit_collector_router = APIRouter(prefix="/collector/reddit", tags=["Reddit Collector"])


@reddit_collector_router.get("/test")
def test_reddit():
    return {"message": "Reddit collector working!"}


@reddit_collector_router.post("/collect")
def collect_reddit_data(subreddit: str, limit: int = 5):
    # Dummy response (later replace with PRAW or Pushshift API)
    return {
        "platform": "Reddit",
        "subreddit": subreddit,
        "limit": limit,
        "data": [f"Dummy reddit post {i}" for i in range(1, limit + 1)]
    }
