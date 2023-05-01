import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addDays, differenceInDays, differenceInHours } from "date-fns";

import styles from "./style.module.css";
import ProjectCard from "../ProjectCard";

/* GanttChart component is a simple Gantt chart implementation using React.
 *  It receives an array of tasks and displays them in a scrollable Gantt chart.
 *  @param {Array} tasks - Array of task objects with the following properties:
 *   - id: Unique identifier for the task.
 *   - name: Task name (displayed on the task bar).
 *   - startDate: Task start date (format: YYYY-MM-DD).
 *   - duration: Task duration in days.
 *   - color: Task bar color.
 */
const GanttChart = ({ displayText, data, height, width: containerWidth }) => {
  // Width of the chart adn borders
  const width = containerWidth * 0.6;
  const borderWidth = 1;

  // Calculate the start date for the Gantt chart.
  const startDate = useMemo(
    () => new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3, 1),
    []
  );

  // Calculate the difference in days between the given date and the start date of the first task.
  const getDateOffset = (date) => {
    return differenceInDays(new Date(date), new Date(startDate));
  };

  // Calculate the number of days in the current quarter.
  const getDaysInThisQuarter = useCallback(() => {
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
  }, []);

  // Calculate the start offset.
  const startOffset = getDateOffset(startDate);

  // Calculate the total number of days to be displayed on the chart.
  const [days, setDays] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [dayWidth, setDayWidth] = useState(width / 14 - 2);

  // Keep references to the header and body of the Gantt chart for handling scroll events.
  const projectsRef = useRef(null);
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
        return ["JAN", "FAB", "MAR"];
      case 2:
        return ["APR", "MAY", "JUN"];
      case 3:
        return ["JUL", "AUG", "SEP"];
      case 4:
        return ["OCT", "NOV", "DEC"];

      default:
        break;
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
        setTimeout(() => {
          bodyRef.current.scrollLeft =
            Math.abs(differenceInDays(startDate, new Date(addDays(new Date(), -6)))) *
            (width / 14 - 2 + 2 * borderWidth);
        }, 50);
        break;
      case 1:
        var numDays = getDaysInThisMonth() / 7;
        setDayWidth(width / numDays - 2);
        setDays(getDaysInThisQuarter() / 7);
        var split = numDays % 2 === 0 ? numDays / 2 - 1 : Math.floor(numDays / 2);
        setTimeout(() => {
          bodyRef.current.scrollLeft =
            Math.floor(
              Math.abs(differenceInDays(startDate, new Date(addDays(new Date(), -split)))) / 7
            ) *
            (width / numDays + 2 * borderWidth);
        }, 50);
        break;
      case 2:
        numDays = getDaysInThisQuarter() / 30;
        setDayWidth(width / numDays - 2);
        setDays(getDaysInThisQuarter() / 30);
        split = numDays % 2 === 0 ? numDays / 2 - 1 : Math.floor(numDays / 2);
        setTimeout(() => {
          bodyRef.current.scrollLeft = 0;
        }, 50);
        break;
      default:
        break;
    }
  };

  // Format the date as "MMM\ndd".
  const formatDate = (date, i) => {
    switch (tabValue) {
      case 0:
        const d = new Date(date);
        const month = d.toLocaleString("default", { month: "short" }).toUpperCase();
        const day = d.getDate();
        const isToday =
          new Date(date).getDate() === new Date().getDate() &&
          new Date(date).getMonth() === new Date().getMonth() &&
          new Date(date).getFullYear() === new Date().getFullYear();
        return isToday ? "TODAY" : `${month}\n${day}`;
      case 1:
        return `Week\n${i + 1}`.toUpperCase();
      case 2:
        return getQuarterMonths()[i];
      default:
        return;
    }
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
          var prefix = diffTime > 0 ? "" : "Started";
          var suffix = diffTime > 0 ? "to go" : diffTime === 0 ? "Today" : "ago";
          return formatText(
            `${prefix} ${diffTime > 0 ? diffTime : diffTime === 0 ? "" : -diffTime} ${
              diffTime === 1 ? "day" : diffTime === 0 ? "" : "days"
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
  const handleScrollX = (e) => {
    const { scrollLeft } = e.target;
    headerRef.current.scrollLeft = scrollLeft;
    bodyRef.current.scrollTop = projectsRef.current.scrollTop;
  };

  // Synchronize the scroll position of the body of and gantt chart and the projects section.
  const handleScrollY = (e) => {
    const { scrollTop } = e.target;
    bodyRef.current.scrollTop = scrollTop;
  };

  const sortByMilestoneStart = (a, b) => {
    const aStart = new Date(a?.milestones[0]?.startDate);
    const bStart = new Date(b?.milestones[0]?.startDate);
    return aStart > bStart ? 1 : -1;
  };

  return (
    <div className={styles.root} style={{ width: `${containerWidth}px` }}>
      <div className={styles.subRoot}>
        <div
          className={styles.projects}
          style={{ height: `${height + 61}px` }}
          ref={projectsRef}
          onScroll={handleScrollY}
        >
          <h1 className={styles.projectsHeading}>Projects</h1>
          {data?.sort(sortByMilestoneStart)?.map((project, id) => (
            <ProjectCard project={project} key={id} expanded={tabValue !== 2} />
          ))}
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.ganttChartHeader} ref={headerRef}>
            <div className={styles.ganttChartDays} style={{ width: `${days * (dayWidth + 2)}px` }}>
              {Array.from({ length: days }, (_, i) => {
                const date = addDays(new Date(startDate), i);
                return (
                  <div
                    key={i}
                    className={styles.ganttChartDay}
                    style={{ width: `${dayWidth + 2}px` }}
                  >
                    <h4 align="center">{formatDate(date, i)}</h4>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={styles.parent}
            ref={bodyRef}
            style={{
              backgroundSize: `${dayWidth + 2}px 100%`
            }}
            onScroll={(e) => handleScrollX(e)}
          >
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
                {tabValue !== 2 &&
                  data?.sort(sortByMilestoneStart)?.map((project, id) => (
                    <div
                      className={styles.ganttChartProject}
                      style={{ backgroundSize: `${dayWidth + 2}px 100%` }}
                      key={id}
                    >
                      {project?.milestones?.map((milestone) => (
                        <div key={milestone.id} className={styles.ganttChartRow}>
                          <div className={styles.ganttChartTaskRow}>
                            <div
                              className={styles.ganttChartTask}
                              style={{
                                marginLeft: `${
                                  startOffset +
                                  getDateOffset(milestone.startDate) *
                                    (tabValue === 1
                                      ? dayWidth / 7
                                      : tabValue === 2
                                      ? dayWidth / 30
                                      : dayWidth) +
                                  getDateOffset(milestone.startDate) * borderWidth * 2
                                }px`,
                                width: `${
                                  milestone.duration *
                                  (tabValue === 1
                                    ? dayWidth / 7 + 2
                                    : tabValue === 2
                                    ? dayWidth / 30 + 2
                                    : dayWidth + 2)
                                }px`,
                                backgroundColor: milestone.primaryColor
                              }}
                            >
                              {getDisplayText(
                                milestone,
                                milestone.duration *
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
                  ))}
                {tabValue === 2 &&
                  data?.sort(sortByMilestoneStart)?.map((project, id) => {
                    var dur = -1;

                    project?.milestones?.forEach((element) => {
                      dur = Math.max(
                        dur,
                        Math.abs(
                          differenceInDays(
                            new Date(project?.milestones[0]?.startDate),
                            addDays(new Date(element?.startDate), element?.duration)
                          )
                        )
                      );
                    });

                    const milestone = {
                      name: project?.name,
                      startDate: project?.milestones[0]?.startDate,
                      duration: dur,
                      primaryColor: project?.projectColor
                    };
                    return (
                      <div className={styles.ganttChartProject} key={id}>
                        <div
                          className={styles.ganttChartRow}
                          style={{ marginTop: "calc(-1*(24px + 1.17em))", marginBottom: "-14px" }}
                        >
                          <div className={styles.ganttChartTaskRow}>
                            <div
                              className={styles.ganttChartTask}
                              style={{
                                marginLeft: `${
                                  startOffset +
                                  getDateOffset(milestone.startDate) *
                                    (tabValue === 1
                                      ? dayWidth / 7
                                      : tabValue === 2
                                      ? dayWidth / 30
                                      : dayWidth) +
                                  getDateOffset(milestone.startDate) * borderWidth * 2
                                }px`,
                                width: `${
                                  milestone.duration *
                                  (tabValue === 1
                                    ? dayWidth / 7 + 2
                                    : tabValue === 2
                                    ? dayWidth / 30 + 2
                                    : dayWidth + 2)
                                }px`,
                                backgroundColor: milestone.primaryColor
                              }}
                            >
                              {getDisplayText(
                                milestone,
                                milestone.duration *
                                  (tabValue === 1
                                    ? dayWidth / 7 + 2
                                    : tabValue === 2
                                    ? dayWidth / 30 + 2
                                    : dayWidth + 2)
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.nextTab}
        style={{ backgroundColor: document.body.style.backgroundColor }}
        onClick={() => handleTabChange(tabValue === 2 ? 0 : tabValue + 1)}
      >
        Next
      </div>
    </div>
  );
};

export default GanttChart;
