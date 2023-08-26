import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
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
                                    <div className="gallery_box">
                                        <div className="gallery_img"><img src={model[1].imageUrl} /></div>
                                        <h3 className="types_text">{vehicle.brand}</h3>
                                        <p className="looking_text">{model[0]}</p>
                                        <div className="read_bt">
                                            <Link to={`/cars/${vehicle.brand}/${model[0]}`}>Rent now</Link>
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