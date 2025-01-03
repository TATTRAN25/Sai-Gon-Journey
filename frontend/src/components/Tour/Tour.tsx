import React from "react";
import Hero from "@/components/Home/Hero/Hero";
import Destination from "@/components/Home/Destination/Destination";
import Hotel from "@/components/Home/Hotel/Hotel";
import WhyChoose from "@/components/Home/WhyChoose/WhyChoose";
import Review from "@/components/Home/Reviews/Review";
import New from "@/components/Home/News/News";
import Newsletter from "@/components/Home/Newsletter/Newsletter";

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