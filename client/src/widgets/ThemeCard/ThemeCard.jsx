import React, { useState, useEffect } from 'react';
import './ThemeCard.css';

export default function ThemeCard({ word, deleteHandler }) {

  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpened, setIsOpened] = useState(() => {
    const saved = localStorage.getItem('openedCardsword');
    const openedIds = saved ? JSON.parse(saved) : [];
    return openedIds.includes(word.id);
  });

  const [isLearned, setIsLearned] = useState(() => {
    const saved = localStorage.getItem('learnedCardsword');
    const learnedIds = saved ? JSON.parse(saved) : [];
    return learnedIds.includes(word.id);
  });

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
    if (!isOpened) {
      const saved = localStorage.getItem('openedCardsword');
      const openedIds = saved ? JSON.parse(saved) : [];
      const updated = [...openedIds, word.id];
      localStorage.setItem('openedCardsword', JSON.stringify(updated));
      setIsOpened(true);
    }
  };

  const handleLearned = (e) => {
    e.stopPropagation();
    const saved = localStorage.getItem('learnedCardsword');
    const learnedIds = saved ? JSON.parse(saved) : [];
    const updated = [...learnedIds, word.id];
    localStorage.setItem('learnedCardsword', JSON.stringify(updated));
    setIsLearned(true);
    deleteHandler(word.id, word);
  };

  if (isLearned) return null;

  return (
    <div className="card-container" onClick={handleFlip}>
      <div
        className={`card ${isFlipped ? 'flipped' : ''} ${
          isOpened ? 'opened' : ''
        }`}
      >
        <div className="card-face card-front">{word.english}</div>
        <div className="card-face card-back">
          <div>{word.russian}</div>
          <div className="button-group">
            <button className="button-complete" onClick={handleLearned}>
              Изучено
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
