import React, { useState } from 'react';
import axios from 'axios';

const InitView = ({setOpenProjectModal}) => {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xs">
        <h1 className="text-center text-xl font-bold mb-4">
          Open A Project to Continue
        </h1>

          <div className="mb-4">
            <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setOpenProjectModal(true)}
            >
              Open Project
            </button>
          </div>
          </div>
          
      </div>
    </div>
  );
}

export default InitView;
