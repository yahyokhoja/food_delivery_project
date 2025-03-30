// src/components/Menu.js
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Импортируем Link для навигации
import "./Menu.css";

const Menu = () => {
  const handleAdminRedirect = () => {
    // Редирект на внешний URL (админка Django) без перезагрузки
    window.location.href = "http://localhost:8000/admin";
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">🍕 Доставка</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/about">О нас</Nav.Link>

            {/* Ссылка на админку Django без перезагрузки */}
            <Nav.Link onClick={handleAdminRedirect}>Админка</Nav.Link>

            {/* Ссылка на меню */}
            <Nav.Link as={Link} to="/menu">Меню</Nav.Link>

            {/* Ссылки на регистрацию и авторизацию */}
            <Nav.Link as={Link} to="/login">Авторизация</Nav.Link>
            <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
          </Nav>

          {/* Ссылка на корзину */}
          <Button variant="outline-light" as={Link} to="/cart">🛒 Корзина</Button> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
