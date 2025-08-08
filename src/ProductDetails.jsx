import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Modal,
  Toast,
  ToastContainer,
} from 'react-bootstrap';

function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // For redirecting after delete
  const [product, setProduct] = useState(null); // Holds product data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks fetch errors
  const [updateMessage, setUpdateMessage] = useState(''); // Message after update
  const [deleteMessage, setDeleteMessage] = useState(''); // Message after delete
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Controls modal visibility
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch product data on mount
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setUpdateMessage('Product updated successfully!');
      } else {
        setUpdateMessage('Failed to update product.');
      }
    } catch {
      setUpdateMessage('Error updating product.');
    }
  };

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setToastMessage(`${product.title} added to cart!`);
    setShowToast(true);
  };

  // Handle product deletion
  const handleDelete = async () => {
    setShowDeleteModal(false); // Close modal
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeleteMessage('Product deleted successfully!');
        setTimeout(() => navigate('/products'), 1500); // Redirect after delay
      } else {
        setDeleteMessage('Failed to delete product.');
      }
    } catch {
      setDeleteMessage('Error deleting product.');
    }
  };

  // Loading state
  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return <p>Product not found</p>;

  return (
    <Container className="mt-4">
      <Card className="mb-4">
        <Card.Img
          src={product.image}
          alt={product.title}
          style={{ height: '300px', objectFit: 'contain' }}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
          <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
          <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
          <div className="mt-3">
            <Button 
              variant="success" 
              size="lg" 
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart - ${product.price}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Update Form */}
      <h4>Update Product</h4>
      {updateMessage && <Alert variant="info">{updateMessage}</Alert>}
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={3}
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">Update Product</Button>
      </Form>

      {/* Delete Button */}
      <div className="mt-4">
        {deleteMessage && <Alert variant="danger">{deleteMessage}</Alert>}
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          Delete Product
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete "<strong>{product.title}</strong>"?</p>
          <p className="text-muted">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>

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
    </Container>
  );
}

export default ProductDetails;
