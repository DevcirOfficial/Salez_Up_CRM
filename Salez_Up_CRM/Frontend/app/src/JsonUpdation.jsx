// Frontend: EditableTable.js
import React, { useEffect, useState } from "react";

const EditableTable = () => {
    const [tableData, setTableData] = useState({});
    const [isSaving, setIsSaving] = useState(false);
  
    useEffect(() => {
      const savedData = localStorage.getItem("TestingJson");
      if (savedData) {
        setTableData(JSON.parse(savedData));
      } else {
        fetch("/api/testing-json")
          .then((response) => response.json())
          .then((data) => {
            setTableData(data);
            localStorage.setItem("TestingJson", JSON.stringify(data));
          })
          .catch((error) => console.error("Error loading data:", error));
      }
    }, []);
  
    const handleEdit = (dayKey, dayName, index, value) => {
      const updatedData = { ...tableData };
      updatedData[dayKey][dayName][index] = value;
      setTableData(updatedData);
    };
  
    const handleSave = async () => {
      try {
        setIsSaving(true);
        
        // Update the JSON file on the server
        const response = await fetch('/api/updateJson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify(tableData)
        });
  
        if (!response.ok) {
          throw new Error('Failed to update JSON file');
        }
  
        const result = await response.json();
        
        // If server update is successful, update localStorage
        localStorage.setItem("TestingJson", JSON.stringify(tableData));
        alert("Data saved successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Failed to save data. Please try again.");
      } finally {
        setIsSaving(false);
      }
    };
  

  return (
    <div className="p-5">
      <h2 className="mb-4 text-xl font-bold">Editable Data Table</h2>
      <table className="w-full text-center border border-collapse border-gray-400">
        <thead>
          <tr>
            <th className="p-2 border border-gray-400">Day</th>
            <th className="p-2 border border-gray-400">Values</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tableData).map(([dayKey, dayData]) => {
            const [dayName, values] = Object.entries(dayData)[0];
            return (
              <tr key={dayKey} className="border border-gray-400">
                <td className="p-2 border border-gray-400">{dayName}</td>
                <td className="p-2 border border-gray-400">
                  {values.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleEdit(dayKey, dayName, index, e.target.value)
                      }
                      className="w-24 p-1 m-1 text-center border border-gray-300"
                    />
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditableTable;
