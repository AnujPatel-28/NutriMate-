
import React from 'react';
import { AppleIcon } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-health-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AppleIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">Healthy You Journey</h1>
        </div>
        <nav>
          <ul className="flex gap-4">
            <li><a href="/" className="hover:text-health-green transition">Home</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
