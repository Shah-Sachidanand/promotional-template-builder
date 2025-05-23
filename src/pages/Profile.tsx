import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Camera, Mail, User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    avatar: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Profile</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-soft">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-neutral-900">Personal Information</h2>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-neutral-100 flex items-center justify-center">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt={formData.name}
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-medium text-neutral-500">
                        {formData.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 rounded-full bg-primary-500 p-2 text-white hover:bg-primary-600"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {isEditing && (
                  <div className="ml-6">
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                    <p className="mt-1 text-xs text-neutral-500">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Name
                </label>
                <div className="mt-1 relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className={`
                      block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg
                      ${!isEditing ? 'bg-neutral-50' : 'bg-white'}
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    `}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className={`
                      block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg
                      ${!isEditing ? 'bg-neutral-50' : 'bg-white'}
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    `}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    className={`
                      block w-full px-3 py-2 border border-neutral-300 rounded-lg
                      ${!isEditing ? 'bg-neutral-50' : 'bg-white'}
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    `}
                    placeholder={isEditing ? 'Write a short bio about yourself...' : ''}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;