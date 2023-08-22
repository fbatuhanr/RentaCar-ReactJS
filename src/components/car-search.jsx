import React, {useState} from 'react';
import {vehiclesData} from "../DATA/data.jsx";

import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";


const CarSearch = () => {

    const [carBrand, setCarBrand] = useState(null);
    const [carModel, setCarModel] = useState(null);

    const handleBrandChange = event => {
        setCarBrand(event.target.value !== "" ? event.target.value : null);
    }
    const handleModelChange = event => {

        setCarModel(event.target.value !== "" ? event.target.value : null);
    }
    
    
    return (
            <div id='CarSearch'>
                <div className="search_section">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <h1 className="search_taital">Search Your Best Cars</h1>
                        <p className="search_text">Using 'Content here, content here', making it look like readable</p>
                        <div className="container">
                            <div className="select_box_section">
                            <div className="select_box_main">
                                <div className="row">
                                <div className="col-md-3 select-outline">
                                <Form.Select size="lg" onChange={handleBrandChange}>
                                <option value="">Choose a Brand</option>
                                {
                                    vehiclesData.map(car =>
                                        <option value={car.brand}>{car.brand}</option>
                                    )
                                }
                                </Form.Select>
                                </div>
                                <div className="col-md-3 select-outline">
                                <Form.Select size="lg" onChange={handleModelChange}>
                                <option>{carBrand ? "Choose a Model" : "---"}</option>
                                {
                                    carBrand &&
                                    Object.keys(vehiclesData.find(item => item.brand === carBrand).model).map(model =>
                                            <option value={model}>{model}</option>
                                        )
                                }
                                </Form.Select>
                                </div>
                                <div className="col-md-3 select-outline">
                                <Form.Select size="lg" onChange={null}>
                                    <option>{carModel ? new Date().getFullYear() : "---"}</option>
                                </Form.Select>
                                </div>
                                <div className="col-md-3">
                                    <div className="search_btn">
                                        {
                                            (carModel && carModel)
                                                ? <Link to={`/cars/${carBrand}/${carModel}`}>Search Now</Link>
                                                : <a href={null} className="text-white" disabled>Search Now</a>
                                        }

                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    );
};
export default CarSearch;