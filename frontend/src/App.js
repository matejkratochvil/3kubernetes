import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTotalRatings();
  }, []);

  const generateDummy = async () => {
    const response = await fetch('http://localhost:5000/generateDummy');
    await response.json();
  };

  const fetchQuote = async () => {
    const response = await fetch('http://localhost:5000/returnQuote');
    const data = await response.json();
    setQuote(data);
    setShowModal(true);
  };

  const fetchTotalRatings = async () => {
    const response = await fetch('http://localhost:5000/returnTotalRatings');
    const data = await response.json();
    setTotalLikes(data.totalLikes);
    setTotalDislikes(data.totalDislikes);
  };

  const rateQuote = async (rating) => {
    await fetch('http://localhost:5000/updateQuote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: quote._id, rating }),
    });
    setShowModal(false);
    fetchTotalRatings();
  };

  return (
    <div className="App">
      <h1>Quotes Application</h1>
      <button onClick={generateDummy}>Generate 10 dummy quotes</button>
      <hr></hr>
      <button onClick={fetchQuote}>Get Quote</button>
      <div>
        <span>Total Likes: {totalLikes}</span>
        <span>Total Dislikes: {totalDislikes}</span>
      </div>

      {showModal && quote && (
        <div className="modal">
          <h2>{quote.quote}</h2>
          <p>{quote.author} ({quote.year}) - {quote.occasion}</p>
          <button onClick={() => rateQuote('liked')}>👍</button>
          <button onClick={() => rateQuote('disliked')}>👎</button>
        </div>
      )}
    </div>
  );
}

export default App;
