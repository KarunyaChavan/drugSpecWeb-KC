import { useState } from 'react';
import { Link } from 'react-router';
import logo from '../../assets/drugSpecIcon white.png';

function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="header p-3 flex justify-between items-center px-5 relative">
      <img src={logo} alt="Logo" className="logo w-[120px] h-auto" />
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="elegant-button relative text-black border-b border-black px-3 py-2 text-sm font-medium transition-transform duration-400 transform hover:scale-95"
        >
          Sign In
        </button>

        {isHovered && (
          <div
            className="absolute top-10 right-0 w-48 text-sm bg-white/40 backdrop-blur-lg shadow-lg border border-gray-400 rounded-lg overflow-hidden transition-opacity duration-300"
          >
            <div
              className="dropdown-item px-4 py-3 hover:bg-gray-200 text-black cursor-pointer"
            >
              Sign In as Patient
            </div>
            <div
              className="dropdown-item px-4 py-3 hover:bg-gray-200 text-black cursor-pointer"
            >
              <Link to={'/Auth'}>Sign In as HCP</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;