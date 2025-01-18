import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/drugSpecIcon white.png";
import { motion } from "framer-motion";

function Header({ isHeaderFading }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Auth");
  };

  return (
    <motion.div
      className={`header flex justify-between items-center px-5 py-3 relative ${
        isHeaderFading ? "fade-out" : "fade-in"
      }`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isHeaderFading ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      {/* Placeholder for proper spacing */}
      <div className="flex-1">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-xl font-semibold text-gray-800"
        >
          Food
          <span className="text-[#0a7ea4] font-cursive font-bold text-2xl mx-1">
            Rx
          </span>
          Check
        </motion.div>
      </div>

      {/* Logo Section */}
      <div className="flex-1 flex justify-center items-center">
        <img src={logo} alt="Logo" className="logo w-[80px] h-auto" />
      </div>

      {/* Sign-In Button Section */}
      <div
        className="flex-1 flex justify-end relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="elegant-button text-black border-b border-black px-3 py-2 text-sm font-medium transition-transform duration-300"
        >
          Sign In
        </motion.button>

        {/* Dropdown Menu */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-10 right-0 w-48 text-sm bg-white/40 backdrop-blur-lg shadow-lg border border-gray-400 rounded-lg overflow-hidden transition-opacity duration-300"
          >
            <div className="dropdown-item px-4 py-3 hover:bg-gray-200 text-black cursor-pointer">
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
    </motion.div>
  );
}

export default Header;
