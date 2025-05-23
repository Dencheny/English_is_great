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

const [errors, setErrors] = useState({ english: '', russian: '', themeId: '', general: '' })

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
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    
      const { english, russian, themeId } = formData;

      // Проверка (можно дополнительно валидировать)
      if (!english || !russian) {
        alert('Заполните все поля');
        return;
      }

          // Добавление: Валидация полей
    let newErrors = { english: '', russian: '', themeId: '', general: '' };
    let isValid = true;

    // Проверка english: латинские буквы, пробелы, дефисы, апострофы
    if (!english) {
      newErrors.english = 'English word is required';
      isValid = false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(english)) {
      newErrors.english =
        'Введите слово на латинице';
      isValid = false;
    }

    // Проверка russian: кириллица, пробелы, дефисы
    if (!russian) {
      newErrors.russian = 'Russian word is required';
      isValid = false;
    } else if (!/^[а-яА-ЯёЁ\s-]+$/u.test(russian)) {
      newErrors.russian =
        'Ведите слово на кириллице';
      isValid = false;
    }

    // // Проверка themeId: должно быть выбрано и существовать
    // if (!themeId || !themes.some((theme) => theme.id === Number(themeId))) {
    //   newErrors.themeId = 'Please select a valid theme';
    //   isValid = false;
    // }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

try {
      const payload = {
        english,
        russian,
        themeId, // этот ID нужен для связи с темой
      };

      const res = await WordApi.updateWord(params?.id, payload);
      // navigate('/myWords');
      navigate('/myWords', { state: { showToast: true } });
      if (res.data) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 1000);
      }
      
      // alert('Слово успешно изменено:', res.data);

      // Очистить форму после создания
      setFormData({ english: '', russian: '', themeId: '' });
       setErrors({ english: '', russian: '', themeId: '', general: '' })
    } catch (error) {
      console.error(error);
      // setIsLoading(false);
      // ошибка срвак 
       setErrors({ ...newErrors, general: 'Failed to create word' });
    }
  };

  return (
    <>
      <div className='edit-word-page'>
        {showToast && (
          <div className='notification'>Слово успешно изменено!</div>
        )}

        <h1>РЕДАКТИРОВАНИЕ КАРТОЧКИ</h1>
        <form className='edit-word-form' onSubmit={handleSubmit}>
       {/* Поле english */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            name="english"
            type="text"
            placeholder="Слово на Английском"
            value={formData.english}
            onChange={handleChange}
            required
            style={{ borderColor: errors.english ? 'red' : '' }}
          />
          {/* Добавление: Ошибка под полем */}
          {errors.english && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.english}</p>
          )}
        </div>

        {/* Поле russian */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            name="russian"
            type="text"
            placeholder="Слово на Русском"
            value={formData.russian}
            onChange={handleChange}
            required
            style={{ borderColor: errors.russian ? 'red' : '' }}
          />
          {/* Добавление: Ошибка под полем */}
          {errors.russian && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.russian}</p>
          )}
        </div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant='standard' htmlFor='theme'></InputLabel>
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
