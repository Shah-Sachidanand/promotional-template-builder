import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building2, Bell, Lock, Shield, Palette } from 'lucide-react';
import Button from '../components/ui/Button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User, href: '/settings/profile' },
    { id: 'organization', name: 'Organization', icon: Building2, href: '/settings/organization' },
    { id: 'notifications', name: 'Notifications', icon: Bell, href: '/settings/notifications' },
    { id: 'security', name: 'Security', icon: Lock, href: '/settings/security' },
    { id: 'permissions', name: 'Permissions', icon: Shield, href: '/settings/permissions' },
    { id: 'appearance', name: 'Appearance', icon: Palette, href: '/settings/appearance' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Settings</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-lg
                  ${activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }
                `}
              >
                <tab.icon className="mr-3 h-5 w-5" />
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h2 className="text-lg font-medium text-neutral-900 mb-4">Profile Settings</h2>
            <p className="text-neutral-600">
              This is a placeholder for the settings content. Select a tab from the sidebar to view specific settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;