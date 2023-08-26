import React from 'react';
import {Col, Container, Row, Button} from "react-bootstrap";
import {vehiclesData} from "../DATA/data.jsx";
import {Link} from "react-router-dom";

const CarOffers = () => {

    return (
        <div id="car-offers" style={{clear: "both"}}>
            <Container className="py-4">
              <Row className="mb-5">
                <Col>
                    <h1 className="fs-1 text-center text-uppercase">Our Best Offers</h1>
                </Col>
              </Row>
                <Row>
                    {
                        vehiclesData.map(vehicle =>
                            Object.entries(vehicle.model).map(model =>
                                 <Col xs={4} className="py-2">
                                    <div className="gallery-box p-2">
                                        <div className="gallery-img">
                                            <img src={model[1].imageUrl} className="img-fluid"/>
                                        </div>
                                        <div className="gallery-content text-center">
                                            <h3 className="fs-4 fw-600 p-0">
                                                {vehicle.brand}
                                            </h3>
                                            <p className="fs-5 fw-500 m-0 pt-1 pb-3 primary-color">
                                                {model[0]}
                                            </p>
                                            <div className="d-grid pb-2">
                                                <Link to={`/cars/${vehicle.brand}/${model[0]}`}>
                                                    <Button variant="primary rent-now-button primary-bg-color border-0 rounded-1 px-4 fw-bold">Rent Now</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        )
                    }
                </Row>
            </Container>
        </div>
    );
};
export default CarOffers;