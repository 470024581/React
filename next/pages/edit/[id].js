import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Load item data
  useEffect(() => {
    // Only fetch data when id is available (after hydration)
    if (!id) return;
    
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/items/${id}`);
        setFormData(response.data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.put(`/api/items/${id}`, formData);
      router.push(`/view/${id}`);
    } catch (err) {
      setError('Failed to update item, please try again later');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!id || loading) {
    return (
      <Layout title="Edit Item | MERN CRUD App">
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Item | MERN CRUD App">
      <h2 className="page-title mb-4">Edit Item</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter detailed description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                placeholder="Enter category (optional)"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={() => router.back()}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
}