import { useState } from 'react';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#002147] text-white shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            {/* Left section: Mobile - Hamburger, and Desktop - Logo + Title */}
            <div className="flex items-center space-x-2">
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md hover:bg-[#003166] transition-colors"
                >
                  {isMenuOpen ? (
                    <FiX className="h-6 w-6" />
                  ) : (
                    <FiMenu className="h-6 w-6" />
                  )}
                </button>
              </div>
              <img 
                src="/manit_sm.png" 
                alt="MANIT Logo" 
                className="h-8 w-auto md:h-12 transition-transform hover:scale-105"
              />
              <div className="hidden md:block">
                <span className="text-xl md:text-2xl font-bold tracking-tight">
                  MANIT ATMS
                </span>
              </div>
            </div>

            {/* Desktop right section: Logout */}
            <div className="hidden md:flex items-center">
              {user && (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#003166] transition-all duration-200 ease-in-out"
                >
                  <FiLogOut className="h-5 w-5" />
                  <span className="text-sm">Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sliding menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#002147] shadow-lg transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50`}>
        <div className="p-4">
          {user && (
            <>
              <div className="mb-4 text-lg font-medium">Welcome, {user.name}</div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-[#003166] rounded-lg hover:bg-[#004186] transition-colors w-full"
              >
                <FiLogOut className="h-5 w-5" />
                <span className="text-sm">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}