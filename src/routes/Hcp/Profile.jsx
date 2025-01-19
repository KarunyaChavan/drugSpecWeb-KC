import React from 'react';
import { useAuth } from "../../context/AuthProvider";
import supabase from '../../Supabse/supabse';

const Profile = () => {
  const { user } = useAuth();

  let qualificationData = null;
  try {
    qualificationData = user?.qualification ? JSON.parse(user.qualification) : null;
  } catch (error) {
    console.error("Error parsing qualification data:", error);
  }

  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]'>
      <div className="h-[550px] w-[40%] relative bg-gradient-to-r from-[#c9d6ff]   rounded-[30px] shadow-lg ">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>

      {/* Profile Section */}
      <div className="flex w-1/2 self-center mx-auto mb-6">
        <div className="flex items-center justify-center w-16 h-16 text-4xl text-white bg-blue-500 rounded-full shadow-lg">
          {user?.full_name?.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="text-gray-500">Welcome</p>
          <h2 className="text-xl font-bold text-gray-800">{user?.full_name}</h2>
        </div>
      </div>

      {/* Role Section */}
      <div className="flex justify-center mb-8">
        <span className="px-4 py-2 text-white bg-blue-400 rounded-lg shadow">
          {user?.role === 'patient' ? 'Patient' : 'Healthcare Professional'}
        </span>
      </div>

      {/* Qualification Section */}
      {qualificationData && (
        <div className="p-4 bg-white w-1/2 flex flex-col self-center mx-auto rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-blue-500 mb-4 text-center">
            Qualification Details
          </h3>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Degree: </span>
            {qualificationData.degree}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Department: </span>
            {qualificationData.department}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Institution: </span>
            {qualificationData.institution}
          </p>
        </div>
      )}

      {/* Sign Out Button */}
      <button
        onClick={() => supabase.auth.signOut()}
        className="w-1/2 mt-6 flex items-center justify-center self-center mx-auto px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600"
      >
        Sign out
      </button>
    </div>
    </div>
  );
};

export default Profile;
