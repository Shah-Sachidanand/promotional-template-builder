import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, 
  Users, 
  FileSpreadsheet, 
  Megaphone, 
  Settings, 
  X,
  SparkleIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', to: '/', icon: LayoutGrid },
    { name: 'Partners', to: '/partners', icon: Users },
    { name: 'Templates', to: '/templates', icon: FileSpreadsheet },
    { name: 'Promotions', to: '/promotions', icon: Megaphone },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];
  
  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 lg:hidden transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <SparkleIcon className="h-8 w-auto text-primary-500" />
              <span className="ml-2 text-xl font-semibold text-primary-800">PromoBuilder</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-neutral-700">{user?.name}</p>
                  <p className="text-sm font-medium text-neutral-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-neutral-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <SparkleIcon className="h-8 w-auto text-primary-500" />
                <span className="ml-2 text-xl font-semibold text-primary-800">PromoBuilder</span>
              </div>
              <nav className="mt-8 flex-1 px-4 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`
                    }
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-5 w-5"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-9 w-9 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-700">{user?.name}</p>
                    <p className="text-xs font-medium text-neutral-500 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;