// Layout.js
import React from 'react';
import { Container, Navbar, Nav, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  // Get cart count for badge
  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
            🛒 FakeStore
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/products" className="mx-2">
                📦 Products
              </Nav.Link>
              <Nav.Link as={Link} to="/add-product" className="mx-2">
                ➕ Add Product
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/cart" className="position-relative">
                🛍️ Cart
                {getCartCount() > 0 && (
                  <Badge 
                    bg="danger" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.6em' }}
                  >
                    {getCartCount()}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <div className="flex-fill">
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              {children} {/* This renders whatever page content is passed in */}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-4 mt-auto">
        <Container>
          <p className="mb-2">🛒 <strong>FakeStore</strong> - Your Ultimate Shopping Destination</p>
          <small>&copy; {new Date().getFullYear()} FakeStore. All rights reserved. | Built with ❤️ and React</small>
        </Container>
      </footer>
    </div>
  );
}

export default Layout;
