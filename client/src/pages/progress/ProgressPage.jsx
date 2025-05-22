import React, { useEffect, useState } from 'react';
import Progress from '../../widgets/progress/Progress';
import './ThemeCardPage.css';

export default function ProgressPage() {
  const [themes, setThemes] = useState([
    { id: 1, themeName: 'Plane' },
    { id: 2, themeName: 'City' },
    { id: 3, themeName: 'World' },
    { id: 4, themeName: 'News' },
    { id: 5, themeName: 'Animals' },
    { id: 6, themeName: 'Name' },
    { id: 7, themeName: 'Famale' },
    { id: 8, themeName: 'Moralle' },
    { id: 9, themeName: 'Life' },
    { id: 10, themeName: 'Beach' },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // try {
    // WordApi.getAllTheme().then((res) => {
    //   setThemes(res.data.data);
    //   setIsLoading(false);
    // });
    // } catch (error) {
    // console.log(error);
    setIsLoading(false);
    // }
  }, []);

  const deleteHandler = async (id) => {
    // try {
    // const res = await WordApi.deleteCraft(id);
    // if (res.status === 204) {
    // setThemes((prev) => prev.filter((el) => el.id !== id));
    // }
    // } catch (error) {
    // console.log(error);
    // alert('Что-то пошло не так');
    // }
  };

  return (
    <div className="progress-page">
      <h1>ПРОГРЕСС</h1>
      <div className="card-grid">
        {isLoading && <h2>Загрузка...</h2>}
        {themes.length === 0 && !isLoading && <h2>Нет пока нет прогресса для показа</h2>}
        {themes.map((el) => (
          <Progress key={el.id} theme={el} deleteHandler={deleteHandler} />
        ))}
      </div>
    </div>
  );
}
