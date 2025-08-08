// Products.js
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Spinner, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Fetch products from FakeStore API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      // If exists, increase quantity
      existingItem.quantity += 1;
    } else {
      // If new, add to cart with quantity 1
      existingCart.push({ ...product, quantity: 1 });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success toast
    setToastMessage(`${product.title} added to cart!`);
    setShowToast(true);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h1>Products</h1>
      <Row>
        {products.map(product => (
          <Col md={6} lg={4} key={product.id} className="mb-4">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={product.image} 
                style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate">{product.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {product.description.substring(0, 100)}...
                </Card.Text>
                <Card.Text>
                  <strong>${product.price}</strong>
                </Card.Text>
                <div className="d-grid gap-2">
                  <Button as={Link} to={`/products/${product.id}`} variant="primary">
                    View Details
                  </Button>
                  <Button 
                    variant="success" 
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toast notification for cart actions */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          bg="success"
        >
          <Toast.Body className="text-white">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Products;
