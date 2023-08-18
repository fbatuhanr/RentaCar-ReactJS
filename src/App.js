import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css'
import './App.css';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Header from "./components/header";
import Slider from "./components/slider";
import AboutSection from "./components/about-section";
import CarSearch from "./components/car-search"
import CarOffers from './components/car-offers';
import FeaturesSection from './components/features-section';
import CustomerReview from './components/customer-reviews';
import ContactSection from './components/contact-section';
import Footer from './components/footer';

function App() {
  return (
      <div>
          <Header/>
          <Slider/>
          <AboutSection/>
          <CarSearch/>
          <CarOffers/>
          <FeaturesSection/>
          <CustomerReview/>
          <ContactSection/>
          <Footer/>
      </div>
  );
}

export default App;
