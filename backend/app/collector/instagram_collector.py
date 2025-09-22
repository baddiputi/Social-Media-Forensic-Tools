from fastapi import APIRouter

instagram_collector_router = APIRouter(prefix="/instagram", tags=["Instagram Collector"])


@instagram_collector_router.get("/test")
def test_instagram():
    return {"message": "Instagram collector working!"}


@instagram_collector_router.post("/collect")
def collect_instagram_data(username: str, limit: int = 5):
    # Dummy response (later replace with Instaloader or Instagram API)
    return {
        "platform": "Instagram",
        "username": username,
        "limit": limit,
        "data": [f"Dummy instagram post {i}" for i in range(1, limit + 1)]
    }
