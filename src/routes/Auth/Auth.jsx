import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import videoBg1 from "../../assets/videoBg.mp4";
import videoBg2 from "../../assets/videoBg2.mp4";
import videoBg3 from "../../assets/videoBg3.mp4";
import supabase from "../../Supabse/supabse";
import QualificationModal from "../../components/Qualification";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function AuthLayout() {
  const videos = [videoBg1, videoBg2, videoBg3];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoFading, setIsVideoFading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qualifications, setQualifications] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const videoInterval = setInterval(() => {
      setIsVideoFading(true);
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
        setIsVideoFading(false);
      }, 1000);
    }, 10000);

    return () => clearInterval(videoInterval);
  }, [videos.length]);

  const handleAddQualification = (qualification) => {
    setQualifications(qualification);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(`Login Error: ${error.message}`);
    } else {
      alert("Login successful!");
      navigate("/profile");
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (isActive && (!qualifications || !qualifications.degree)) {
      alert("Please provide your qualification details.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: isActive ? "hcp" : "patient",
          qualification: isActive ? qualifications : null,
        },
      },
    });
    if (error) {
      alert(`Registration Error: ${error.message}`);
    } else {
      alert("Registration successful! Please verify your email.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8 }}
    >
      <div
        className={`auth-container relative bg-white rounded-[30px] shadow-lg overflow-hidden ${
          isActive ? "active" : ""
        }`}
      >
        {/* Video Background */}
        <div className="absolute w-full h-full toggel-box">
          <video
            className={`video-bg ${isVideoFading ? "fade-out" : ""}`}
            src={videos[currentVideoIndex]}
            autoPlay
            muted
            loop
          ></video>
          <div
            className={`absolute left-0 bg-none w-1/2 h-full flex items-center flex-col justify-center text-center text-white z-10 tg Left
            transition-all duration-700 ease-in-out ${
              isActive ? "-left-[50%] opacity-0 invisible" : "left-0 opacity-100 visible"
            }`}
          >
            <div className="text-[35px] font-bold font-fit">Welcome Back!</div>
            <div className="my-1">Don't Have an Account?</div>
            <button
              className="bg-none text-white p-2 w-1/3 border-2 border-solid border-white rounded-lg"
              onClick={() => setIsActive(true)}
            >
              Register
            </button>
          </div>

          <div
            className={`absolute right-0 bg-none w-1/2 h-full flex items-center flex-col justify-center text-center text-white z-10 tg Right 
            transition-all duration-700 ease-in-out ${
              isActive ? "right-0 opacity-100 visible" : "-right-[50%] opacity-0 invisible"
            }`}
          >
            <div className="text-[35px] font-bold font-fit">Welcome!</div>
            <div className="my-1">Already Have an Account?</div>
            <button
              className="bg-none text-white p-2 w-1/3 border-2 border-solid border-white rounded-lg"
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div
          className={`absolute w-1/2 h-full right-0 flex items-center text-center text-[#333] formbox p-5 
          transition-all duration-[1200ms] ease-in-out ${
            isActive ? "translate-x-full opacity-0 invisible" : "translate-x-0 opacity-100 visible"
          }`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="w-full"
          >
            <h1 className="text-[36px] font-bold font-fit">Login</h1>
            <div className="relative my-[20px] form-control">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-box"
              />
              <FaEnvelope className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <div className="relative my-[20px] form-control">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-box"
              />
              <FaLock className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="w-full h-[48px] bg-[#7494ec] rounded-lg shadow-lg border-none cursor-pointer text-[16px] text-[#fff] font-semibold flex items-center justify-center"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        {/* Register Form */}
        <div
          className={`absolute left-0 w-1/2 h-full flex items-center text-center text-[#333] formbox p-5 
          transition-all duration-[1200ms] ease-in-out ${
            isActive ? "translate-x-0 opacity-100 visible " : "-translate-x-full opacity-0 invisible"
          }`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="w-full"
          >
            <h1 className="text-[36px] font-bold font-fit md:pt-12">Register</h1>
            <div className="relative my-[20px] form-control">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-box"
              />
              <FaUser className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <div className="relative my-[20px] form-control">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-box"
              />
              <FaEnvelope className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <div className="relative my-[20px] form-control">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-box"
              />
              <FaLock className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-white shadow-lg border border-[#7494ec] cursor-pointer text-[16px] text-[#7494ec] h-[40px] w-2/3 mb-4 flex items-center justify-center self-center mx-auto hover:text-white hover:bg-[#7494ec]"
            >
              {qualifications ? "Edit Qualifications" : "Add Qualifications"}
            </div>
            {qualifications && (
              <ul className="list-disc list-inside justify-center flex flex-col text-left">
                <li>Degree: {qualifications.degree}</li>
                <li>Department: {qualifications.department}</li>
                <li>Institution: {qualifications.institution}</li>
              </ul>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] bg-[#7494ec] rounded-lg shadow-lg border-none cursor-pointer text-[16px] text-[#fff] font-semibold flex items-center justify-center"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
        <QualificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddQualification}
        />
      </div>
    </motion.div>
  );
}

export default AuthLayout;
