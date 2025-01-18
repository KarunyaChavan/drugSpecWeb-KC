import { useState, useEffect } from "react";
import './Auth.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import videoBg1 from "../../assets/videoBg.mp4";
import videoBg2 from "../../assets/videoBg2.mp4";
import videoBg3 from "../../assets/videoBg3.mp4";

function AuthLayout() {
  const videos = [videoBg1, videoBg2, videoBg3];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoFading, setIsVideoFading] = useState(false);
  const [isActive, setIsActive] = useState(false);

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

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
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
          <form className="w-full">
            <h1 className="text-[36px] font-bold font-fit">Login</h1>
            <div className="relative my-[20px] form-control">
              <input type="text" placeholder="Email" className="input-box" />
              <FaEnvelope className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <div className="relative my-[20px] form-control">
              <input type="password" placeholder="Password" className="input-box" />
              <FaLock className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <a href="#" className="text-[14.5px] text-[#333] no-underline">
              Forgot Password?
            </a>
            <button
              type="submit"
              className="w-full h-[48px] bg-[#7494ec] rounded-lg shadow-lg border-none cursor-pointer text-[16px] text-[#fff] font-semibold"
            >
              Login
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
          <form className="w-full">
            <h1 className="text-[36px] font-bold font-fit md:pt-12">Register</h1>
            <div className="relative my-[20px] form-control">
              <input type="text" placeholder="Full Name" className="input-box" />
              <FaUser className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <div className="relative my-[20px] form-control">
              <input type="text" placeholder="Email" className="input-box" />
              <FaEnvelope className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <div className="relative my-[20px] form-control">
              <input type="password" placeholder="Password" className="input-box" />
              <FaLock className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="w-full h-[48px] bg-[#7494ec] rounded-lg shadow-lg border-none cursor-pointer text-[16px] text-[#fff] font-semibold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
