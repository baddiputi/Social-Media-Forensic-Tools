# app/reporter/report_router.py
from fastapi import APIRouter

reporter_router = APIRouter()


@reporter_router.get("/test")
def test_reporter():
    return {"status": "Reporter module working"}
