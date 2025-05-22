import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ThemeName from '../../widgets/themeName/ThemeName';

export default function ThemeNamePage() {
  const [themeNames, setThemeNames] = useState([
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
    //   setThemeNames(res.data.data);
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
    // setThemeNames((prev) => prev.filter((el) => el.id !== id));
    // }
    // } catch (error) {
    // console.log(error);
    // alert('Что-то пошло не так');
    // }
  };
  return (
    <div className="theme-page">
      <h1 className="theme-page-title">ВЫБЕРИ ТЕМУ</h1>
      <div className="card-grid">
        {isLoading && <h2>Загрузка...</h2>}
        {themeNames.length === 0 && !isLoading && (
          <h2>Тем пока нет для показа</h2>
        )}
        {themeNames.map((el) => (
          <ThemeName
            key={el.id}
            themeNames={el}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
    </div>
  );
}
