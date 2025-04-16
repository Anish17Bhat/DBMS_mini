import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Styles/AddProperty.css'

function AddProperty() {
  const [form, setForm] = useState({
    title: '',
    location: '',
    description: '',
    price: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.price <= 0){
      alert('Price is invlaid');
      return
    }
    try {
      await api.post('/properties', form);
      alert('Property added successfully!');
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Error adding property:', err);
      alert('Failed to add property.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-property-form">
      <h2>Add Property</h2>
      <input type="text" name="title" placeholder="Title" required onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" required onChange={handleChange} />
      <textarea name="description" placeholder="Description" required onChange={handleChange}></textarea>
      <input type="number" name="price" placeholder="Price" required onChange={handleChange} />
      <button type="submit">Add Property</button>
    </form>
  );
}

export default AddProperty;
