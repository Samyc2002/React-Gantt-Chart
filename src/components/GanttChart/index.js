import React, { useEffect, useRef, useState } from "react";
import { addDays, differenceInDays } from "date-fns";

import Tabs from "../Tabs";
import styles from "./style.module.css";

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
const GanttChart = ({ displayText, tasks }) => {
  // Calculate the total number of days to be displayed on the chart.
  const [days, setDays] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const tabRefs = useRef([]);

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

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

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

  const getTextWidth = (text, fontFamily, fontSize) => {
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.whiteSpace = "nowrap";
    tempDiv.style.fontFamily = fontFamily;
    tempDiv.style.fontSize = fontSize;
    tempDiv.textContent = text;
    document.body.appendChild(tempDiv);
    const width = tempDiv.clientWidth;
    document.body.removeChild(tempDiv);
    return width;
  };

  const formatText = (text, width) => {
    const fontFamily = "Arial";
    const fontSize = "14px";
    var textWidth = getTextWidth(text, fontFamily, fontSize);
    const suffix = "...";

    if (textWidth <= width) {
      return text;
    }

    let cutOffIndex = text.length;
    let formattedText = text + suffix;
    textWidth = getTextWidth(formattedText, fontFamily, fontSize);

    while (textWidth > width && cutOffIndex > 0) {
      cutOffIndex--;
      const newText = text.substring(0, cutOffIndex) + suffix;
      textWidth = getTextWidth(newText, fontFamily, fontSize);
      formattedText = newText;
    }

    return formattedText;
  };

  const getDisplayText = (task, width) => {
    if (!displayText) return "";
    else {
      switch (displayText) {
        case "diff":
          var diffTime = differenceInDays(
            new Date(task.startDate),
            new Date(),
          );
          var prefix = diffTime >= 0 ? "" : "Started";
          var suffix = diffTime >= 0 ? "to go" : "ago";
          return formatText(
            `${prefix} ${diffTime} day${diffTime === 1 ? "" : "s"} ${suffix}`,
            width,
          );
        case "name":
          return task.name;
        default:
          break;
      }
    }
  };

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

  const tabsArray = [
    {
      label: "2 Weeks",
      foreground: "#512DA8",
      background: "#D1C4E9",
    },
    {
      label: "1 Month",
      foreground: "#5D4037",
      background: "#D7CCC8",
    },
    {
      label: "1 Quarter",
      foreground: "#00796B",
      background: "#B2DFDB",
    },
  ];

  return (
    <>
      <Tabs
        tabsArray={tabsArray}
        tabValue={tabValue}
        tabRefs={tabRefs}
        handleTabChange={handleTabChange}
      />
      <div className={styles.parent}>
        <div className={styles.ganttChart}>
          <div
            className={styles.ganttChartHeader}
            ref={headerRef}
            style={{ backgroundColor: tabsArray[tabValue].foreground }}
          >
            <div
              className={styles.ganttChartDays}
              style={{ width: `${days * (dayWidth + 2) + 1}px` }}
            >
              {Array.from({ length: days }, (_, i) => {
                const date = addDays(new Date(tasks[0].startDate), i);
                return (
                  <div
                    key={i}
                    className={styles.ganttChartDay}
                    style={{ width: `${dayWidth + 2}px` }}
                  >
                    {formatDate(date)}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={styles.ganttChartBody}
            style={{
              width: days * (dayWidth + 2) + 2,
            }}
            ref={bodyRef}
            onScroll={handleScroll}
          >
            {tasks.map((task) => (
              <div key={task.id} className={styles.ganttChartRow}>
                <div className={styles.ganttChartTaskRow}>
                  <div
                    className={styles.ganttChartTask}
                    style={{
                      marginLeft: `${
                        (getDateOffset(task.startDate) * dayWidth) +
                        (getDateOffset(task.startDate) * borderWidth * 2)
                      }px`,
                      width: `${task.duration * (dayWidth + 2)}px`,
                      backgroundColor: task.color,
                    }}
                  >
                    {getDisplayText(task, task.duration * dayWidth)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GanttChart;
