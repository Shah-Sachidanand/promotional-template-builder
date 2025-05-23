import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Save, Eye, ArrowLeft, Trash2, ChevronUp, ChevronDown, MoveVertical } from 'lucide-react';
import Button from '../components/ui/Button';
import { TEMPLATE_SECTIONS, TEMPLATE_TYPES } from '../config/constants';

interface Section {
  id: string;
  type: string;
  content: any;
  isEditable: boolean;
  position: number;
}

const TemplateBuilder = () => {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateType, setTemplateType] = useState('discount');
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'header-1',
      type: TEMPLATE_SECTIONS.HEADER,
      content: {
        title: 'Promotion Header',
        subtitle: 'Special offer for our customers',
        backgroundImage: '',
        backgroundColor: '#0A84FF'
      },
      isEditable: false,
      position: 0
    },
    {
      id: 'banner-1',
      type: TEMPLATE_SECTIONS.BANNER,
      content: {
        title: 'Limited Time Offer',
        subtitle: 'Get your discount today',
        image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        buttonText: 'Learn More',
        buttonLink: '#'
      },
      isEditable: true,
      position: 1
    },
    {
      id: 'promo-details-1',
      type: TEMPLATE_SECTIONS.PROMO_DETAILS,
      content: {
        title: 'Promotion Details',
        description: 'This is a special promotion offering great discounts on selected products.',
        features: [
          'Exclusive discount on premium items',
          'Free shipping on all orders',
          'Limited time offer'
        ]
      },
      isEditable: false,
      position: 2
    },
    {
      id: 'redeem-card-1',
      type: TEMPLATE_SECTIONS.REDEEM_CARD,
      content: {
        title: 'How to Redeem',
        steps: [
          'Select your products',
          'Enter promo code at checkout',
          'Enjoy your discount'
        ],
        code: 'SUMMER25',
        expiry: '2023-12-31'
      },
      isEditable: true,
      position: 3
    },
    {
      id: 'terms-1',
      type: TEMPLATE_SECTIONS.TERMS,
      content: {
        title: 'Terms & Conditions',
        text: 'Offer valid until specified date. Cannot be combined with other promotions. Subject to availability.'
      },
      isEditable: false,
      position: 4
    },
    {
      id: 'footer-1',
      type: TEMPLATE_SECTIONS.FOOTER,
      content: {
        text: '© 2023 Company Name. All rights reserved.',
        links: [
          { text: 'Privacy Policy', url: '#' },
          { text: 'Terms of Service', url: '#' },
          { text: 'Contact Us', url: '#' }
        ]
      },
      isEditable: false,
      position: 5
    }
  ]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update positions
    const updatedItems = items.map((item, index) => ({
      ...item,
      position: index
    }));
    
    setSections(updatedItems);
  };
  
  const addSection = (type: string) => {
    const newId = `${type}-${Date.now()}`;
    const position = sections.length;
    
    let newContent = {};
    let isEditable = false;
    
    switch (type) {
      case TEMPLATE_SECTIONS.BANNER:
        newContent = {
          title: 'Banner Title',
          subtitle: 'Banner Subtitle',
          image: '',
          buttonText: 'Click Here',
          buttonLink: '#'
        };
        isEditable = true;
        break;
      case TEMPLATE_SECTIONS.PROMO_DETAILS:
        newContent = {
          title: 'Promotion Details',
          description: 'Description of your promotion',
          features: ['Feature 1', 'Feature 2', 'Feature 3']
        };
        break;
      case TEMPLATE_SECTIONS.REDEEM_CARD:
        newContent = {
          title: 'How to Redeem',
          steps: ['Step 1', 'Step 2', 'Step 3'],
          code: 'PROMO',
          expiry: ''
        };
        isEditable = true;
        break;
      case TEMPLATE_SECTIONS.TERMS:
        newContent = {
          title: 'Terms & Conditions',
          text: 'Enter your terms and conditions here.'
        };
        break;
      case TEMPLATE_SECTIONS.PARTNER_BRANDING:
        newContent = {
          logo: '',
          name: 'Partner Name',
          description: 'Partner description',
          website: ''
        };
        isEditable = true;
        break;
      default:
        newContent = { title: 'New Section' };
    }
    
    const newSection: Section = {
      id: newId,
      type,
      content: newContent,
      isEditable,
      position
    };
    
    setSections([...sections, newSection]);
    setActiveSectionId(newId);
  };
  
  const deleteSection = (id: string) => {
    const updatedSections = sections.filter(section => section.id !== id);
    setSections(updatedSections.map((section, index) => ({
      ...section,
      position: index
    })));
    
    if (activeSectionId === id) {
      setActiveSectionId(null);
    }
  };
  
  const updateSectionContent = (id: string, updatedContent: any) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, content: { ...section.content, ...updatedContent } } : section
    ));
  };
  
  const handleSave = async () => {
    if (!templateName) {
      alert('Please enter a template name');
      return;
    }
    
    const templateData = {
      name: templateName,
      description: templateDescription,
      type: templateType,
      sections: sections.map(({ id, type, content, isEditable, position }) => ({
        id,
        type,
        content,
        isEditable,
        position
      }))
    };
    
    console.log('Saving template:', templateData);
    
    // For demo purposes, simulate API call
    setTimeout(() => {
      alert('Template saved successfully!');
      navigate('/templates');
    }, 1000);
    
    // Uncomment to use real API call
    // try {
    //   const { data } = await axios.post(`${API_URL}/templates`, templateData);
    //   navigate('/templates');
    // } catch (error) {
    //   console.error('Error saving template:', error);
    //   alert('Error saving template');
    // }
  };
  
  // Render each section based on its type
  const renderSectionPreview = (section: Section) => {
    switch (section.type) {
      case TEMPLATE_SECTIONS.HEADER:
        return (
          <div 
            className="p-8 text-white text-center"
            style={{ backgroundColor: section.content.backgroundColor || '#0A84FF' }}
          >
            <h1 className="text-2xl md:text-3xl font-bold">{section.content.title}</h1>
            <p className="mt-2">{section.content.subtitle}</p>
          </div>
        );
      case TEMPLATE_SECTIONS.BANNER:
        return (
          <div className="relative overflow-hidden bg-neutral-100" style={{ minHeight: '300px' }}>
            {section.content.image && (
              <img
                src={section.content.image}
                alt={section.content.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
              <div className="text-white p-8 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold">{section.content.title}</h2>
                <p className="mt-2 text-lg md:text-xl">{section.content.subtitle}</p>
                {section.content.buttonText && (
                  <button className="mt-4 px-6 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-neutral-100 transition-colors">
                    {section.content.buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.PROMO_DETAILS:
        return (
          <div className="py-12 px-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-center text-neutral-900">{section.content.title}</h2>
              <p className="mt-4 text-neutral-700 text-center">{section.content.description}</p>
              {section.content.features && section.content.features.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {section.content.features.map((feature: string, index: number) => (
                    <div key={index} className="bg-neutral-50 p-4 rounded-lg text-center">
                      <p className="font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.REDEEM_CARD:
        return (
          <div className="py-12 px-8 bg-neutral-50">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-soft">
                <h2 className="text-2xl font-semibold text-center text-neutral-900">{section.content.title}</h2>
                {section.content.steps && section.content.steps.length > 0 && (
                  <div className="mt-6">
                    <div className="flex flex-col md:flex-row justify-around items-start space-y-4 md:space-y-0">
                      {section.content.steps.map((step: string, index: number) => (
                        <div key={index} className="flex flex-col items-center text-center">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white font-bold">
                            {index + 1}
                          </div>
                          <p className="mt-2 text-neutral-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {section.content.code && (
                  <div className="mt-8 text-center">
                    <p className="text-sm text-neutral-500">Use code:</p>
                    <div className="mt-1 inline-block px-4 py-2 bg-neutral-100 border border-dashed border-neutral-300 rounded-lg">
                      <p className="font-mono font-bold text-lg">{section.content.code}</p>
                    </div>
                    {section.content.expiry && (
                      <p className="mt-2 text-sm text-neutral-500">
                        Valid until: {new Date(section.content.expiry).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.TERMS:
        return (
          <div className="py-8 px-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-medium text-neutral-900">{section.content.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{section.content.text}</p>
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.PARTNER_BRANDING:
        return (
          <div className="py-8 px-8 bg-neutral-50">
            <div className="max-w-4xl mx-auto flex items-center">
              {section.content.logo ? (
                <img 
                  src={section.content.logo} 
                  alt={section.content.name} 
                  className="h-16 w-auto object-contain mr-4"
                />
              ) : (
                <div className="h-16 w-16 bg-neutral-200 rounded-lg flex items-center justify-center mr-4">
                  <p className="text-neutral-500 font-medium">Logo</p>
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium text-neutral-900">{section.content.name}</h3>
                <p className="text-sm text-neutral-600">{section.content.description}</p>
                {section.content.website && (
                  <a 
                    href={section.content.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    Visit website
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.FOOTER:
        return (
          <div className="py-6 px-8 bg-neutral-800 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-neutral-400">{section.content.text}</p>
                {section.content.links && section.content.links.length > 0 && (
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    {section.content.links.map((link: { text: string, url: string }, index: number) => (
                      <a 
                        key={index} 
                        href={link.url}
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-4 bg-neutral-100 text-center">Unknown section type</div>;
    }
  };
  
  // Editor component for each section type
  const renderSectionEditor = (section: Section) => {
    switch (section.type) {
      case TEMPLATE_SECTIONS.HEADER:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={section.content.title}
                onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={section.content.subtitle}
                onChange={(e) => updateSectionContent(section.id, { subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Background Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={section.content.backgroundColor || '#0A84FF'}
                  onChange={(e) => updateSectionContent(section.id, { backgroundColor: e.target.value })}
                  className="h-8 w-8 rounded"
                />
                <input
                  type="text"
                  value={section.content.backgroundColor || '#0A84FF'}
                  onChange={(e) => updateSectionContent(section.id, { backgroundColor: e.target.value })}
                  className="ml-2 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.BANNER:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={section.content.title}
                onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={section.content.subtitle}
                onChange={(e) => updateSectionContent(section.id, { subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Banner Image URL
              </label>
              <input
                type="text"
                value={section.content.image || ''}
                placeholder="https://example.com/image.jpg"
                onChange={(e) => updateSectionContent(section.id, { image: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {section.content.image && (
                <div className="mt-2 h-24 bg-neutral-100 rounded-lg overflow-hidden">
                  <img 
                    src={section.content.image} 
                    alt="Banner preview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={section.content.buttonText || ''}
                onChange={(e) => updateSectionContent(section.id, { buttonText: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Button Link
              </label>
              <input
                type="text"
                value={section.content.buttonLink || '#'}
                onChange={(e) => updateSectionContent(section.id, { buttonLink: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.PROMO_DETAILS:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={section.content.title}
                onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                value={section.content.description}
                onChange={(e) => updateSectionContent(section.id, { description: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Features
              </label>
              {section.content.features && section.content.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const updatedFeatures = [...section.content.features];
                      updatedFeatures[index] = e.target.value;
                      updateSectionContent(section.id, { features: updatedFeatures });
                    }}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedFeatures = [...section.content.features];
                      updatedFeatures.splice(index, 1);
                      updateSectionContent(section.id, { features: updatedFeatures });
                    }}
                    className="ml-2 p-2 text-neutral-500 hover:text-error-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const updatedFeatures = [...(section.content.features || []), 'New Feature'];
                  updateSectionContent(section.id, { features: updatedFeatures });
                }}
                className="mt-2 flex items-center text-sm text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Feature
              </button>
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.REDEEM_CARD:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={section.content.title}
                onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Steps
              </label>
              {section.content.steps && section.content.steps.map((step: string, index: number) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => {
                      const updatedSteps = [...section.content.steps];
                      updatedSteps[index] = e.target.value;
                      updateSectionContent(section.id, { steps: updatedSteps });
                    }}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedSteps = [...section.content.steps];
                      updatedSteps.splice(index, 1);
                      updateSectionContent(section.id, { steps: updatedSteps });
                    }}
                    className="ml-2 p-2 text-neutral-500 hover:text-error-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const updatedSteps = [...(section.content.steps || []), 'New Step'];
                  updateSectionContent(section.id, { steps: updatedSteps });
                }}
                className="mt-2 flex items-center text-sm text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Step
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Promo Code
              </label>
              <input
                type="text"
                value={section.content.code || ''}
                onChange={(e) => updateSectionContent(section.id, { code: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                value={section.content.expiry || ''}
                onChange={(e) => updateSectionContent(section.id, { expiry: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.TERMS:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={section.content.title}
                onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Terms Text
              </label>
              <textarea
                value={section.content.text}
                onChange={(e) => updateSectionContent(section.id, { text: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={4}
              />
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.PARTNER_BRANDING:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Partner Name
              </label>
              <input
                type="text"
                value={section.content.name}
                onChange={(e) => updateSectionContent(section.id, { name: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Partner Logo URL
              </label>
              <input
                type="text"
                value={section.content.logo || ''}
                placeholder="https://example.com/logo.png"
                onChange={(e) => updateSectionContent(section.id, { logo: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {section.content.logo && (
                <div className="mt-2 h-16 w-32 bg-neutral-100 rounded-lg p-2">
                  <img 
                    src={section.content.logo} 
                    alt="Logo preview" 
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                value={section.content.description || ''}
                onChange={(e) => updateSectionContent(section.id, { description: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Website URL
              </label>
              <input
                type="text"
                value={section.content.website || ''}
                placeholder="https://example.com"
                onChange={(e) => updateSectionContent(section.id, { website: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );
      case TEMPLATE_SECTIONS.FOOTER:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Footer Text
              </label>
              <input
                type="text"
                value={section.content.text}
                onChange={(e) => updateSectionContent(section.id, { text: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Footer Links
              </label>
              {section.content.links && section.content.links.map((link: { text: string, url: string }, index: number) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={link.text}
                    placeholder="Link text"
                    onChange={(e) => {
                      const updatedLinks = [...section.content.links];
                      updatedLinks[index] = { ...link, text: e.target.value };
                      updateSectionContent(section.id, { links: updatedLinks });
                    }}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    value={link.url}
                    placeholder="URL"
                    onChange={(e) => {
                      const updatedLinks = [...section.content.links];
                      updatedLinks[index] = { ...link, url: e.target.value };
                      updateSectionContent(section.id, { links: updatedLinks });
                    }}
                    className="flex-1 ml-2 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedLinks = [...section.content.links];
                      updatedLinks.splice(index, 1);
                      updateSectionContent(section.id, { links: updatedLinks });
                    }}
                    className="ml-2 p-2 text-neutral-500 hover:text-error-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const updatedLinks = [...(section.content.links || []), { text: 'New Link', url: '#' }];
                  updateSectionContent(section.id, { links: updatedLinks });
                }}
                className="mt-2 flex items-center text-sm text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Link
              </button>
            </div>
          </div>
        );
      default:
        return <div>No editor available for this section type</div>;
    }
  };
  
  const formatSectionType = (type: string) => {
    switch (type) {
      case TEMPLATE_SECTIONS.HEADER:
        return 'Header';
      case TEMPLATE_SECTIONS.BANNER:
        return 'Banner';
      case TEMPLATE_SECTIONS.PROMO_DETAILS:
        return 'Promotion Details';
      case TEMPLATE_SECTIONS.REDEEM_CARD:
        return 'Redeem Card';
      case TEMPLATE_SECTIONS.TERMS:
        return 'Terms & Conditions';
      case TEMPLATE_SECTIONS.PARTNER_BRANDING:
        return 'Partner Branding';
      case TEMPLATE_SECTIONS.FOOTER:
        return 'Footer';
      default:
        return type;
    }
  };
  
  return (
    <div className="min-h-full">
      {/* Template Builder Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => navigate('/templates')}
                className="mr-4 text-neutral-500 hover:text-neutral-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-lg font-medium text-neutral-900">Create Template</h1>
                <p className="text-sm text-neutral-500">Design a new promotional template</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                leftIcon={<Eye className="h-4 w-4" />}
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? 'Edit Mode' : 'Preview'}
              </Button>
              <Button
                leftIcon={<Save className="h-4 w-4" />}
                onClick={handleSave}
              >
                Save Template
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Template Builder Content */}
      {previewMode ? (
        // Preview Mode
        <div className="bg-neutral-100 min-h-full">
          <div className="max-w-6xl mx-auto bg-white shadow-lg">
            {sections
              .sort((a, b) => a.position - b.position)
              .map((section) => (
                <div key={section.id} className="relative">
                  {renderSectionPreview(section)}
                </div>
              ))}
          </div>
        </div>
      ) : (
        // Edit Mode
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-full">
          {/* Template Properties Panel */}
          <div className="lg:col-span-3 bg-white border-r border-neutral-200 p-4">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Template Properties</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter template name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder="Enter template description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Type
                  </label>
                  <select
                    value={templateType}
                    onChange={(e) => setTemplateType(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="discount">Discount</option>
                    <option value="offer">Offer</option>
                    <option value="event">Event</option>
                    <option value="productLaunch">Product Launch</option>
                    <option value="seasonal">Seasonal</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Available Sections</h2>
              <div className="space-y-2">
                {Object.values(TEMPLATE_SECTIONS).map((sectionType) => (
                  <button
                    key={sectionType}
                    type="button"
                    onClick={() => addSection(sectionType)}
                    className="w-full text-left px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 transition-colors"
                  >
                    {formatSectionType(sectionType)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sections List and Editor */}
          <div className="lg:col-span-9 flex flex-col md:flex-row">
            {/* Sections List */}
            <div className="w-full md:w-1/3 bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-200 p-4">
              <h2 className="text-lg font-medium mb-4">Template Sections</h2>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {sections
                        .sort((a, b) => a.position - b.position)
                        .map((section, index) => (
                          <Draggable key={section.id} draggableId={section.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`
                                  p-3 rounded-lg border 
                                  ${activeSectionId === section.id 
                                    ? 'border-primary-500 bg-primary-50' 
                                    : 'border-neutral-300 bg-white'}
                                  ${section.isEditable ? 'border-l-4 border-l-accent-500' : ''}
                                  cursor-pointer hover:bg-neutral-50 transition-colors
                                `}
                                onClick={() => setActiveSectionId(section.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div {...provided.dragHandleProps} className="mr-2 text-neutral-400">
                                      <MoveVertical className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-sm">
                                      {formatSectionType(section.type)}
                                      {section.isEditable && (
                                        <span className="ml-2 text-xs text-accent-600">(Editable)</span>
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteSection(section.id);
                                      }}
                                      className="p-1 text-neutral-500 hover:text-error-500"
                                      disabled={
                                        section.type === TEMPLATE_SECTIONS.HEADER || 
                                        section.type === TEMPLATE_SECTIONS.FOOTER
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            
            {/* Section Editor */}
            <div className="w-full md:w-2/3 bg-white p-4">
              {activeSectionId ? (
                <div>
                  <h2 className="text-lg font-medium mb-4">
                    Edit {formatSectionType(sections.find(s => s.id === activeSectionId)?.type || '')}
                  </h2>
                  {renderSectionEditor(sections.find(s => s.id === activeSectionId)!)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-neutral-500 mb-2">Select a section to edit</p>
                  <p className="text-sm text-neutral-400">Or add a new section from the left panel</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateBuilder;