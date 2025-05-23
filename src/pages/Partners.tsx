import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, ArrowDownAZ, RefreshCcw, Building2 } from 'lucide-react';
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
  active: boolean;
  createdAt: string;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/partners`, {
          withCredentials: true
        });
        setPartners(data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Filter and sort partners
  const filteredPartners = partners
    .filter(partner => {
      const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus ? String(partner.active) === filterStatus : true;

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
          <h1 className="text-2xl font-semibold text-neutral-900">Partners</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Manage your partner relationships and collaborations
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => {}}
          >
            <Link to="/partners/create">Add Partner</Link>
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
            placeholder="Search partners..."
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
              <option value="true">Active</option>
              <option value="false">Inactive</option>
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
      ) : filteredPartners.length === 0 ? (
        <div className="bg-white rounded-lg shadow-soft p-8 text-center">
          <div className="mx-auto h-12 w-12 text-neutral-400">
            <Building2 className="h-12 w-12" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-neutral-900">No partners found</h3>
          <p className="mt-2 text-neutral-600">
            {searchQuery || filterStatus
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Get started by adding your first partner."}
          </p>
          {!searchQuery && !filterStatus && (
            <div className="mt-6">
              <Button>
                <Link to="/partners/create">Add Partner</Link>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-soft rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Partner
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredPartners.map((partner) => (
                  <tr key={partner._id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {partner.logo ? (
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                              <span className="text-neutral-500 font-medium">
                                {partner.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">
                            {partner.name}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {partner.website}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{partner.contactName}</div>
                      <div className="text-sm text-neutral-500">{partner.contactEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        partner.active
                          ? 'bg-success-100 text-success-800'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {partner.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(partner.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/partners/${partner._id}`}
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

export default Partners;