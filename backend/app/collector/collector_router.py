# app/collector/collector_router.py
from fastapi import APIRouter

collector_router = APIRouter()


@collector_router.get("/test")
def test_collector():
    return {"status": "Collector module working"}
