// src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Используем useNavigate вместо Redirect

  // Получение данных пользователя из API
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login'); // Перенаправление на страницу входа
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Ошибка загрузки данных');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Если данные пользователя еще загружаются
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если произошла ошибка при загрузке
  if (error) {
    return <div>{error}</div>;
  }

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    localStorage.removeItem('access_token');  // Удаляем токен
    navigate('/login');  // Перенаправляем на страницу входа
  };

  return (
    <div className="user-dashboard">
      <h1>Добро пожаловать, {user.username}!</h1>
      <p>Номер телефона: {user.phone_number}</p>
      {/* Здесь можно добавить другие данные пользователя, например, историю заказов */}
      <button onClick={() => navigate("/settings")}>Настройки профиля</button>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default UserDashboard;
