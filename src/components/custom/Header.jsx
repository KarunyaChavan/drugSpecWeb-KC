import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/drugSpecIcon white.png';
import { motion } from 'framer-motion';

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/Auth');
  };

  return (
    <div className="header p-3 flex justify-between items-center px-5 relative">
      <img src={logo} alt="Logo" className="logo w-[120px] h-auto" />
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="elegant-button relative text-black border-b border-black px-3 py-2 text-sm font-medium transition-transform duration-400"
        >
          Sign In
        </motion.button>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-10 right-0 w-48 text-sm bg-white/40 backdrop-blur-lg shadow-lg border border-gray-400 rounded-lg overflow-hidden transition-opacity duration-300"
          >
            <div
              className="dropdown-item px-4 py-3 hover:bg-gray-200 text-black cursor-pointer"
            >
              Sign In as Patient
            </div>
            <div
              className="dropdown-item px-4 py-3 hover:bg-gray-200 text-black cursor-pointer"
              onClick={handleNavigate}
            >
              Sign In as HCP
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Header;
