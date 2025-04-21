import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Table, Button, Card, Spinner, Alert } from 'react-bootstrap';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all items
  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/items');
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load items list, please try again later');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/items/${id}`);
        // Reload the list
        loadItems();
      } catch (err) {
        setError('Failed to delete item, please try again later');
        console.error(err);
      }
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadItems();
  }, []);

  if (loading) {
    return (
      <Layout title="Items List | MERN CRUD App">
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Items List | MERN CRUD App">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Items List</h2>
        <Button variant="primary" as={Link} href="/add">Add New Item</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          {items.length === 0 ? (
            <Alert variant="info">No items yet, please add new items</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.description.substring(0, 50)}...</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>
                      <Button variant="info" size="sm" className="btn-action" as={Link} href={`/view/${item._id}`}>
                        View
                      </Button>
                      <Button variant="warning" size="sm" className="btn-action" as={Link} href={`/edit/${item._id}`}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Layout>
  );
}