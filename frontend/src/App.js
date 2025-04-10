import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('reviewHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const REVIEWS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(history.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = history.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  
  
  useEffect(() => {
    localStorage.setItem('reviewHistory', JSON.stringify(history));
  }, [history]);
  


  const handleAnalyze = async () => {
    if (!review.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/analyze`, { text: review });
      setResult(response.data);
      // Add to history
      setHistory((prev) => [
        {
          text: review,
          sentiment: response.data.sentiment,
          score: response.data.score,
        },
        ...prev,
      ]);

      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      alert("Oops! Something went wrong.");
    }
    setLoading(false);
  };

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '😄';
      case 'negative':
        return '😞';
      case 'neutral':
        return '😐';
      default:
        return '🤔';
    }
  };
  
  

  return (
    <div className="container">
      <h1>Analyze sentiment</h1>
      <p className="subheading">Detect the general sentiment expressed in a movie review using LLM as NLP classifier.</p>

      <textarea
        placeholder="Type or paste your movie review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {result && (
        <div className="result-box">
          <p>
            This seems like a <strong>{result.sentiment}</strong> review. {getSentimentEmoji(result.sentiment)}
          </p>
          <p>
            <strong>Sentiment Score:</strong> {(result.score * 100).toFixed(1)}% {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}.
          </p>
        </div>
      )}

      {history.length > 0 && (
        <button onClick={() => setHistory([])} style={{ marginTop: '1rem' }}>
          Clear History
        </button>
      )}

      <ul>
        {currentReviews.map((item, index) => (
          <li key={startIndex + index}>
            <p><strong>Review:</strong> {item.text}</p>
            <p><strong>Sentiment:</strong> {item.sentiment} — <strong>Score:</strong> {(item.score * 100).toFixed(1)}%</p>
            <hr />
          </li>
        ))}
      </ul>


      {history.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span style={{ margin: '0 1rem' }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}



    </div>
  );
}

export default App;
