import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

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
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" required onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
      
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="host">Host</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
