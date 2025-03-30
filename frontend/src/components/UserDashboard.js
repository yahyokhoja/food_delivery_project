import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");

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
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default UserDashboard;
