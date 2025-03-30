
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!phoneNumber.trim() || !password.trim()) {
      setError("Пожалуйста, заполните все поля.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/users/login/", {
        phone_number: phoneNumber,
        password: password,
      });

      // Сохранение токенов
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      console.log("Успешный вход. Токен:", response.data.access);

      // Перенаправление в личный кабинет
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || "Ошибка при входе.");
      } else if (error.request) {
        setError("Ошибка сети.");
      } else {
        setError("Произошла неизвестная ошибка.");
      }
      console.error("Ошибка при входе:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="phone_number">Телефон</label>
          <input
            type="text"
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default Login;
