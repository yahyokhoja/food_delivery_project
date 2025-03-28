import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Хук для навигации

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      phone_number: phoneNumber,
      password,
    };

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/register/', userData, {
        headers: {
          'Content-Type': 'application/json', // Отправляем данные как JSON
        },
      });

      const { redirect_url } = response.data;

      // Перенаправляем на URL из ответа
      navigate(redirect_url);
    } catch (error) {
      setError('Ошибка при регистрации');
      console.error("There was an error registering:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="text"
        name="phone_number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Register;
