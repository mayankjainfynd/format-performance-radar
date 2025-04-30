import React from "react";
import { Bell } from "lucide-react";

const TopBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between h-14 px-2 bg-black text-white w-full border-b border-gray-800">
      <div className="flex items-center gap-3 ml-12">
        <span className="mx-2 h-6 border-l border-gray-500"></span>
        <span className="text-xl font-semibold">Granary</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative focus:outline-none">
          <Bell className="h-6 w-6" />
          {/* Notification dot */}
          <span className="absolute top-1 left-[20px] h-2 w-2 bg-red-500 rounded-full border-2 border-black"></span>
        </button>
        <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1">
          <span className="font-medium">Reliance Retail</span>
          <span className="text-gray-400">Ketan Dhuvad</span>
          <img
            src="https://ui-avatars.com/api/?name=Ketan+Dhuvad&background=0D8ABC&color=fff"
            alt="User Avatar"
            className="h-8 w-8 rounded-full border-2 border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar; 