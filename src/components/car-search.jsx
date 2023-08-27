import React, {useState} from 'react';
import {vehiclesData} from "../DATA/data.jsx";

import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";

import {Container, Row, Col, Button} from "react-bootstrap";


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
        <div id="car-search" className="pb-1">
                <Container className="py-5">
                <Row>
                    <Col>
                        <h1 className="quinary-color fs-2 p-0 mb-2">
                            Search Your Best Cars
                        </h1>
                        <p className="quinary-color fs-5 p-0 m-0 mb-5">
                            Using 'Content here, content here', making it look like readable
                        </p>
                        <Container>
                            <Row>
                                <Col xs={12} md={3} className="my-2">
                                    <Form.Select size="lg" onChange={handleBrandChange}>
                                        <option value="">Choose a Brand</option>
                                        {
                                            vehiclesData.map(car =>
                                                <option value={car.brand}>{car.brand}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={3} className="my-2">
                                    <Form.Select size="lg" onChange={handleModelChange}>
                                        <option>{carBrand ? "Choose a Model" : "---"}</option>
                                        {
                                            carBrand &&
                                            Object.keys(vehiclesData.find(item => item.brand === carBrand).model).map(model =>
                                                <option value={model}>{model}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={3} className="my-2">
                                    <Form.Select size="lg" onChange={null}>
                                        <option>{carModel ? new Date().getFullYear() : "---"}</option>
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={3} className="my-2">
                                    <div className="d-grid">
                                        <Link to={carModel ? `/cars/${carBrand}/${carModel}` : null} disabled={!carModel ? true : false}>
                                            <Button variant="primary" size="lg" className="search-btn w-100">Search Now</Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                </Container>
        </div>
    );
};
export default CarSearch;