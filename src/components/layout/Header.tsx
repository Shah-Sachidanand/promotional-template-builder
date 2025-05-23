import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, LogOut, Settings, User, ChevronDown, Menu as MenuIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="px-4 border-r border-neutral-200 text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex items-center justify-center px-4 lg:px-0 lg:justify-start">
              <div className="hidden lg:block">
                <h1 className="text-2xl font-semibold text-neutral-900">Promotion Template Builder</h1>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="p-1 rounded-full text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* User dropdown */}
            <div className="ml-4 relative flex-shrink-0" ref={userMenuRef}>
              <div>
                <button
                  type="button"
                  className="flex items-center space-x-3 focus:outline-none"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden md:flex md:items-center ml-2">
                      <span className="text-sm font-medium text-neutral-700 mr-1">{user?.name}</span>
                      <ChevronDown className="h-4 w-4 text-neutral-400" />
                    </span>
                  </div>
                </button>
              </div>
              
              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-sm text-neutral-700 truncate">{user?.email}</p>
                  </div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;