import { Flame, TrendingUp, Users, X, Home } from "lucide-react"; // Import relevant icons

const Sidebar = ({ isOpen, toggleSidebar, onItemClick }) => {
  return (
    <div
      className={`bg-white shadow-2xl p-4 h-screen transition-all ${
        isOpen ? "w-[300px]" : "w-16"
      } overflow-hidden flex flex-col`}
    >
      <button
        className="self-end mb-6 text-xl text-themeGreen"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Home />} {/* Toggle button */}
      </button>

      <div className="flex flex-col items-center space-y-4 text-center">
        {[
          { label: "Overall Pot", icon: <Flame className="text-white" />, key: "OverallPot" },
          { label: "Pot Level", icon: <TrendingUp className="text-white" />, key: "PotLevel" },
        ].map(({ label, icon, key }) => (
          <button
            key={key}
            className={`flex items-center w-full p-3  rounded-md transition-transform duration-300 hover:scale-105 text-center bg-themeGreen ${
              isOpen ? "justify-start space-x-3 px-4 text-center" : "justify-center"
            }`}
            onClick={() => onItemClick(key)}
          >
            {icon}
            {isOpen && <p className="font-semibold text-white">{label}</p>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
