import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Очистка токенов и редирект на страницу авторизации
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // Очистка куки
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    navigate("/login"); // Перенаправление на страницу логина
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Пожалуйста, войдите в систему.");
          return;
        }

        const response = await axios.get("http://localhost:8000/users/profile/", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUserData(response.data);
      } catch (error) {
        setError("Ошибка при получении профиля");
        console.error("Ошибка:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Личный кабинет</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData ? (
        <div>
          <p>ID: {userData.id}</p>
          <p>Телефон: {userData.phone_number}</p>
          {/* Кнопка "Выйти" */}
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default UserDashboard;
