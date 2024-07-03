import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';
import QRCode from 'qrcode.react';
import './Login.css';

const Login: React.FC = () => {
  const [tokenId, setTokenId] = useState('nfc112233'); // Hardcoded token ID for now
  const [error, setError] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { setAuth } = authContext;

  const handleLogin = async () => {
    try {
      const response = await authService.login(tokenId);
      setAuth(response.data);
      setRedirectToDashboard(true);
    } catch (err) {
      console.error('Login Error:', err); // Log the specific error for debugging
      setError('Login failed');
    }
  };

  const handleNfcLogin = () => {
    setShowQRCode(true);
  };

  const deepLinkUrl = 'yourapp://nfc-login'; // Replace with your app's NFC login URL scheme

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-container">
      <div className="login-title">Login</div>
      <div className="icon">
        <div className="icon-inner"></div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogin} className="login-button">Login with NFC Token</button>
      <button onClick={handleNfcLogin} className="nfc-login-button">Use the NFC Login</button>
      {showQRCode && (
        <div className="qr-code">
          <QRCode value={deepLinkUrl} />
          <p>Scan this QR code with your mobile app to log in using NFC</p>
        </div>
      )}
    </div>
  );
};

export default Login;
