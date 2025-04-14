import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Styles/login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin} id='LoginForm'>
      <h2 className='heading2'>Login</h2>
      <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" required className='formInput'/>
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required className='formInput'/>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
