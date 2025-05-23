import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
// import WordApi from "../../entities/word/api/WordApi";
import { useNavigate, useParams } from 'react-router-dom';
// import './MyCardPage.css';
import ThemeCard from '../../widgets/ThemeCard/ThemeCard';
import WordApi from '../../entities/user/api/wordApi';
import LearnWordApi from '../../entities/user/api/LearnWord';

export default function ThemeCardPage() {
  const [cards, setCards] = useState([]);
  const params = useParams();

  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpened, setIsOpened] = useState(() => {
    const saved = localStorage.getItem('openedCards');
    const openedIds = saved ? JSON.parse(saved) : [];
    return openedIds.includes(cards.id);
  });

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);

    if (!isOpened) {
      const saved = localStorage.getItem('openedCards');
      const openedIds = saved ? JSON.parse(saved) : [];
      const updated = [...openedIds, cards.id];
      localStorage.setItem('openedCards', JSON.stringify(updated));
      setIsOpened(true);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const fetchCads = useCallback(async () => {
    setIsLoading(true);
    if (!params?.id) return;
    try {
      WordApi.getUnlearnedWordsByOneTheme(params?.id).then((res) => {
        setCards(res.data.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [params?.id]);

  useEffect(() => {
    fetchCads();
  }, [fetchCads]);

  const deleteHandler = async (id, word) => {
    const fetchData = async () => {
      try {
        // console.log('id', id, 'data', word)
        await LearnWordApi.createLearnWord(id, word);
        fetchCads();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  };

  return (
    <div className="my-cards-page">
      <h1>ВЫБЕРИ КАРТОЧКУ</h1>
      <div className="card-grid">
        {isLoading && <h2>Загрузка...</h2>}
        {cards.length === 0 && !isLoading && (
          <h2>
            Нет карточек для показа, создай{' '}
            <button onClick={() => navigate('/createWord')}>
              свою первую карточку
            </button>
          </h2>
        )}
        {cards.map((el) => (
          <ThemeCard
            key={el.id}
            word={el}
            deleteHandler={deleteHandler}
            setCards={setCards}
          />
        ))}
      </div>
    </div>
  );
}
