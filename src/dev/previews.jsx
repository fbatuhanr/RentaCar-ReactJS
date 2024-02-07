import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Header from "../components/header";
import App from "../App";
import VehicleModels from "../admin/vehicles-manager/vehicle-models";
import VehicleBrands from "../admin/vehicles-manager/vehicle-brands";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Header">
                <Header/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/VehicleModels">
                <VehicleModels/>
            </ComponentPreview>
            <ComponentPreview path="/VehicleBrands">
                <VehicleBrands/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews