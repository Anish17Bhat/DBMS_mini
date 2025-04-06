import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Vacation Booking</h1>
      <p>Find the best vacation properties or become a host today.</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
}

export default Home;
