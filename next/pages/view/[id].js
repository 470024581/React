import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Button, Alert, Spinner, ListGroup } from 'react-bootstrap';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function ViewItem() {
  const router = useRouter();
  const { id } = router.query;
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load item data
  useEffect(() => {
    // Only fetch data when id is available (after hydration)
    if (!id) return;
    
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/items/${id}`);
        setItem(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Failed to load item details, please try again later');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/items/${id}`);
        router.push('/');
      } catch (err) {
        setError('Failed to delete item, please try again later');
        console.error(err);
      }
    }
  };

  if (!id) {
    return (
      <Layout title="View Item | MERN CRUD App">
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout title="View Item | MERN CRUD App">
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="View Item | MERN CRUD App">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => router.push('/')}>Back to List</Button>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout title="View Item | MERN CRUD App">
        <Alert variant="warning">Item not found</Alert>
        <Button variant="primary" onClick={() => router.push('/')}>Back to List</Button>
      </Layout>
    );
  }

  return (
    <Layout title={`${item.title} | MERN CRUD App`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Item Details</h2>
        <Button variant="primary" onClick={() => router.push('/')}>Back to List</Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="fs-3 mb-3">{item.title}</Card.Title>
          
          <ListGroup variant="flush" className="mb-4">
            <ListGroup.Item>
              <strong>Category:</strong> {item.category || 'Not specified'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Status:</strong> {item.status}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Last Updated:</strong> {new Date(item.updatedAt).toLocaleString()}
            </ListGroup.Item>
          </ListGroup>
          
          <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-line' }}>
            {item.description}
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="d-flex gap-2">
        <Button variant="warning" as={Link} href={`/edit/${item._id}`}>Edit</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </Layout>
  );
}