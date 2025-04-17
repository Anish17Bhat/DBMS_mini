import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Styles/login.css'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'guest', // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { password, phone } = form;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    } 
  
    if (phone.length !== 10 || isNaN(phone)) {
      alert('Invalid number');
      return;
    }
  
    try {
      await api.post('/users/register', form);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error registering');
    }
  };

  return (
    <form onSubmit={handleRegister} id='LoginForm'>
      <h2 className='heading2'>Register</h2>
      <input type="text" name="name" placeholder="Name" required onChange={handleChange} className='formInput'/>
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} className='formInput'/>
      <input type="text" name="phone" placeholder="Phone" required onChange={handleChange} className='formInput'/>
      <input type="password" name="password" placeholder="Password" required onChange={handleChange} className='formInput'/>
      
      <select name="role" value={form.role} onChange={handleChange} className='formInput'>
        <option value="user">User</option>
        <option value="host">Host</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
