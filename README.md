# README for Local Setup of Movie Review Sentiment Analysis Application

## Implementation Approach
This project is a full-stack application that analyzes the sentiment of movie reviews using a FastAPI backend and a React frontend. I implemented the following:

- **Backend:**  
  - Built using FastAPI with the Hugging Face Transformers library for sentiment analysis.
  - Exposes an endpoint (`/analyze`) that classifies reviews into positive, negative, or neutral.
  - Containerized with Docker using a dedicated Dockerfile.

- **Frontend:**  
  - Developed using React to provide a user-friendly interface for submitting reviews and displaying results.
  - Uses Axios to send review data to the backend and display the sentiment results.
  - Containerized with a multi-stage Dockerfile which builds the React app and serves it with NGINX.

- **Containerization:**  
  - Both the frontend and backend are containerized, ensuring a consistent environment across development machines.
  - Docker Compose is used to orchestrate the multi-container setup.
 
### Prerequisites
- **Python 3.10+** (for the backend)
- **Node.js and npm** (for the frontend)
- **Git** to clone the repository

#### Local Setup Instructions

1. **Clone the Repository**  
   Open your terminal and run:
   ```bash
   git clone https://github.com/sugguandmuggu/movie-review-sentiment.git
   cd movie-review-sentiment
   ```
## 2. Setup and Run the Backend (FastAPI)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. Install the Python dependencies:
   
   (Tip) Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  #For macOS
   ```
   Command to install the python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server(locally):
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```
5. Testing the Backend API:
   Use this curl to test the /analyze endpoint:
   ```bash
   curl -X POST "http://127.0.0.1:8000/analyze" \
     -H "Content-Type: application/json" \
     -d '{"text": "This movie was fantastic and visually stunning!"}'
   ```
## 3. Setup and Run the Frontend (React)

1. Open a new terminal window/tab and navigate to the frontend directory:
   ```bash
   cd movie-review-sentiment/frontend
   ```
2. Install the Node.js dependencies:
   ```bash
   npm install
   ```
3. Create a file named .env in the frontend directory with the following content:
   ```bash
   REACT_APP_API_URL=http://127.0.0.1:8000
   ```
   This environment variable tells the React app where to send its API requests.
4. Start the React development server:
   ```bash
   npm start
   ```
   The React app will typically open in your default web browser at:
   http://localhost:3000

## 4. Using the Application
Frontend:
Access the application at http://localhost:3000.
You can enter a movie review in the provided text area and click the "Analyze" button to see the review's sentiment and confidence score.
Any review submissions will also be logged in a review history on the UI.

Backend API:
The backend service listens on port 8000. All sentiment analysis requests from the React app are sent to http://127.0.0.1:8000/analyze.

