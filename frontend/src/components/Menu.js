import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = ({ isAuthenticated }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">🍕 Доставка</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/about">О нас</Nav.Link>
           

            {/* Корзина доступна только авторизованным пользователям */}
            {isAuthenticated && <Nav.Link as={Link} to="/cart">Корзина</Nav.Link>}

            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login">Авторизация</Nav.Link>
                <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/dashboard">Личный кабинет</Nav.Link>
                <Nav.Link href="http://localhost:8000/admin" target="_blank">Админка</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
