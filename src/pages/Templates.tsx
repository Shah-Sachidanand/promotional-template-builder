import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, ArrowDownAZ, RefreshCcw } from 'lucide-react';
import Button from '../components/ui/Button';
import TemplateCard from '../components/templates/TemplateCard';
import axios from 'axios';
import { API_URL, TEMPLATE_TYPES } from '../config/constants';

interface Template {
  _id: string;
  name: string;
  description: string;
  type: string;
  thumbnail: string;
  createdAt: string;
  isPublished: boolean;
}

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    // For demo purposes, simulate API call with setTimeout
    setTimeout(() => {
      const demoTemplates = [
        {
          _id: '1',
          name: 'Summer Sale Template',
          description: 'A vibrant template for summer promotions featuring bright colors and beach imagery.',
          type: 'discount',
          thumbnail: 'https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          createdAt: '2023-06-15T10:30:00Z',
          isPublished: true
        },
        {
          _id: '2',
          name: 'New Product Launch',
          description: 'Modern and sleek template for introducing new products to your customers.',
          type: 'productLaunch',
          thumbnail: 'https://images.pexels.com/photos/7015034/pexels-photo-7015034.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          createdAt: '2023-07-21T15:45:00Z',
          isPublished: true
        },
        {
          _id: '3',
          name: 'Holiday Special Offer',
          description: 'Festive template for holiday season promotions and special offers.',
          type: 'seasonal',
          thumbnail: 'https://images.pexels.com/photos/1303082/pexels-photo-1303082.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          createdAt: '2023-08-05T09:15:00Z',
          isPublished: true
        },
        {
          _id: '4',
          name: 'Event Registration',
          description: 'Clean and organized template for event registrations and RSVPs.',
          type: 'event',
          thumbnail: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          createdAt: '2023-09-12T11:20:00Z',
          isPublished: false
        },
        {
          _id: '5',
          name: 'Weekly Deal Spotlight',
          description: 'Highlight your weekly deals with this attention-grabbing template.',
          type: 'offer',
          thumbnail: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          createdAt: '2023-10-18T14:10:00Z',
          isPublished: true
        },
        {
          _id: '6',
          name: 'Loyalty Program',
          description: 'Elegant template for promoting your customer loyalty program benefits.',
          type: 'discount',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          createdAt: '2023-11-24T16:35:00Z',
          isPublished: true
        },
      ];
      
      setTemplates(demoTemplates);
      setIsLoading(false);
    }, 1000);
    
    // Uncomment to use real API call
    // const fetchTemplates = async () => {
    //   try {
    //     const { data } = await axios.get(`${API_URL}/templates`);
    //     setTemplates(data);
    //   } catch (error) {
    //     console.error('Error fetching templates:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchTemplates();
  }, []);
  
  const handleDelete = (id: string) => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this template?')) {
      // For demo purposes, update state directly
      setTemplates(templates.filter(template => template._id !== id));
      
      // Uncomment to use real API call
      // const deleteTemplate = async () => {
      //   try {
      //     await axios.delete(`${API_URL}/templates/${id}`);
      //     setTemplates(templates.filter(template => template._id !== id));
      //   } catch (error) {
      //     console.error('Error deleting template:', error);
      //   }
      // };
      // deleteTemplate();
    }
  };
  
  const handleDuplicate = (id: string) => {
    // Find template to duplicate
    const templateToDuplicate = templates.find(template => template._id === id);
    
    if (templateToDuplicate) {
      // Create a copy with new ID and name
      const duplicatedTemplate = {
        ...templateToDuplicate,
        _id: `${id}-copy-${Date.now()}`,
        name: `${templateToDuplicate.name} (Copy)`,
        createdAt: new Date().toISOString(),
        isPublished: false
      };
      
      // Update state
      setTemplates([...templates, duplicatedTemplate]);
      
      // Uncomment to use real API call
      // const duplicateTemplate = async () => {
      //   try {
      //     const { data } = await axios.post(`${API_URL}/templates/${id}/duplicate`);
      //     setTemplates([...templates, data]);
      //   } catch (error) {
      //     console.error('Error duplicating template:', error);
      //   }
      // };
      // duplicateTemplate();
    }
  };
  
  // Filter and sort templates
  const filteredTemplates = templates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType ? template.type === filterType : true;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'nameAsc') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'nameDesc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Templates</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Create and manage promotional landing page templates
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => {}}
          >
            <Link to="/templates/create">Create Template</Link>
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <select
              className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="discount">Discount</option>
              <option value="offer">Offer</option>
              <option value="event">Event</option>
              <option value="productLaunch">Product Launch</option>
              <option value="seasonal">Seasonal</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
              <Filter className="h-4 w-4" />
            </div>
          </div>
          
          <div className="relative">
            <select
              className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="nameAsc">Name A-Z</option>
              <option value="nameDesc">Name Z-A</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
              <ArrowDownAZ className="h-4 w-4" />
            </div>
          </div>
          
          <button
            className="p-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => {
              setSearchQuery('');
              setFilterType('');
              setSortBy('newest');
            }}
            title="Reset filters"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="bg-white rounded-lg shadow-soft p-8 text-center">
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No templates found</h3>
          <p className="text-neutral-600 mb-4">
            {searchQuery || filterType
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Create your first template to get started."}
          </p>
          {!searchQuery && !filterType && (
            <Button>
              <Link to="/templates/create">Create Template</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template._id}
              id={template._id}
              name={template.name}
              description={template.description}
              type={template.type}
              thumbnail={template.thumbnail}
              createdAt={template.createdAt}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Templates;