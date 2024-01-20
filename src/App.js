import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import './App.scss';

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/app/store";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link, useLocation
} from "react-router-dom"

import ScrollToTop from "./config/ScrollToTop";

import Header from "./components/header";
import Footer from './components/footer';

import Home from './pages/home';

import Login from './pages/auth/login';
import Signup from './pages/auth/signup';

import About from './pages/about/about';
import Client from './pages/client/client';
import Services from './pages/services/services';
import Vehicles from './pages/vehicles/vehicles';
import Contact from './pages/contact/contact';

import CarDetail from "./pages/car-detail";
import MyRentals from "./pages/my-rentals/my-rentals";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import Admin from "./pages/admin/admin";
import AdminGuard from "./guards/AdminGuard";

function App() {

    const persistor = persistStore(store);

  return (
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <Router>
                  <ScrollToTop />
                  { window.location.pathname !== "/admin" && <Header /> }
                    <Routes>
                        <Route path="/admin" element={<AdminGuard><Admin /></AdminGuard>} />

                      <Route path="/" element={<Home />}/>

                      <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
                      <Route path="/sign-up" element={<GuestGuard><Signup /></GuestGuard>} />

                      <Route path="/about" element={<About />} />
                      <Route path="/client" element={<Client />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/vehicles" element={<Vehicles />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/my-rentals" element={<AuthGuard><MyRentals /></AuthGuard>} />

                      <Route path="/cars/:carBrand/:carModel" element={<CarDetail />} />
                    </Routes>
                  { window.location.pathname !== "/admin" && <Footer /> }
              </Router>
          </PersistGate>
      </Provider>
  );
}

export default App;
