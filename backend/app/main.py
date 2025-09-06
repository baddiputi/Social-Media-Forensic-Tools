from fastapi import FastAPI
from app.collector.collector_router import collector_router
from app.analyzer.analysis_router import analyzer_router
from app.reporter.report_router import reporter_router
from app.preserver.preserver_router import preserver_router

# Create FastAPI app
app = FastAPI(
    title="Social Media Forensics Tool",
    description="Backend API for collecting, analyzing, preserving, and reporting social media data",
    version="1.0.0"
)

# Attach routers
app.include_router(collector_router, prefix="/collector", tags=["Collector"])
app.include_router(analyzer_router, prefix="/analyzer", tags=["Analyzer"])
app.include_router(reporter_router, prefix="/reporter", tags=["Reporter"])
app.include_router(preserver_router, prefix="/preserver", tags=["Preserver"])


# Health check endpoint
@app.get("/")
def root():
    return {"message": "Social Media Forensics Tool API is running 🚀"}
