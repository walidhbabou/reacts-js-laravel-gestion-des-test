import React from 'react';

const SimplePageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="bg-blue-400 h-20"></div>

      {/* About me section */}
      <div className="bg-blue-50 p-4 border-b border-gray-300 flex justify-center items-center">
        <span className="text-blue-700 text-2xl font-semibold">About me</span>
      </div>

      {/* Mes projets section */}
      <div className="bg-blue-50 p-4 border-b border-gray-300 flex justify-center items-center">
        <span className="text-red-600 text-2xl font-semibold">Mes projets</span>
      </div>

      {/* Bottom bar */}
      <div className="bg-blue-400 h-20"></div>
    </div>
  );
};

export default SimplePageLayout; 