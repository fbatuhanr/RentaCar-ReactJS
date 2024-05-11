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
    Route
} from "react-router-dom"

import ScrollToTop from "./config/ScrollToTop";

import Header from "./components/header";
import Footer from './components/footer';

import Home from './pages/home';

import Login from './pages/auth/login';
import Signup from './pages/auth/signup';

import About from './pages/about/about';
import Payment from './pages/payment/payment';
import Rental from './pages/rental/rental';

import CarDetail from "./pages/car-detail";
import MyRentals from "./pages/my-rentals/my-rentals";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import AdminGuard from "./guards/AdminGuard";

import AdminLayout from "./admin/admin-layout";
import Admin from "./admin/admin";
import VehiclesManager from "./admin/vehicles-manager/vehicles-manager";
import UsersManager from "./admin/users-manager/users-manager";
import LocationsManager from "./admin/locations-manager/locations-manager";
import RentalsManager from "./admin/rentals-manager/rentals-manager";

function App() {

    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <ScrollToTop />
                    <Header />
                    <Routes>
                        <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                            <Route path="" element={<Admin />} /> // this never renders
                            <Route path="users" element={<UsersManager />} />
                            <Route path="vehicles" element={<VehiclesManager />} >
                            </Route>
                            <Route path="showrooms" element={<LocationsManager />} />
                            <Route path="rentals" element={<RentalsManager />} />
                        </Route>
                        <Route path="/" element={<Home />} />

                        <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
                        <Route path="/sign-up" element={<GuestGuard><Signup /></GuestGuard>} />

                        <Route path="/about" element={<About />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/rental" element={<Rental />} />
                        <Route path="/my-rentals" element={<AuthGuard><MyRentals /></AuthGuard>} />
                        <Route path="/vehicles/:vehicleId" element={<CarDetail />} />
                    </Routes>
                    <Footer />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
