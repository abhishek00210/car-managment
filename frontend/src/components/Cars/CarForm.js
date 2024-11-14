import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

import './Cars.css';

const CarForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchCar();
    }
  }, [id]);

  const fetchCar = async () => {
    try {
      const response = await api.get(`/cars/${id}`);
      const car = response.data;
      setTitle(car.title);
      setDescription(car.description);
      setTags(car.tags.join(', ')); // If your tags are in an array, convert them to a string.
    } catch (error) {
      console.error('Error fetching car:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags.split(',').map(tag => tag.trim()))); // Send tags as JSON array
  
    // Add images to FormData
    if (images.length > 0) {
      images.forEach((image) => formData.append('images', image));
    }
    console.log('Form data before submission:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name} (${value.type})`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    // Log all form data for inspection
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  

    try {
      console.log('ID:', id); 
      let response;
      if (id && id.trim()) {
        response = await api.patch(`/cars/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await api.post('/cars', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      console.log('Server response:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error saving car:', error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">{id ? 'Edit Car' : 'Add New Car'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="images">Images</label>
            <input
              id="images"
              type="file"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="button"
            style={{ width: '100%' }}
          >
            {isSubmitting ? 'Submitting...' : (id ? 'Update' : 'Create')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
