import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Card, Spinner, Alert } from 'react-bootstrap'
import { getAllItems, deleteItem } from '../services/api'

function ItemList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load all items
  const loadItems = async () => {
    try {
      setLoading(true)
      const data = await getAllItems()
      setItems(data)
      setError(null)
    } catch (err) {
      setError('Failed to load items list, please try again later')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Delete item
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id)
        // Reload the list
        loadItems()
      } catch (err) {
        setError('Failed to delete item, please try again later')
        console.error(err)
      }
    }
  }

  // Load data when component mounts
  useEffect(() => {
    loadItems()
  }, [])

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Items List</h2>
        <Button as={Link} to="/add" variant="primary">
          Add New Item
        </Button>
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
                      <Button
                        as={Link}
                        to={`/item/${item._id}`}
                        variant="info"
                        size="sm"
                        className="btn-action"
                      >
                        View
                      </Button>
                      <Button
                        as={Link}
                        to={`/edit/${item._id}`}
                        variant="warning"
                        size="sm"
                        className="btn-action"
                      >
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
    </div>
  )
}

export default ItemList