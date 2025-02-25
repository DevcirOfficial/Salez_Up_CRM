import { useState } from "react";
import Sidebar from "./Layout/SideBar";
import MainContent from "./Layout/MainContent";
import OverallPot from "./Layout/pages/OverallPot"; // Import your components
import PotLevel from "./Layout/pages/Pot"; // Import your components

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null); // State to manage selected component

  // Function to handle sidebar item clicks
  const handleSidebarClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
        onItemClick={handleSidebarClick} // Pass the click handler to Sidebar
      />
      <MainContent selectedComponent={selectedComponent} /> {/* Pass the selected component to MainContent */}
    </div>
  );
};

export default Dashboard;