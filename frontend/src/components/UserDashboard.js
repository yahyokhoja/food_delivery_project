import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ setIsAuthenticated }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log("Access Token:", token);
        
        if (!token) {
          setError("Необходимо войти в систему.");
          setIsAuthenticated(false);
          navigate("/login");
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
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate, setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div>
      <h2>Личный кабинет</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData ? (
        <div>
          <p>Имя: {userData.name}</p>
          <p>Телефон: {userData.phone_number}</p>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default UserDashboard;
