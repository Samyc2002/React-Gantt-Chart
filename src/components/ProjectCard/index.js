// Import React and CSS module
import React from "react";
import styles from "./style.module.css";

// Define ProjectCard functional component, which receives a project object as a prop
const ProjectCard = ({ project }) => {
  return (
    <div
      // Set the className and dynamic styles for the project card container
      className={styles.project}
      style={{
        // Create a boxShadow with the document's background color, as well as the tertiary color of each milestone
        boxShadow: `inset 0 0 50px ${
          document.body.style.backgroundColor
        }, ${project?.milestones?.map(({ tertiaryColor }, id) => {
          const midInd = project?.milestones?.length / 2;
          return `${id !== 0 ? " " : ""}inset ${150 * (id - midInd)}px 0 50px ${tertiaryColor}`;
        })}, 0 0 80px ${project?.projectColor}`
      }}
    >
      {/* Render the project's name as a title */}
      <h3 className={styles.title}>{project?.name}</h3>
      {/* Map through each milestone in the project and render them as child components */}
      {project?.milestones?.map((milestone, id) => (
        <div key={id} className={styles.milestone}>
          {/* Render the milestone's name as a title */}
          <h4 className={styles.milestoneTitle}>{milestone?.name}</h4>
          {/* Render the progress background with its respective secondary color */}
          <div
            className={styles.progressBackground}
            style={{ backgroundColor: milestone?.secondaryColor }}
          >
            {/* Render the progress bar with the milestone's progress and primary color */}
            <div
              className={styles.progressBar}
              style={{
                width: `${milestone?.progress}%`,
                backgroundColor: milestone?.primaryColor,
                borderRadius: `5px ${milestone?.progress === 100 ? "5px" : "0"} ${
                  milestone?.progress === 100 ? "5px" : "0"
                } 5px`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Export the ProjectCard component as default
export default ProjectCard;
