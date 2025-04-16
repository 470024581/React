import axios from 'axios';

// API Base URL
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all items
export const getAllItems = async () => {
  try {
    const response = await api.get('/items');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch items list:', error);
    throw error;
  }
};

// Get single item details
export const getItemById = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch item ID:${id}:`, error);
    throw error;
  }
};

// Create new item
export const createItem = async (itemData) => {
  try {
    const response = await api.post('/items', itemData);
    return response.data;
  } catch (error) {
    console.error('Failed to create item:', error);
    throw error;
  }
};

// Update item
export const updateItem = async (id, itemData) => {
  try {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update item ID:${id}:`, error);
    throw error;
  }
};

// Delete item
export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete item ID:${id}:`, error);
    throw error;
  }
};