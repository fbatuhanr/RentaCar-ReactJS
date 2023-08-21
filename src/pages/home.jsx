import React from 'react';

import Slider from '../components/slider'
import AboutSection from "../components/about-section";
import CarSearch from "../components/car-search"
import CarOffers from '../components/car-offers';
import FeaturesSection from '../components/features-section';
import CustomerReview from '../components/customer-reviews';
import ContactSection from '../components/contact-section';

const Home = () => {

    return (
        <div id="homepage">
            <Slider/>
            <AboutSection/>
            <CarSearch/>
            <CarOffers/>
            <FeaturesSection/>
            <CustomerReview/>
            <ContactSection/>
        </div>
    );
};
export default Home;