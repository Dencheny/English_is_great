import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate, useParams } from 'react-router-dom';
import ThemeApi from '../../entities/user/api/themeApi';
import WordApi from '../../entities/user/api/wordApi';

export default function EdditForm() {
  const navigate = useNavigate();
  const [themes, setThemeNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    english: '',
    russian: '',
    themeId: '', // id выбранной темы
  });
  const [showToast, setShowToast] = useState(false);
  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    try {
      ThemeApi.getAllThemes().then((res) => {
        setThemeNames(res.data.data);
        setIsLoading(false);
      });
      WordApi.getWordsUserById(params?.id)
        .then((res) => res.data.data)
        .then((word) => {
          const { english, russian, themeId } = word;
          setFormData({ english, russian, themeId });
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [params?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    try {
      const { english, russian, themeId } = formData;

      // Проверка (можно дополнительно валидировать)
      if (!english || !russian) {
        alert('Заполните все поля');
        return;
      }

      const payload = {
        english,
        russian,
        themeId, // этот ID нужен для связи с темой
      };

      const res = await WordApi.updateWord(params?.id, payload);
      // navigate('/myWords');
      if (res.data) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 1000);
      }
      // alert('Слово успешно изменено:', res.data);

      // Очистить форму после создания
      setFormData({ english: '', russian: '', themeId: '' });
    } catch (error) {
      console.error(error);
      // setIsLoading(false);
    }
  };

  return (
    <>
      <div className='edit-word-page'>
        {showToast && <div className='notification'>Слово успешно изменено!</div>}
        <h1>РЕДАКТИРОВАНИЕ КАРТОЧКИ</h1>
        <form className='edit-word-form' onSubmit={handleSubmit}>
          <input
            name='english'
            type='text'
            placeholder='Слово на Английском'
            value={formData.english}
            onChange={handleChange}
            required
          />
          <input
            name='russian'
            type='text'
            placeholder='Слово на Русском'
            value={formData.russian}
            onChange={handleChange}
            required
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant='standard' htmlFor='theme'>
              </InputLabel>
              <NativeSelect
                name='themeId'
                value={formData.themeId}
                onChange={handleChange}
                inputProps={{
                  id: 'theme',
                }}
                required
              >
                {themes.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.themeName}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Box>
          <button type='submit'>Подтвердить</button>
        </form>
      </div>
    </>
  );
}
