import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AdminGuard from "../../../guards/AdminGuard";

import VehiclesNavbar from "./vehicles-navbar";
import VehicleBrands from "./vehicle-brands";
import VehicleModels from "./vehicle-models";

const VehiclesManager = () => {
    return (
        <div>
            <VehiclesNavbar />
        </div>
    );
};

export default VehiclesManager;