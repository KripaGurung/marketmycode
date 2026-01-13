import React from "react";
import "./MostViewProjects.css";

const MostViewProjects = () => {
  const projects = [1, 2, 3, 4]; 

  return (
    <div className="mostSection">
      <h2 className="mostTitle">Most View Projects</h2>
      <p className="mostSubtitle">
        See what others are finding interesting !
      </p>

      <div className="mostProjectWrapper">
        {projects.map((p, index) => (
          <div className="mostProjectCard" key={index}>
            <div className="mostProjectImage"></div>

            <div className="mostProjectInfo">
              <div className="mostTagBox">
                <span className="mostTag">AI</span>
                <span className="mostTagPrice">RS 200</span>
              </div>

              <p className="mostProjectDesc">
                This project is a Project Marketplace Platform where users can
                discover, explore, and share various projects across different
                categories. It promotes collaboration and learning in the
                developer community.
              </p>

              <div className="mostProjectButtons">
                <button className="mostCartBtn">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostViewProjects;