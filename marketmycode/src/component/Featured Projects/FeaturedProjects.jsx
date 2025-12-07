import React from "react";
import "./FeaturedProjects.css";

const FeaturedProjects = () => {
  const projects = [1, 2, 3, 4]; 

  return (
    <div className="featuredSection">
      <h2 className="featuredTitle">Featured Projects</h2>
      <p className="featuredSubtitle">
        Turn your imagination into something real.
      </p>

      <div className="projectWrapper">
        {projects.map((p, index) => (
          <div className="projectCard" key={index}>
            <div className="projectImage"></div>

            <div className="projectInfo">
              <div className="tagBox">
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

      <div className="viewAllSection">
        <button className="viewAllBtn">View All Projects →</button>
      </div>
    </div>
  );
};

export default FeaturedProjects;