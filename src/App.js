// Import required dependencies from React, components, assets, and styles
import { useEffect, useState } from "react";
import GanttChart from "./components/GanttChart";
import { data } from "./components/assets/localData";
import "./App.css";

function App() {
  // State to manage the dark mode theme
  const [darkMode, setDarkMode] = useState(true);

  // useEffect to apply the dark or light theme to the body
  useEffect(() => {
    if (darkMode) {
      // Apply dark theme styles to the body
      document.body.style.colorScheme = "dark";
      document.body.style.color = "color-mix(in srgb, Canvas, CanvasText 97%)";
      document.body.style.backgroundColor = "color-mix(in srgb, CanvasText, Canvas 97%)";
    } else {
      // Apply light theme styles to the body
      document.body.style.colorScheme = "light";
      document.body.style.color = "color-mix(in srgb, Canvas, CanvasText 97%)";
      document.body.style.backgroundColor = "color-mix(in srgb, CanvasText, Canvas 97%)";
    }
  }, [darkMode]);

  return (
    <div className="App">
      <div className="header">
        <h1>Gantt Chart</h1>
        <button className="toggleBtn" onClick={() => setDarkMode((darkMode) => !darkMode)}>
          <h3 className="btnText">Toggle Theme</h3>
        </button>
      </div>
      {/**
       * GanttChart component with props:
       * displayText: What is displayed in the card
       *   - diff - difference between start time and current time
       *   - name - Name property in the object passed as a prop
       * data: Local data to be passed to the GanttChart component
       * width: Width of the Gantt chart
       * height: Height of the Gantt chart
       */}
      <GanttChart displayText="diff" data={data} width={1000} height={700} />
    </div>
  );
}

export default App;
