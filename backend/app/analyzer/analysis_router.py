# app/analyzer/analysis_router.py
from fastapi import APIRouter

analyzer_router = APIRouter()


@analyzer_router.get("/test")
def test_analyzer():
    return {"status": "Analyzer module working"}
