// Footer.jsx

import React from 'react';

const Footer = () => {
  const footerStyle = {
    background : '#dc3545',
    color: '#fff', 
    padding: '0.5rem',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    textAlign: 'center',

  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <p>&copy; 2023 FoodMandu | All rights reserved</p>
        <p>Contact us: support@foodmandu.com</p>
      </div>
    </footer>
  );
};

export default Footer;
