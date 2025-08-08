// Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg"> {/* Dark theme, responsive */}
      <Container>
        <Navbar.Brand as={Link} to="/">FakeStore</Navbar.Brand> {/* Logo links to Home */}
        <Navbar.Toggle aria-controls="navbar-nav" /> {/* Hamburger menu for mobile */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Product Listing</Nav.Link>
            <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
