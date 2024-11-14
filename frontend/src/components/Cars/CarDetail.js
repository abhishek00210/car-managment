import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Cars.css';

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const response = await api.get(`/cars/${id}`);
      setCar(response.data);
    } catch (error) {
      console.error('Error fetching car:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cars/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (!car) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">{car.title}</h2>
        <p style={{ marginBottom: '16px' }}>{car.description}</p>
        <div className="image-grid">
          {car.images.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image.url} alt={`Car ${index + 1}`} />
            </div>
          ))}
        </div>
        <p style={{ marginBottom: '16px' }}>Tags: {car.tags.join(', ')}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button 
            onClick={() => navigate(`/cars/${id}/edit`)}
            className="button"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="button button-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;