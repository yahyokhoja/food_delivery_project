import React from "react";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import "./Menu.css";


const Menu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">🍕 Доставка</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Главная</Nav.Link>
            <Nav.Link href="#">О нас</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="secondary">Категории</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Шашлык</Dropdown.Item>
                <Dropdown.Item href="#">Пицца</Dropdown.Item>
                <Dropdown.Item href="#">Напитки</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Button variant="outline-light">🛒 Корзина</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;