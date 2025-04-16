import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Button, Badge, Spinner, Alert } from 'react-bootstrap'
import { getItemById, deleteItem } from '../services/api'

function ItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemById(id)
        setItem(data)
        setError(null)
      } catch (err) {
        setError('Failed to load item details, please try again later')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  // Handle deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id)
        navigate('/')
      } catch (err) {
        setError('Failed to delete item, please try again later')
        console.error(err)
      }
    }
  }

  // Get Badge style for status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>
      case 'inactive':
        return <Badge bg="secondary">Inactive</Badge>
      case 'draft':
        return <Badge bg="warning">Draft</Badge>
      default:
        return <Badge bg="info">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  if (!item) {
    return <Alert variant="warning">Item not found</Alert>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Item Details</h2>
        <div>
          <Button 
            as={Link} 
            to={`/edit/${id}`} 
            variant="warning"
            className="me-2"
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <Card.Body>
          <Card.Title className="fs-3 mb-3">{item.title}</Card.Title>
          
          <div className="mb-3">
            {getStatusBadge(item.status)}
            {item.category && (
              <Badge bg="info" className="ms-2">{item.category}</Badge>
            )}
          </div>
          
          <Card.Text className="mb-4 item-description">
            {item.description}
          </Card.Text>
          
          <div className="text-muted">
            <small>Created: {new Date(item.createdAt).toLocaleString()}</small>
            <br />
            <small>Updated: {new Date(item.updatedAt).toLocaleString()}</small>
          </div>
        </Card.Body>
      </Card>

      <div className="mt-3">
        <Button 
          variant="secondary" 
          onClick={() => navigate('/')}
        >
          Back to List
        </Button>
      </div>
    </div>
  )
}

export default ItemDetail