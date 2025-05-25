import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`${isActive('/') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Home
            </Link>
            <Link
              to="/visitorlist"
              className={`${isActive('/visitorlog') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Visitor List
            </Link>
            <Link
              to="/visitorlog"
              className={`${isActive('/visitorlog') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Visitor Log
            </Link>
            <Link
              to="/login"
              className={`${isActive('/login') ? 'bg-indigo-600 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'} inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`${isActive('/login') ? 'bg-indigo-600 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'} inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;