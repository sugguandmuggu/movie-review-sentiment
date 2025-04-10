# Base image: Lightweight Python image
FROM python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Copy dependency definitions
COPY requirements.txt .

# Install Python dependencies (keep image size small by not caching)
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your backend code into the container
COPY . .

# Expose port 8000 (this is what our FastAPI server will listen on)
EXPOSE 8000

# Start the FastAPI app using uvicorn; make sure it listens on 0.0.0.0 so external requests work
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
