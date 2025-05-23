import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ThemeApi from '../../entities/user/api/themeApi';
import WordApi from '../../entities/user/api/wordApi';
// import WordApi from '../../entities/user/api/wordApi';

export default function CreateCardForm() {
  const [themes, setThemeNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    english: '',
    russian: '',
    themeId: '', // id выбранной темы
  });

  useEffect(() => {
    setIsLoading(true);
    try {
      ThemeApi.getAllThemes().then((res) => {
        console.log('tesst', res.data.data);
        setThemeNames(res.data.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        themeId:themeId || 1, // этот ID нужен для связи с темой
      };

      const res = await WordApi.createWord(payload);
      console.log(res)
      console.log('Слово успешно создано:', res.data);

      // Очистить форму после создания
      setFormData({ english: '', russian: '', themeId: '' });
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className='create-word-page'>
      <h1>ДОБАВИТЬ СВОЁ СЛОВО</h1>
      <form className='create-word-form' onSubmit={handleSubmit}>
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
              defaultValue={formData.themeId}
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
  );
}
