import React from 'react';
import Header from "../../component/Header/Header.jsx";
import FeaturedProjects from '../../component/Featured Projects/FeaturedProjects.jsx';
import MostViewProjects from '../../component/MostView/MostViewProjects.jsx';

const Home = () => {
    return (
        <div>
            <Header />
            <FeaturedProjects />
            <MostViewProjects />
        </div>
    )
}

export default Home;