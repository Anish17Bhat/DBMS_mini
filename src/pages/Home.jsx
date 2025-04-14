import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
  return (
    <div className='homeContainer'>
      <h1 className='heading1'>Welcome to Vacation Booking</h1>
      <p>Find the best vacation properties or become a host today.</p>
      <div className="RLbtns">
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
}

export default Home;
