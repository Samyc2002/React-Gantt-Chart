import React, { useEffect, useRef, useState } from "react";
import { addDays, differenceInDays, format, isWeekend } from "date-fns";
import "./style.css";

const GanttChart = ({ tasks }) => {
  const getDateOffset = (date) => {
    const startDate = tasks[0].startDate;
    return differenceInDays(new Date(date), new Date(startDate));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    return `${month}\n${day}`;
  };

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

  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  const dayWidth = 50;
  const borderWidth = 1;

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
