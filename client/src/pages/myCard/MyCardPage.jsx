import React, { useCallback } from 'react';
import MyCard from '../../widgets/myCard/MyCard';
import { useEffect, useState } from 'react';
// import WordApi from "../../entities/word/api/WordApi";
import { useNavigate } from 'react-router-dom';
import './MyCardPage.css';
import WordApi from '../../entities/user/api/wordApi';


export default function MyCardPage() {
  const [myCards, setMyCards] = useState([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const fetchCads = useCallback(async () => {
    setIsLoading(true);
    try {
      WordApi.getAllWordsByUser().then((res) => {
        setMyCards(res.data.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {

      fetchCads();

  }, [fetchCads]);

  const deleteHandler = async (id) => {
    const fetchData = async () => {
      try {
        // console.log('id', id, 'data', word)
        // console.log(id)
        await WordApi.deleteWord(id);
        fetchCads();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  };

  return (
    <div className='my-cards-page'>
      <h1>МОИ КАРТОЧКИ</h1>
      <button onClick={() => navigate('/createWord')}>Добавить</button>
      <div className='card-grid'>
        {isLoading && <h2>Загрузка...</h2>}
        {myCards.length === 0 && !isLoading && (
          <h2>
            Нет карточек для показа, создай{' '}
            <button onClick={() => navigate('/createWord')}>
              свою первую карточку
            </button>
          </h2>
        )}
        {myCards.map((el) => (
          <MyCard key={el.id} myCards={el} deleteHandler={deleteHandler} />
        ))}
      </div>
    </div>
  );
}
