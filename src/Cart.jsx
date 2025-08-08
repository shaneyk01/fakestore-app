// Cart.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Alert, Badge } from 'react-bootstrap';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  // Calculate total whenever cartItems change
  useEffect(() => {
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(totalAmount);
  }, [cartItems]);

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-4">
        <h1>Shopping Cart</h1>
        <Alert variant="info">
          Your cart is empty. <a href="/products">Continue shopping</a>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Shopping Cart</h1>
        <Badge bg="primary" className="fs-6">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </Badge>
      </div>

      <Row>
        <Col md={8}>
          {cartItems.map(item => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={3}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      style={{ width: '100%', height: '100px', objectFit: 'contain' }}
                    />
                  </Col>
                  <Col md={6}>
                    <Card.Title className="h5">{item.title}</Card.Title>
                    <Card.Text className="text-muted">
                      Category: {item.category}
                    </Card.Text>
                    <Card.Text>
                      <strong>${item.price}</strong>
                    </Card.Text>
                  </Col>
                  <Col md={3} className="text-end">
                    <div className="d-flex align-items-center justify-content-end mb-2">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="mb-2">
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                  Proceed to Checkout
                </Button>
                <Button variant="outline-secondary" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
