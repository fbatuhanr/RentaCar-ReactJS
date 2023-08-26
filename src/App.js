import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import './App.scss';

import {store} from './redux/app/store'
import { Provider } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import ScrollToTop from "./config/ScrollToTop";

import Header from "./components/header";
import Footer from './components/footer';

import Home from './pages/home';
import About from './pages/about/about';
import Client from './pages/client/client';
import Services from './pages/services/services';
import Vehicles from './pages/vehicles/vehicles';
import Contact from './pages/contact/contact';

import CarDetail from "./pages/car-detail";
import MyRentals from "./pages/my-rentals/my-rentals";


function App() {
  return (
      <Provider store={store}>
          <Router>
              <ScrollToTop />
              <Header/>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/client" element={<Client />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/vehicles" element={<Vehicles />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/my-rentals" element={<MyRentals />} />

                  <Route path="/cars/:carBrand/:carModel" element={<CarDetail />} />
                </Routes>
              <Footer/>
          </Router>
      </Provider>
  );
}

export default App;
