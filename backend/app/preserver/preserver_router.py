# app/preserver/preserver_router.py
from fastapi import APIRouter

preserver_router = APIRouter()


@preserver_router.get("/test")
def test_preserver():
    return {"status": "Preserver module working"}
