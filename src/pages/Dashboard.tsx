import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileSpreadsheet, Megaphone, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';
import { API_URL } from '../config/constants';

interface DashboardStats {
  partners: number;
  templates: number;
  activePromotions: number;
  totalPromotions: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    partners: 0,
    templates: 0,
    activePromotions: 0,
    totalPromotions: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/dashboard/stats`);
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // For demo purposes, simulate API call with setTimeout
    setTimeout(() => {
      setStats({
        partners: 12,
        templates: 25,
        activePromotions: 8,
        totalPromotions: 42
      });
      setIsLoading(false);
    }, 1000);
    
    // Uncomment to use real API call
    // fetchDashboardData();
  }, []);
  
  const StatCard = ({ title, value, icon, color, link }: { title: string; value: number; icon: React.ReactNode; color: string; link: string }) => (
    <div className="bg-white overflow-hidden shadow-soft rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-neutral-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-neutral-900">{isLoading ? '-' : value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-neutral-50 px-5 py-3">
        <div className="text-sm">
          <Link to={link} className="font-medium text-primary-600 hover:text-primary-500 flex items-center">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Get an overview of your promotion templates and partners
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<FileSpreadsheet className="h-4 w-4" />}
            onClick={() => {}}
          >
            <Link to="/templates/create">New Template</Link>
          </Button>
          <Button
            leftIcon={<Megaphone className="h-4 w-4" />}
            onClick={() => {}}
          >
            <Link to="/promotions/create">New Promotion</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Partners"
          value={stats.partners}
          icon={<Users className="h-5 w-5 text-white" />}
          color="bg-primary-500"
          link="/partners"
        />
        <StatCard
          title="Templates"
          value={stats.templates}
          icon={<FileSpreadsheet className="h-5 w-5 text-white" />}
          color="bg-secondary-500"
          link="/templates"
        />
        <StatCard
          title="Active Promotions"
          value={stats.activePromotions}
          icon={<Megaphone className="h-5 w-5 text-white" />}
          color="bg-accent-500"
          link="/promotions"
        />
        <StatCard
          title="Total Promotions"
          value={stats.totalPromotions}
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="bg-success-500"
          link="/promotions"
        />
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow-soft rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-neutral-900 mb-4">Recent Templates</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      Summer Sale Template
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800">
                        Discount
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      3 days ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to="/templates/1" className="text-primary-600 hover:text-primary-900">
                        View
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      New Product Launch
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accent-100 text-accent-800">
                        Product Launch
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      1 week ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to="/templates/2" className="text-primary-600 hover:text-primary-900">
                        View
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-soft rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-neutral-900 mb-4">Active Promotions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Partner
                    </th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Ends
                    </th>
                    <th className="px-6 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      Summer Discount 25% Off
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      Acme Inc.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      in 2 weeks
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to="/promotions/1" className="text-primary-600 hover:text-primary-900">
                        View
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      Holiday Special
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      TechGadgets
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      in 5 days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to="/promotions/2" className="text-primary-600 hover:text-primary-900">
                        View
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;