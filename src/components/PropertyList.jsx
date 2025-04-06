import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await api.get('/properties');
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProps();
  }, []);

  return (
    <div>
      <h2>Available Properties</h2>
      {properties.map(prop => (
        <div key={prop.property_id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
          <h3>{prop.title}</h3>
          <p>{prop.location}</p>
          <p>{prop.description}</p>
          <p>₹{prop.price} / night</p>
          <Link to={`/book/${prop.property_id}`}>
            <button>Book Now</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
