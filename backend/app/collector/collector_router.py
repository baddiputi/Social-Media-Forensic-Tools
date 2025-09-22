# app/collector/collector_router.py
from fastapi import APIRouter
from app.collector.reddit_collector import reddit_collector_router
from app.collector.facebook_collector import facebook_collector_router
from app.collector.instagram_collector import instagram_collector_router

collector_router = APIRouter()

# Mount platform-specific routers
collector_router.include_router(reddit_collector_router)
collector_router.include_router(facebook_collector_router)
collector_router.include_router(instagram_collector_router)


@collector_router.get("/test")
def test_collector():
    return {"status": "Collector module working"}
