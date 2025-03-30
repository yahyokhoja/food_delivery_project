
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumberOrName, setPhoneNumberOrName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!phoneNumberOrName.trim() || !password.trim()) {
      setError('Пожалуйста, заполните все поля.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users/login/', {
        phone_number_or_name: phoneNumberOrName,
        password: password,
      });

      // Сохранение токенов в localStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      console.log('Успешный вход. Токен:', response.data.access);

      // Перенаправление в личный кабинет
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || 'Ошибка при входе. Проверьте введенные данные.');
      } else if (error.request) {
        setError('Ошибка сети. Проверьте подключение к интернету.');
      } else {
        setError('Произошла неизвестная ошибка.');
      }
      console.error('Ошибка при входе:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="phone_number_or_name">Телефон или Имя</label>
          <input
            type="text"
            id="phone_number_or_name"
            value={phoneNumberOrName}
            onChange={(e) => setPhoneNumberOrName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};



const loginUser = async (phoneNumber, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', {
      phone_number: phoneNumber,
      password: password,
    });
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Ошибка при входе:', error.response ? error.response.data : error.message);
  }
};




export default Login;

