
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-health-dark text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Healthy You Journey. All rights reserved.</p>
        <p className="text-sm mt-2">This website is for educational purposes only and is not a substitute for professional medical advice.</p>
      </div>
    </footer>
  );
};

export default Footer;
