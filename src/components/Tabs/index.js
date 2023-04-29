import React, { useRef, useState } from "react";
import styles from "./style.module.css";

const Tab = (
  { label, isSelected, onClick, innerRef, background, foreground },
) => {
  return (
    <div
      // className={`tab ${isSelected ? "tab-selected" : ""}`}
      className={styles.tab}
      onClick={onClick}
      ref={innerRef}
      style={{
        backgroundColor: isSelected ? foreground : background,
        color: isSelected ? "white" : foreground,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      {label}
    </div>
  );
};

const Tabs = ({ tabsArray, tabValue, tabRefs, handleTabChange }) => {
  const getUnderlineStyle = () => {
    if (!tabRefs.current[tabValue]) {
      return {
        width: 0,
        transform: "translateX(0)",
      };
    }

    const { offsetLeft, offsetWidth } = tabRefs.current[tabValue];
    return {
      width: offsetWidth,
      backgroundColor: tabsArray[tabValue].foreground,
      transform: `translateX(${offsetLeft}px)`,
    };
  };

  return (
    <div>
      <div className={styles.tabs}>
        {tabsArray.map(({ label, background, foreground }, index) => (
          <Tab
            key={label}
            label={label}
            isSelected={tabValue === index}
            onClick={() => handleTabChange(index)}
            innerRef={(el) => (tabRefs.current[index] = el)}
            background={background}
            foreground={foreground}
          />
        ))}
        {/* <div className={styles.underline} style={getUnderlineStyle()}></div> */}
      </div>
    </div>
  );
};

export default Tabs;
