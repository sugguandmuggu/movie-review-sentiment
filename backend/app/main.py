from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.sentiment import analyze_sentiment
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Review(BaseModel):
    text: str

@app.post("/analyze")
async def analyze_review(review: Review):
    try:
        result = analyze_sentiment(review.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
