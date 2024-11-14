import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import CarSearch from './CarSearch';
import './Cars.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // Redirect to login if token is not present
      navigate('/login');
    } else {
      fetchCars();
    }
  }, [token, navigate]);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/cars', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      navigate('/login'); // Redirect if there is an error (like unauthorized access)
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/cars/search?keyword=${keyword}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error searching cars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">My Cars</h2>
        <div style={{ marginBottom: '16px' }}>
          <CarSearch onSearch={handleSearch} />
        </div>
        <Link to="/cars/new">
          <button className="button" style={{ marginBottom: '16px' }}>Add New Car</button>
        </Link>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="car-grid">
            {cars.map((car) => (
              <div key={car._id} className="car-item">
                <Link to={`/cars/${car._id}`}>
                  <div className="car-item-image">
                    <img src={car.images[0]?.url} alt={car.title} />
                  </div>
                  <div className="car-item-title">{car.title}</div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;
