// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null); // Для обработки ошибок
  const [loading, setLoading] = useState(false); // Для состояния загрузки
  const [isPhoneValid, setIsPhoneValid] = useState(true); // Для валидации телефона

  // Регулярное выражение для проверки номера телефона (пример для формата +7XXX-XXX-XXXX)
  const phoneRegExp = /^[+]?[992][0-9]{10}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneRegExp.test(phoneNumber)) {
      setIsPhoneValid(false);
      return; // Прерываем выполнение, если номер телефона не валиден
    }

    setLoading(true); // Включаем индикатор загрузки
    setError(null); // Очищаем ошибки перед новым запросом

    try {
      // Отправляем номер телефона на сервер
      const response = await axios.post('http://localhost:8000/api/login/', { phone_number: phoneNumber });

      // Логика, если запрос успешен
      console.log('Response:', response.data);
      // Например, можно перенаправить на другую страницу:
      // history.push('/dashboard');
    } catch (err) {
      // Обрабатываем ошибки
      setError('Ошибка при авторизации');
      console.error('Error:', err);
    } finally {
      setLoading(false); // Останавливаем индикатор загрузки
    }
  };

  return (
    <div>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Номер телефона"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setIsPhoneValid(true); // Сбрасываем ошибку при изменении телефона
          }}
        />
        {!isPhoneValid && <p style={{ color: 'red' }}>Неверный формат номера телефона</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Авторизоваться'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Показ ошибки */}
    </div>
  );
};

export default Login;
