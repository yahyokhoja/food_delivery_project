import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/foods/");  // Исправленный путь

        setFoodItems(response.data);
      } catch (error) {
        setError("Ошибка загрузки списка блюд.");
        console.error("Ошибка:", error);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <div>
      <h1>Меню</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.price} руб.</p>
            </div>
          ))
        ) : (
          <p>Загрузка...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
