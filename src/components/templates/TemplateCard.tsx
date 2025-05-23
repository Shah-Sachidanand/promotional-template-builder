import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Copy, Eye } from 'lucide-react';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  type: string;
  thumbnail: string;
  createdAt: string;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  description,
  type,
  thumbnail,
  createdAt,
  onDelete,
  onDuplicate,
}) => {
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  // Get type badge color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discount':
        return 'bg-primary-100 text-primary-800';
      case 'offer':
        return 'bg-secondary-100 text-secondary-800';
      case 'event':
        return 'bg-accent-100 text-accent-800';
      case 'productLaunch':
        return 'bg-success-100 text-success-800';
      case 'seasonal':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };
  
  const formatType = (type: string) => {
    switch (type) {
      case 'productLaunch':
        return 'Product Launch';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden transition-all duration-300 hover:shadow-medium">
      <div className="relative pb-[56.25%] bg-neutral-100">
        <img 
          src={thumbnail || 'https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} 
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-neutral-900 truncate">{name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
            {formatType(type)}
          </span>
        </div>
        
        <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-neutral-500">Created: {formattedDate}</span>
          
          <div className="flex space-x-2">
            <button 
              className="p-1 text-neutral-500 hover:text-primary-500 transition-colors"
              aria-label="Preview template"
              title="Preview"
            >
              <Eye size={16} />
            </button>
            <button
              className="p-1 text-neutral-500 hover:text-secondary-500 transition-colors"
              aria-label="Duplicate template"
              title="Duplicate"
              onClick={() => onDuplicate(id)}
            >
              <Copy size={16} />
            </button>
            <Link
              to={`/templates/${id}/edit`}
              className="p-1 text-neutral-500 hover:text-accent-500 transition-colors"
              aria-label="Edit template"
              title="Edit"
            >
              <Edit size={16} />
            </Link>
            <button
              className="p-1 text-neutral-500 hover:text-error-500 transition-colors"
              aria-label="Delete template"
              title="Delete"
              onClick={() => onDelete(id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;