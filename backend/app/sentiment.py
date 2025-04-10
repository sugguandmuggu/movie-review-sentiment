# app/sentiment.py

from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

# Load the model and tokenizer
MODEL_NAME = "Dmyadav2001/Sentimental-Analysis"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

# Define labels (based on the model's documentation/order)
labels = ['Negative', 'Positive', 'Neutral']

def analyze_sentiment(text: str) -> dict:
    # Tokenize input
    inputs = tokenizer(text, return_tensors='pt', truncation=True)
    
    with torch.no_grad():
        outputs = model(**inputs)
        scores = outputs.logits[0]
        predicted_class = torch.argmax(scores).item()
        score = torch.softmax(scores, dim=0)[predicted_class].item()

    return {
        "sentiment": labels[predicted_class].lower(),
        "score": round(score, 3)
    }
