// Home.js
import React from 'react'; // Import React to define a component
import { Link } from 'react-router-dom'; // Link lets us navigate without reloading
import { Container, Button, Row, Col, Card } from 'react-bootstrap'; // Bootstrap layout and button

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-5">
        <div className="bg-gradient p-5 rounded-3 mb-4" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <h1 className="display-4 fw-bold mb-3">🛒 Welcome to FakeStore</h1>
          <p className="lead mb-4">
            Discover amazing products with our modern shopping experience powered by the FakeStoreAPI
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button 
              as={Link} 
              to="/products" 
              variant="light" 
              size="lg"
              className="px-4 py-2"
            >
              🛍️ Browse Products
            </Button>
            <Button 
              as={Link} 
              to="/add-product" 
              variant="outline-light" 
              size="lg"
              className="px-4 py-2"
            >
              ➕ Add New Product
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="mb-3" style={{ fontSize: '3rem' }}>📦</div>
              <Card.Title>Browse Products</Card.Title>
              <Card.Text className="text-muted">
                Explore our vast collection of products from electronics to fashion
              </Card.Text>
              <Button as={Link} to="/products" variant="primary">
                View All Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="mb-3" style={{ fontSize: '3rem' }}>🛍️</div>
              <Card.Title>Shopping Cart</Card.Title>
              <Card.Text className="text-muted">
                Add products to your cart and manage your shopping experience
              </Card.Text>
              <Button as={Link} to="/cart" variant="success">
                Go to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="mb-3" style={{ fontSize: '3rem' }}>➕</div>
              <Card.Title>Add Products</Card.Title>
              <Card.Text className="text-muted">
                Contribute to our store by adding your own products to the catalog
              </Card.Text>
              <Button as={Link} to="/add-product" variant="warning">
                Add Product
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stats Section */}
      <div className="bg-light rounded-3 p-4 text-center">
        <Row>
          <Col md={4}>
            <h3 className="text-primary">20+</h3>
            <p className="text-muted mb-0">Products Available</p>
          </Col>
          <Col md={4}>
            <h3 className="text-success">4</h3>
            <p className="text-muted mb-0">Categories</p>
          </Col>
          <Col md={4}>
            <h3 className="text-warning">⭐</h3>
            <p className="text-muted mb-0">Quality Products</p>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home; // Makes this component usable in other files
