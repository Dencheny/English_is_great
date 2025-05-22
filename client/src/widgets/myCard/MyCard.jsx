import React, { useState } from 'react';
import './MyCard.css';
import { useNavigate } from 'react-router-dom';

export default function MyCard({ myCards, deleteHandler, user }) {
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState(false);
    const navigate = useNavigate();

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
            <h2>{flipped ? myCards.translation : myCards.word}</h2>
            {flipped && (
              <>
                <button
                  className="learned-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLearned(true);
                    deleteHandler(myCards.id);
                  }}
                >
                  Удалить
                </button>
                <button onClick={() => navigate('/eddit')} >Изменить</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
