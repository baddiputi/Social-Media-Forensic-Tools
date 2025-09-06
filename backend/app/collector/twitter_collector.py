from fastapi import APIRouter

twitter_collector_router = APIRouter(prefix="/collector/twitter", tags=["Twitter Collector"])


@twitter_collector_router.get("/test")
def test_twitter():
    return {"message": "Twitter collector working!"}


@twitter_collector_router.post("/collect")
def collect_twitter_data(keyword: str, limit: int = 10):
    # Dummy response (later replace with Tweepy or snscrape)
    return {
        "platform": "Twitter",
        "keyword": keyword,
        "limit": limit,
        "data": [f"Dummy tweet {i}" for i in range(1, limit + 1)]
    }
