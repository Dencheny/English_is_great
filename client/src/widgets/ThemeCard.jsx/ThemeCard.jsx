import React, { useState } from 'react';
import './ThemeCard.css';

export default function ThemeCard({ theme, deleteHandler, user }) {
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState(false);

  if (learned) return null;

  return (
    <div className="card-wrapper">
      <div
        className={`card-container ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`card ${flipped ? 'card-back' : 'card-front'} ${
            flipped ? 'opened' : ''
          }`}
        >
          <div className="card-content">
            <h2>{flipped ? theme.translation : theme.word}</h2>
            {flipped && (
              <button
                className="learned-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setLearned(true);
                  deleteHandler(theme.id);
                }}
              >
                Изучено
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
