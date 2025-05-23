import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, ArrowDownAZ, RefreshCcw } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';
import { API_URL, PROMOTION_STATUS } from '../config/constants';

interface Promotion {
    _id: string;
    name: string;
    description: string;
    partner: {
        _id: string;
        name: string;
    };
    template: {
        _id: string;
        name: string;
    };
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

const Promotions = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/promotions`, {
                    withCredentials: true
                });
                setPromotions(data);
            } catch (error) {
                console.error('Error fetching promotions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPromotions();
    }, []);

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
            month: 'short',
            day: 'numeric'
        });
    };

    // Filter and sort promotions
    const filteredPromotions = promotions
        .filter(promotion => {
            const matchesSearch = promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                promotion.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus ? promotion.status === filterStatus : true;

            return matchesSearch && matchesStatus;
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
                    <h1 className="text-2xl font-semibold text-neutral-900">Promotions</h1>
                    <p className="mt-1 text-sm text-neutral-600">
                        Create and manage your promotional campaigns
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Button
                        leftIcon={<Plus className="h-4 w-4" />}
                        onClick={() => { }}
                    >
                        <Link to="/promotions/create">Create Promotion</Link>
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
                        placeholder="Search promotions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <select
                            className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="draft">Draft</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="active">Active</option>
                            <option value="ended">Ended</option>
                            <option value="archived">Archived</option>
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
                            setFilterStatus('');
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
            ) : filteredPromotions.length === 0 ? (
                <div className="bg-white rounded-lg shadow-soft p-8 text-center">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">No promotions found</h3>
                    <p className="text-neutral-600 mb-4">
                        {searchQuery || filterStatus
                            ? "Try adjusting your search or filters to find what you're looking for."
                            : "Create your first promotion to get started."}
                    </p>
                    {!searchQuery && !filterStatus && (
                        <Button>
                            <Link to="/promotions/create">Create Promotion</Link>
                        </Button>
                    )}
                </div>
            ) : (
                <div className="bg-white shadow-soft rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200">
                            <thead className="bg-neutral-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Promotion
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Partner
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Analytics
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-neutral-200">
                                {filteredPromotions.map((promotion) => (
                                    <tr key={promotion._id} className="hover:bg-neutral-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-neutral-900">
                                                        {promotion.name}
                                                    </div>
                                                    <div className="text-sm text-neutral-500">
                                                        {promotion.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-neutral-900">{promotion.partner.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(promotion.status)}`}>
                                                {promotion.status.charAt(0).toUpperCase() + promotion.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-neutral-900">
                                                {formatDate(promotion.startDate)}
                                            </div>
                                            <div className="text-sm text-neutral-500">
                                                to {formatDate(promotion.endDate)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-4">
                                                <div>
                                                    <div className="text-xs text-neutral-500">Views</div>
                                                    <div className="text-sm font-medium text-neutral-900">{promotion.analytics.views}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-neutral-500">Clicks</div>
                                                    <div className="text-sm font-medium text-neutral-900">{promotion.analytics.clicks}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-neutral-500">Conversions</div>
                                                    <div className="text-sm font-medium text-neutral-900">{promotion.analytics.conversions}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                to={`/promotions/${promotion._id}`}
                                                className="text-primary-600 hover:text-primary-900"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Promotions;