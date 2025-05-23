import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';
import { API_URL } from '../config/constants';

interface Partner {
    _id: string;
    name: string;
    logo: string;
}

interface Template {
    _id: string;
    name: string;
    description: string;
    thumbnail: string;
    type: string;
}

const PromotionCreator = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        partner: '',
        template: '',
        startDate: '',
        endDate: '',
        status: 'draft',
        isPublished: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [partnersRes, templatesRes] = await Promise.all([
                    axios.get(`${API_URL}/partners`, { withCredentials: true }),
                    axios.get(`${API_URL}/templates`, { withCredentials: true })
                ]);

                setPartners(partnersRes.data);
                setTemplates(templatesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await axios.post(`${API_URL}/promotions`, formData, {
                withCredentials: true
            });
            navigate(`/promotions/${data._id}`);
        } catch (error) {
            console.error('Error creating promotion:', error);
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/promotions')}
                        className="mr-4 text-neutral-500 hover:text-neutral-700"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold text-neutral-900">Create Promotion</h1>
                        <p className="text-sm text-neutral-600">
                            Create a new promotional campaign
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-lg shadow-soft p-6">
                        <h2 className="text-lg font-medium text-neutral-900 mb-4">Basic Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                                    Promotion Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Enter promotion name"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-neutral-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Enter promotion description"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-soft p-6">
                        <h2 className="text-lg font-medium text-neutral-900 mb-4">Partner & Template</h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="partner" className="block text-sm font-medium text-neutral-700">
                                    Select Partner *
                                </label>
                                <select
                                    id="partner"
                                    name="partner"
                                    value={formData.partner}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="">Select a partner</option>
                                    {partners.map(partner => (
                                        <option key={partner._id} value={partner._id}>
                                            {partner.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="template" className="block text-sm font-medium text-neutral-700">
                                    Select Template *
                                </label>
                                <select
                                    id="template"
                                    name="template"
                                    value={formData.template}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="">Select a template</option>
                                    {templates.map(template => (
                                        <option key={template._id} value={template._id}>
                                            {template.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-soft p-6">
                        <h2 className="text-lg font-medium text-neutral-900 mb-4">Schedule</h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700">
                                        Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700">
                                        End Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-neutral-700">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="active">Active</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/promotions')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            leftIcon={<Save className="h-4 w-4" />}
                            isLoading={isLoading}
                        >
                            Create Promotion
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PromotionCreator;