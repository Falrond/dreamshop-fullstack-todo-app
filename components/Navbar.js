import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

const Navbar = () => {
  const { user, error, isLoading } = useUser();
  return (
    <nav className="navbar h-36 bg-dark-cyan font-spartan">
      <div className=" flex justify-between items-center h-full max-w-4xl mx-auto">
        <div className="font-spartan text-3xl font-bold text-gray-100 p-8">
          DreamShop
        </div>
        <div>
          {user && (
            <a
              href="/api/auth/logout"
              className="text-gray-50 font-bold border-b-2  border-transparent  transition hover:border-gray-100 pb-1 mr-8"
            >
              Logout
            </a>
          )}
          {!user && (
            <a
              href="/api/auth/login"
              className="text-gray-50 font-bold border-b-2  border-transparent transition hover:border-gray-100 pb-1 mr-8 animate-bounce"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
