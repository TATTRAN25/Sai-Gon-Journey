import React from "react";
import Hero from "./Hero/Hero";
import Destination from "./Destination/Destination";
import Hotel from "./Hotel/Hotel";
import WhyChoose from "./WhyChoose/WhyChoose";
import Review from "./Reviews/Review";
import New from "./News/News";
import Newsletter from "./Newsletter/Newsletter";

const Home = () => {
    return (<div className="overflow-hidden">
        <Hero/>
        <Destination/>
        <Hotel/>
        <WhyChoose/>
        <Review/>
        <New/>
        <Newsletter/>
    </div>
    );
};

export default Home;