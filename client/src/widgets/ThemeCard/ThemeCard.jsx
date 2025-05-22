import React, { useState, useEffect } from 'react';
import './ThemeCard.css';

export default function ThemeCard({ theme, deleteHandler }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpened, setIsOpened] = useState(() => {
    const saved = localStorage.getItem('openedCardsTheme');
    const openedIds = saved ? JSON.parse(saved) : [];
    return openedIds.includes(theme.id);
  });

  const [isLearned, setIsLearned] = useState(() => {
    const saved = localStorage.getItem('learnedCardsTheme');
    const learnedIds = saved ? JSON.parse(saved) : [];
    return learnedIds.includes(theme.id);
  });

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
    if (!isOpened) {
      const saved = localStorage.getItem('openedCardsTheme');
      const openedIds = saved ? JSON.parse(saved) : [];
      const updated = [...openedIds, theme.id];
      localStorage.setItem('openedCardsTheme', JSON.stringify(updated));
      setIsOpened(true);
    }
  };

  const handleLearned = (e) => {
    e.stopPropagation();
    const saved = localStorage.getItem('learnedCardsTheme');
    const learnedIds = saved ? JSON.parse(saved) : [];
    const updated = [...learnedIds, theme.id];
    localStorage.setItem('learnedCardsTheme', JSON.stringify(updated));
    setIsLearned(true);
    deleteHandler(theme.id);
  };

  if (isLearned) return null;

  return (
    <div className="card-container" onClick={handleFlip}>
      <div
        className={`card ${isFlipped ? 'flipped' : ''} ${
          isOpened ? 'opened' : ''
        }`}
      >
        <div className="card-face card-front">{theme.word}</div>
        <div className="card-face card-back">
          <div>{theme.translation}</div>
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
