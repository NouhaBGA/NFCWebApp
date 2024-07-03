import React, { useEffect, useState, useContext } from 'react';
import { fetchUserData } from '../services/apiService';
import { AuthContext } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { auth } = authContext;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    if (auth) {
      getUserData();
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='main'>
      <h2>Welcome to the Dashboard</h2>
      {userData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Issued At</th>
              <th>Expires At</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.nfc_id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.iat).toLocaleString()}</td>
                <td>{new Date(user.exp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Dashboard;
