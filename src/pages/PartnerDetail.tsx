import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Mail, Phone, Globe, Edit, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';
import { API_URL } from '../config/constants';

interface Partner {
  _id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  primaryColor: string;
  secondaryColor: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  selectedTemplates: string[];
  active: boolean;
  createdAt: string;
}

const PartnerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // For demo purposes, simulate API call with setTimeout
    setTimeout(() => {
      const demoPartner: Partner = {
        _id: id || '1',
        name: 'Acme Corporation',
        description: 'Leading provider of innovative solutions for businesses worldwide.',
        logo: 'https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        website: 'https://example.com',
        primaryColor: '#0A84FF',
        secondaryColor: '#5E5CE6',
        contactName: 'John Smith',
        contactEmail: 'john.smith@acme.com',
        contactPhone: '+1 (555) 123-4567',
        selectedTemplates: ['1', '2', '3'],
        active: true,
        createdAt: '2023-06-15T10:30:00Z'
      };
      
      setPartner(demoPartner);
      setIsLoading(false);
    }, 1000);
    
    // Uncomment to use real API call
    // const fetchPartner = async () => {
    //   try {
    //     const { data } = await axios.get(`${API_URL}/partners/${id}`);
    //     setPartner(data);
    //   } catch (error) {
    //     console.error('Error fetching partner:', error);
    //     navigate('/partners');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchPartner();
  }, [id, navigate]);
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        // For demo purposes, navigate directly
        navigate('/partners');
        
        // Uncomment to use real API call
        // await axios.delete(`${API_URL}/partners/${id}`);
        // navigate('/partners');
      } catch (error) {
        console.error('Error deleting partner:', error);
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (!partner) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Partner not found</h2>
        <p className="text-neutral-600 mb-4">The partner you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/partners')}>
          Back to Partners
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/partners')}
            className="mr-4 text-neutral-500 hover:text-neutral-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">{partner.name}</h1>
            <p className="text-sm text-neutral-600">
              Partner since {new Date(partner.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<Edit className="h-4 w-4" />}
            onClick={() => navigate(`/partners/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      
      {/* Partner Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center mb-6">
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-neutral-400" />
                </div>
              )}
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-neutral-900">{partner.name}</h2>
                <p className="text-neutral-600">{partner.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-500 mb-2">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-neutral-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${partner.contactEmail}`} className="hover:text-primary-600">
                      {partner.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${partner.contactPhone}`} className="hover:text-primary-600">
                      {partner.contactPhone}
                    </a>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <Globe className="h-4 w-4 mr-2" />
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-600"
                    >
                      {partner.website}
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-500 mb-2">Brand Colors</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div
                      className="h-6 w-6 rounded mr-2"
                      style={{ backgroundColor: partner.primaryColor }}
                    />
                    <span className="text-neutral-600">Primary: {partner.primaryColor}</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="h-6 w-6 rounded mr-2"
                      style={{ backgroundColor: partner.secondaryColor }}
                    />
                    <span className="text-neutral-600">Secondary: {partner.secondaryColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Selected Templates */}
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Selected Templates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3].map((template) => (
                <div
                  key={template}
                  className="border border-neutral-200 rounded-lg p-4 hover:border-primary-500 transition-colors cursor-pointer"
                >
                  <div className="aspect-video bg-neutral-100 rounded-md mb-3"></div>
                  <h4 className="font-medium text-neutral-900">Template {template}</h4>
                  <p className="text-sm text-neutral-600">Template description goes here</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Activity & Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Partner Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Account Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    partner.active ? 'bg-success-100 text-success-800' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {partner.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Templates</span>
                  <span className="text-sm text-neutral-600">{partner.selectedTemplates.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Active Promotions</span>
                  <span className="text-sm text-neutral-600">5</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((activity) => (
                <div key={activity} className="border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
                  <p className="text-sm text-neutral-900">Activity {activity}</p>
                  <p className="text-xs text-neutral-500 mt-1">2 hours ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetail;