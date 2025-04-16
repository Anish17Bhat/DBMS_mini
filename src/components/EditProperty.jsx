import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './Styles/AddProperty.css'


function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    location: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error('Failed to fetch property:', err);
      }
    };

    fetchProperty();
  }, [id]);

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
      await api.put(`/properties/${id}`, form);
      alert('Property updated successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update property');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-property-form">
      <h2>Edit Property</h2>
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">Update Property</button>
    </form>
  );
}

export default EditProperty;
