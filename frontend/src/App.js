// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu"; 
import AdminPage from "./pages/AdminPage"; 
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PostsPage from "./PostsPage";
import CartPage from "./pages/CartPage";
import FoodList from "./components/FoodList"; // Подключаем список еды
import Login from "./components/Login"; 
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Menu /> {/* Меню будет отображаться на всех страницах */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<FoodList />} /> {/* Добавили страницу с едой */}
      </Routes>
    </Router>
  );
}

export default App;



