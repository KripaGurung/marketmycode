import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import './project.css';

const Project =() => {
  const projects = [1, 2, 3, 4]; 
  return (
    <div className="projectPage">

      <div className="searchFilter">
        <div className="search">
          <input type="text" placeholder="Search projects..." />
          <FiSearch className="search-icon" />
        </div>

        <div className="filters">
          <FiFilter className="filter-icon" />
        </div>
      </div>

      <div className="projectContainer">
        {projects.map((project, index) => (
          <div className="projectCards" key={index}>
            <div className="projectImages"></div>

            <div className="projectDetails">
              <div className="tags">
                <span className="tag">AI</span>
                <span className="tag price">RS 200</span>
              </div>

              <p className="description">
                This project is a Project Marketplace Platform where users can
                discover, explore, and share various projects across different
                categories. It promotes collaboration and learning in the
                developer community.
              </p>

              <div className="actionButtons">
                <button className="cartButton">Add to cart</button>
              </div>
            </div>
          </div>
        ))}   
      </div>
    </div>
  );
};

export default Project;