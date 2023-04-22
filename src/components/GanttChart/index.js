import React, { useEffect, useRef, useState } from "react";
import { addDays, differenceInDays } from "date-fns";
import "./style.css";

/**
 * GanttChart component is a simple Gantt chart implementation using React.
 * It receives an array of tasks and displays them in a scrollable Gantt chart.
 *
 * @param {Array} tasks - Array of task objects with the following properties:
 *  - id: Unique identifier for the task.
 *  - name: Task name (displayed on the task bar).
 *  - startDate: Task start date (format: YYYY-MM-DD).
 *  - duration: Task duration in days.
 *  - color: Task bar color.
 */
const GanttChart = ({ tasks }) => {
  // Calculate the difference in days between the given date and the start date of the first task.
  const getDateOffset = (date) => {
    const startDate = tasks[0].startDate;
    return differenceInDays(new Date(date), new Date(startDate));
  };

  // Format the date as "MMM\ndd".
  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" }).toUpperCase();
    const day = d.getDate();
    return `${month}\n${day}`;
  };

  // Calculate the total number of days to be displayed on the chart.
  const [days, setDays] = useState(0);
  useEffect(() => {
    let endDate = days;
    tasks.forEach((task) => {
      endDate = Math.max(
        endDate,
        getDateOffset(task.startDate) + task.duration,
      );
    });
    setDays(endDate);
  }, [tasks]);

  // Keep references to the header and body of the Gantt chart for handling scroll events.
  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  const dayWidth = 50;
  const borderWidth = 1;

  // Synchronize the scroll position of the header and the body of the Gantt chart.
  const handleScroll = (e) => {
    const { scrollLeft } = e.target;
    headerRef.current.scrollLeft = scrollLeft;
  };

  return (
    <div className="gantt-chart">
      <div className="gantt-chart-header" ref={headerRef}>
        <div className="gantt-chart-days">
          {Array.from({ length: days }, (_, i) => {
            const date = addDays(new Date(tasks[0].startDate), i);
            return (
              <div
                key={i}
                className={`gantt-chart-day`}
                style={{ width: `${dayWidth + 2}px` }}
              >
                {formatDate(date)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="gantt-chart-body" ref={bodyRef} onScroll={handleScroll}>
        {tasks.map((task) => (
          <div key={task.id} className="gantt-chart-row">
            <div className="gantt-chart-task-row">
              <div
                className="gantt-chart-task"
                style={{
                  marginLeft: `${
                    (getDateOffset(task.startDate) * dayWidth) +
                    (getDateOffset(task.startDate) * borderWidth * 2)
                  }px`,
                  width: `${task.duration * dayWidth}px`,
                  backgroundColor: task.color,
                }}
              >
                {task.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
