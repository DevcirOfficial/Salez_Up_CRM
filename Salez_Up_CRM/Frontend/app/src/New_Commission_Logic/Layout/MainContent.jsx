import OverallPot from "./pages/OverallPot"; // Import your components
import PotLevel from "./pages/Pot"; // Import your components
// import LevelandAgents from "./pages/LevelandAgents";

const MainContent = ({ selectedComponent }) => {
  return (
    <div className="flex-1 p-6 bg-gray-100 rounded-lg">
      <h1 className="px-16 py-2 mx-auto text-lg font-bold text-center bg-white border-2 rounded-lg shadow-2xl w-fit border-[#1d8675]">
        {selectedComponent === "OverallPot" ? "Overall Pot" : selectedComponent === "PotLevel" ? "Pot Level" : "Dashboard"}
      


      </h1>
      <div className="mt-6 text-center text-gray-700">
        {selectedComponent === "OverallPot" && <OverallPot />} {/* Render OverallPot component */}
        {selectedComponent === "PotLevel" && <PotLevel />} {/* Render PotLevel component */}
        {!selectedComponent && <p>Select an option from the sidebar to view content.</p>} {/* Default message */}
      </div>
    </div>
  );
};

export default MainContent;