from fastapi import APIRouter

facebook_collector_router = APIRouter(prefix="/collector/facebook", tags=["Facebook Collector"])


@facebook_collector_router.get("/test")
def test_facebook():
    return {"message": "Facebook collector working!"}


@facebook_collector_router.post("/collect")
def collect_facebook_data(page: str, limit: int = 5):
    # Dummy response (later replace with Facebook Graph API or scraper)
    return {
        "platform": "Facebook",
        "page": page,
        "limit": limit,
        "data": [f"Dummy facebook post {i}" for i in range(1, limit + 1)]
    }
