import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, ExternalLink, BarChart3 } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';
import { API_URL } from '../config/constants';

interface Promotion {
    _id: string;
    name: string;
    description: string;
    partner: {
        _id: string;
        name: string;
        logo: string;
    };
    template: {
        _id: string;
        name: string;
    };
    customizedSections: Array<{
        sectionId: string;
        content: any;
    }>;
    status: string;
    startDate: string;
    endDate: string;
    url: string;
    isPublished: boolean;
    analytics: {
        views: number;
        clicks: number;
        conversions: number;
    };
    createdAt: string;
}

const PromotionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [promotion, setPromotion] = useState<Promotion | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/promotions/${id}`, {
                    withCredentials: true
                });
                setPromotion(data);
            } catch (error) {
                console.error('Error fetching promotion:', error);
                navigate('/promotions');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPromotion();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this promotion?')) {
            try {
                await axios.delete(`${API_URL}/promotions/${id}`, {
                    withCredentials: true
                });
                navigate('/promotions');
            } catch (error) {
                console.error('Error deleting promotion:', error);
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft':
                return 'bg-neutral-100 text-neutral-800';
            case 'scheduled':
                return 'bg-primary-100 text-primary-800';
            case 'active':
                return 'bg-success-100 text-success-800';
            case 'ended':
                return 'bg-error-100 text-error-800';
            case 'archived':
                return 'bg-neutral-100 text-neutral-800';
            default:
                return 'bg-neutral-100 text-neutral-800';
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!promotion) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Promotion not found</h2>
                <p className="text-neutral-600 mb-4">The promotion you're looking for doesn't exist or has been removed.</p>
                <Button onClick={() => navigate('/promotions')}>
                    Back to Promotions
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
                        onClick={() => navigate('/promotions')}
                        className="mr-4 text-neutral-500 hover:text-neutral-700"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold text-neutral-900">{promotion.name}</h1>
                        <p className="text-sm text-neutral-600">
                            Created on {formatDate(promotion.createdAt)}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button
                        variant="outline"
                        leftIcon={<Edit className="h-4 w-4" />}
                        onClick={() => navigate(`/promotions/${id}/edit`)}
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

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow-soft p-6">
                        <div className="flex items-center mb-6">
                            {promotion.partner.logo ? (
                                <img
                                    src={promotion.partner.logo}
                                    alt={promotion.partner.name}
                                    className="h-16 w-16 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="h-16 w-16 rounded-lg bg-neutral-100 flex items-center justify-center">
                                    <span className="text-neutral-400 text-xl font-medium">
                                        {promotion.partner.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-neutral-900">{promotion.name}</h2>
                                <p className="text-neutral-600">{promotion.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500 mb-2">Promotion Details</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm text-neutral-500">Partner:</span>
                                        <p className="text-neutral-900">{promotion.partner.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-neutral-500">Template:</span>
                                        <p className="text-neutral-900">{promotion.template.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-neutral-500">Status:</span>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${getStatusColor(promotion.status)}`}>
                                            {promotion.status.charAt(0).toUpperCase() + promotion.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-neutral-500 mb-2">Duration</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm text-neutral-500">Start Date:</span>
                                        <p className="text-neutral-900">{formatDate(promotion.startDate)}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-neutral-500">End Date:</span>
                                        <p className="text-neutral-900">{formatDate(promotion.endDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {promotion.url && (
                            <div className="mt-6 pt-6 border-t border-neutral-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-900">Promotion URL</h3>
                                        <p className="text-sm text-neutral-500">{promotion.url}</p>
                                    </div>
                                    <a
                                        href={promotion.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-primary-600 hover:text-primary-700"
                                    >
                                        Visit <ExternalLink className="ml-1 h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Preview */}
                    <div className="bg-white rounded-lg shadow-soft p-6">
                        <h3 className="text-lg font-medium text-neutral-900 mb-4">Preview</h3>
                        <div className="aspect-video bg-neutral-100 rounded-lg"></div>
                    </div>
                </div>

                {/* Analytics & Stats */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-soft p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-neutral-900">Analytics</h3>
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<BarChart3 className="h-4 w-4" />}
                            >
                                Full Report
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-neutral-700">Views</span>
                                    <span className="text-sm text-neutral-900">{promotion.analytics.views}</span>
                                </div>
                                <div className="h-2 bg-neutral-100 rounded-full">
                                    <div
                                        className="h-2 bg-primary-500 rounded-full"
                                        style={{ width: `${(promotion.analytics.views / 1000) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-neutral-700">Clicks</span>
                                    <span className="text-sm text-neutral-900">{promotion.analytics.clicks}</span>
                                </div>
                                <div className="h-2 bg-neutral-100 rounded-full">
                                    <div
                                        className="h-2 bg-secondary-500 rounded-full"
                                        style={{ width: `${(promotion.analytics.clicks / promotion.analytics.views) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-neutral-700">Conversions</span>
                                    <span className="text-sm text-neutral-900">{promotion.analytics.conversions}</span>
                                </div>
                                <div className="h-2 bg-neutral-100 rounded-full">
                                    <div
                                        className="h-2 bg-success-500 rounded-full"
                                        style={{ width: `${(promotion.analytics.conversions / promotion.analytics.clicks) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-soft p-6">
                        <h3 className="text-lg font-medium text-neutral-900 mb-4">Activity Log</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="h-2 w-2 rounded-full bg-primary-500 mt-2"></div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-neutral-900">Promotion created</p>
                                    <p className="text-xs text-neutral-500">{formatDate(promotion.createdAt)}</p>
                                </div>
                            </div>
                            {promotion.isPublished && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-success-500 mt-2"></div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-neutral-900">Promotion published</p>
                                        <p className="text-xs text-neutral-500">{formatDate(promotion.startDate)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionDetail;