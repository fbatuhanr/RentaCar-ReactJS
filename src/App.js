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
import Admin from "./admin/admin";
import AdminGuard from "./guards/AdminGuard";
import VehicleBrands from "./admin/vehicles-manager/vehicle-brands";
import VehicleModels from "./admin/vehicles-manager/vehicle-models";
import VehicleAdd from "./admin/vehicles-manager/vehicle-add";
import VehiclesManager from "./admin/vehicles-manager/vehicles-manager";
import UsersManager from "./admin/users-manager/users-manager";
import LocationsManager from "./admin/locations-manager";

function App() {

    const persistor = persistStore(store);

  return (
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <Router>
                  <ScrollToTop />
                  { !window.location.pathname.includes("admin") && <Header /> }
                    <Routes>

                        <Route path="/admin" element={<AdminGuard><Admin /></AdminGuard>}>
                            <Route path="users" element={<UsersManager />} />
                            <Route path="vehicles" element={<VehiclesManager />} >
                                <Route path="brands" element={<VehicleBrands />} />
                                <Route path="models" element={<VehicleModels />} />
                                <Route path="add" element={<VehicleAdd />} />
                            </Route>
                            <Route path="locations" element={<LocationsManager />} />
                        </Route>

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
                  { !window.location.pathname.includes("admin") && <Footer /> }
              </Router>
          </PersistGate>
      </Provider>
  );
}

export default App;
