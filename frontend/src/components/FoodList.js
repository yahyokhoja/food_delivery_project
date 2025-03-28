// src/components/FoodList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FoodList.css'; // Подключаем стили

const FoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Запрос к API для получения списка блюд
    axios.get('http://localhost:8000/api/food-items/')
      .then((response) => {
        setFoodItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Ошибка загрузки данных');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (foodItems.length === 0) return <div>Нет доступных блюд</div>;

  return (
    <div>
      <h1>Меню</h1>
      <div className="food-list">
        {foodItems.map((food) => (
          <div key={food.id} className="food-item">
            <img
              src={`http://localhost:8000${food.image}`}
              alt={food.name}
              className="food-image"
            />
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <p>{food.price}₽</p>
            <button>Добавить в корзину</button> {/* Кнопка для добавления в корзину */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
