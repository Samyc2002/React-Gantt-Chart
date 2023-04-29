import React, { useEffect, useRef, useState } from "react";
import { addDays, differenceInDays } from "date-fns";

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
const GanttChart = ({ displayText, data, tasks, height, width: containerWidth }) => {
  // Calculate the total number of days to be displayed on the chart.
  const width = containerWidth * 0.6;
  const borderWidth = 1;

  const [days, setDays] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [dayWidth, setDayWidth] = useState(width / 14 - 2);

  // Keep references to the header and body of the Gantt chart for handling scroll events.
  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    setDays(getDaysInThisQuarter());

    bodyRef.current.scrollLeft =
      Math.abs(differenceInDays(startDate, new Date(addDays(new Date(), -6)))) *
      (dayWidth + 2 * borderWidth);
  }, []);

  const getCurrQuarter = () => {
    return Math.ceil((new Date().getMonth() + 1) / 3);
  };

  const getQuarterMonths = () => {
    switch (getCurrQuarter()) {
      case 1:
        return ["Jan", "Feb", "Mar"];
      case 2:
        return ["Apr", "May", "Jun"];
      case 3:
        return ["Jul", "Aug", "Sep"];
      case 4:
        return ["Oct", "Nov", "Dec"];

      default:
        break;
    }
  };

  const getDaysInThisQuarter = () => {
    const isLeapYear = () => {
      return new Date(new Date().getFullYear(), 1, 29).getDate() === 29;
    };

    const currQuarter = getCurrQuarter();
    switch (currQuarter) {
      case 1:
        return 90 + isLeapYear();
      case 2:
        return 91;
      default:
        return 92;
    }
  };

  const handleTabChange = (newValue) => {
    const getDaysInThisMonth = () => {
      return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    };

    setTabValue(newValue);
    switch (newValue) {
      case 0:
        setDayWidth(width / 14 - 2);
        setDays(getDaysInThisQuarter());
        bodyRef.current.scrollLeft =
          Math.abs(differenceInDays(startDate, new Date(addDays(new Date(), -6)))) *
          (width / 14 - 2 + 2 * borderWidth);
        break;
      case 1:
        var numDays = getDaysInThisMonth() / 7;
        setDayWidth(width / numDays - 2);
        setDays(getDaysInThisQuarter() / 7);
        var split = numDays % 2 === 0 ? numDays / 2 - 1 : Math.floor(numDays / 2);
        bodyRef.current.scrollLeft =
          Math.floor(
            Math.abs(differenceInDays(startDate, new Date(addDays(new Date(), -split * 7)))) / 7
          ) *
          (width / numDays - 2 + 2 * borderWidth);
        break;
      case 2:
        numDays = getDaysInThisQuarter() / 30;
        setDayWidth(width / numDays - 2);
        setDays(getDaysInThisQuarter() / 30);
        split = numDays % 2 === 0 ? numDays / 2 - 1 : Math.floor(numDays / 2);
        bodyRef.current.scrollLeft = 0;
        break;
    }
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
          var diffTime = differenceInDays(new Date(task.startDate), new Date());
          var prefix = diffTime >= 0 ? "" : "Started";
          var suffix = diffTime >= 0 ? "to go" : "ago";
          return formatText(
            `${prefix} ${diffTime >= 0 ? diffTime : -diffTime} day${
              diffTime === 1 ? "" : "s"
            } ${suffix}`,
            width
          );
        case "name":
          return task.name;
        default:
          break;
      }
    }
  };

  // Synchronize the scroll position of the header and the body of the Gantt chart.
  const handleScroll = (e) => {
    const { scrollLeft } = e.target;
    headerRef.current.scrollLeft = scrollLeft;
  };

  const tabsArray = [
    {
      label: "2 Weeks",
      foreground: "#512DA8",
      background: "#D1C4E9"
    },
    {
      label: "1 Month",
      foreground: "#5D4037",
      background: "#D7CCC8"
    },
    {
      label: "1 Quarter",
      foreground: "#00796B",
      background: "#B2DFDB"
    }
  ];

  const startDate = new Date(
    new Date().getFullYear(),
    Math.floor(new Date().getMonth() / 3) * 3,
    1
  );
  const startOffset = getDateOffset(startDate);

  return (
    <div className={styles.root} style={{ width: `${containerWidth}px` }}>
      <div className={styles.projects}>
        <h1>Projects</h1>
        {data?.map((project, id) => {
          return (
            <div key={id}>{project?.name}</div>
          )
        })}
      </div>
      <div className={styles.chartContainer}>
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
              const date = addDays(new Date(startDate), i);
              return (
                <div
                  key={i}
                  className={styles.ganttChartDay}
                  style={{ width: `${dayWidth + 2}px` }}
                >
                  <h4 align="center">
                    {tabValue === 0 && formatDate(date)}
                    {tabValue === 1 && `Week\n${i + 1}`.toUpperCase()}
                    {tabValue === 2 && getQuarterMonths()[i].toUpperCase()}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <div className={styles.parent} ref={bodyRef} onScroll={handleScroll}>
          <div
            className={styles.ganttChart}
            ref={bodyRef}
            style={{ height: `${height}px`, width: `${width + 2}px` }}
          >
            <div
              className={styles.ganttChartBody}
              style={{
                width: days * (dayWidth + 2) + 2
              }}
            >
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={styles.ganttChartRow}
                  style={{ backgroundSize: `${dayWidth + 2}px 100%` }}
                >
                  <div className={styles.ganttChartTaskRow}>
                    <div
                      className={styles.ganttChartTask}
                      style={{
                        marginLeft: `${
                          startOffset +
                          getDateOffset(task.startDate) *
                            (tabValue === 1
                              ? dayWidth / 7
                              : tabValue === 2
                              ? dayWidth / 30
                              : dayWidth) +
                          getDateOffset(task.startDate) * borderWidth * 2
                        }px`,
                        width: `${
                          task.duration *
                          (tabValue === 1
                            ? dayWidth / 7 + 2
                            : tabValue === 2
                            ? dayWidth / 30 + 2
                            : dayWidth + 2)
                        }px`,
                        backgroundColor: task.color
                      }}
                    >
                      {getDisplayText(
                        task,
                        task.duration *
                          (tabValue === 1
                            ? dayWidth / 7 + 2
                            : tabValue === 2
                            ? dayWidth / 30 + 2
                            : dayWidth + 2)
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.nextTab}
        onClick={() => handleTabChange(tabValue === 2 ? 0 : tabValue + 1)}
      >
        Next
      </div>
    </div>
  );
};

export default GanttChart;
