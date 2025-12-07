import React from "react";
import "./MostViewProjects.css";

const MostViewProjects = () => {
  const projects = [1, 2, 3, 4]; 

  return (
    <div className="mostSection">
      <h2 className="mostTitle">Featured Projects</h2>
      <p className="mostSubtitle">
        Turn your imagination into something real.
      </p>

      <div className="mostProjectWrapper">
        {projects.map((p, index) => (
          <div className="mostProjectCard" key={index}>
            <div className="mostProjectImage"></div>

            <div className="mostProjectInfo">
              <div className="mostTagBox">
                <span className="tag">AI</span>
                <span className="tag price">RS 200</span>
              </div>

              <p className="projectDesc">
                This project is a Project Marketplace Platform where users can
                discover, explore, and share various projects across different
                categories. It promotes collaboration and learning in the
                developer community.
              </p>

              <div className="projectButtons">
                <button className="viewBtn">View Details</button>
                <button className="cartBtn">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostViewProjects;