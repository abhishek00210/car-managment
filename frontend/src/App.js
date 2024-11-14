import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CarList from './components/Cars/CarList';
import CarDetail from './components/Cars/CarDetail';
import CarForm from './components/Cars/CarForm';

function App() {
  return (
    <Router>  {/* Wrap Router around everything */}
      <AuthProvider> {/* AuthProvider inside Router */}
        <Navbar />
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars/new" element={<CarForm />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/cars/:id/edit" element={<CarForm />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
