// src/components/Cart.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Cart = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Корзина пользователя</h2>
          <p>Здесь будет список товаров в корзине.</p>
          {/* Логика отображения корзины будет добавлена сюда */}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
