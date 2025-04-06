import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/users/me');
        setUser(res.data);

        if (res.data.role === 'host') {
          const propertyRes = await api.get('/properties/my-properties');
          setProperties(propertyRes.data);
        } else if (res.data.role === 'guest') {
          const propertyRes = await api.get('/properties');
          setProperties(propertyRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  const handleDelete = async (propertyId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this property?");
      if (!confirm) return;

      await api.delete(`/properties/${propertyId}`);
      setProperties(properties.filter(p => p.property_id !== propertyId));
    } catch (err) {
      alert('Failed to delete property');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p><strong>Welcome, {user.name}</strong></p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>

          {/* HOST SECTION */}
          {user.role === 'host' && (
            <>
              <Link to="/add-property"><button>Add Property</button></Link>

              <h3>Your Properties</h3>
              {properties.length === 0 ? (
                <p>You haven't added any properties yet.</p>
              ) : (
                properties.map((property) => (
                  <div key={property.property_id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
                    <h4>{property.title}</h4>
                    <p>{property.location}</p>
                    <p>{property.description}</p>
                    <p>₹{property.price}</p>
                    <Link to={`/edit-property/${property.property_id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(property.property_id)} style={{ marginLeft: '10px' }}>Delete</button>
                  </div>
                ))
              )}
            </>
          )}

          {/* GUEST SECTION */}
          {user.role === 'guest' && (
            <>
              <Link to="/my-bookings"><button>View My Bookings</button></Link>

              <h3>Available Properties</h3>
              {properties.length === 0 ? (
                <p>No properties available to book.</p>
              ) : (
                properties.map((property) => (
                  <div key={property.property_id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
                    <h4>{property.title}</h4>
                    <p>{property.location}</p>
                    <p>{property.description}</p>
                    <p>₹{property.price}</p>
                    <Link to={`/booking/${property.property_id}`}>
                      <button>Book Now</button>
                    </Link>
                  </div>
                ))
              )}
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
