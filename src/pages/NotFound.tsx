import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-primary-600">404</h1>
                <h2 className="mt-4 text-3xl font-bold text-neutral-900">Page Not Found</h2>
                <p className="mt-2 text-lg text-neutral-600">
                    Sorry, the page you are looking for does not exist.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;