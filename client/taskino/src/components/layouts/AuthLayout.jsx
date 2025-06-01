import React from "react";
import { assets } from "../../assets/assets";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-white font-sans">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://videos.pexels.com/video-files/3209552/3209552-uhd_2560_1440_25fps.mp4"
        type="video/mp4"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-orange-600 opacity-60 z-0"></div>
      <div className="relative z-10 flex flex-col justify-between w-full md:w-[55%] px-6 sm:px-10 py-8 text-white bg-transparent">
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md animate-fade-in">{children}</div>
        </main>

        <footer className="text-center text-gray-200 text-sm mt-8 md:mt-12 px-2">
          &copy; {new Date().getFullYear()} SuccessKeyAgency. All rights
          reserved.
        </footer>
      </div>

      <div className="hidden md:flex relative z-10 w-[45%] flex-col items-center justify-center bg-gradient-to-br from-orange-800 via-black to-amber-900 text-white px-6">
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-xs border border-white/20 transition duration-300 hover:scale-105">
          <img
            src={assets.successkey_logo}
            alt="SuccessKeyAgency Logo"
            className="w-50 h-50 mx-auto mb-4 hover:rotate-6 transition-transform duration-300"
          />
          <h2 className="text-2xl font-extrabold tracking-tight">Created by</h2>
          <p className="text-xl font-semibold text-amber-300 mt-1">
            SuccessKeyAgency
          </p>
          <p className="text-sm text-amber-100 mt-3 leading-relaxed">
            Web experiences crafted for performance, beauty, and impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
