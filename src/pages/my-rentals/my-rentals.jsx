import React, {useEffect, useState} from 'react';

import {locationsData, vehiclesData} from "../../DATA/data.jsx";

import {useSelector} from "react-redux";

import {Link, useNavigate} from "react-router-dom";

import {Container, Row, Col, Button, Card, ListGroup, InputGroup, Form} from "react-bootstrap";

import {TbEngine, TbManualGearbox} from "react-icons/tb";
import {BsCarFront, BsFillCarFrontFill, BsFillFuelPumpFill} from "react-icons/bs";
import {PiEngineFill} from "react-icons/pi";

import {fetchBrands, fetchModels, fetchCars, fetchReservations, fetchLocations} from "../../hooks/useFetchData";
import {loadingContent} from "../../components/general/general-components";


const MyRentals = () => {

    // IT WAS USING BEFORE DATABASE USAGE (FOR GLOBAL STATE MANAGEMENT)
    // const {reservations} = useSelector(state => state.ReserveSlice);
    // NOT REQUIRED ANYMORE (BECAUSE RESERVATION DATA WILL FETCH FROM DB)

    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector(({UserSlice}) => UserSlice.user);

    const [cars, setCars] = useState(null);
    const [locations, setLocations] = useState(null);

    const [reservations, setReservations] = useState(null);

    useEffect(() => {

        Promise.all([
            fetchCars(),
            fetchLocations(),
            fetchReservations(user.email),
        ])
        .then(responses => {
            console.log("all fetched")
            setCars(responses[0])
            setLocations(responses[1])
            setReservations(responses[2])

            setIsLoading(false);
        });
    }, []);

    return (
        <div id="my-rentals">
            <Container className="py-4">
                <Row className="mb-5">
                    <Col>
                        <h1 className="fs-1 text-center text-uppercase">My Rentals</h1>
                    </Col>
                </Row>
                <Row>
                    {
                        !isLoading
                        ?
                            reservations
                                ?
                                reservations.map(reserveData => {

                                    console.log(reserveData)

                                    return (<Col xs={{ span: 10, offset: 1 }}>
                                        <Card className="my-2">
                                            <Row>
                                                <Col xs={12}>
                                                    <ListGroup variant="flush" className="text-center">
                                                        <ListGroup.Item variant="secondary" action>
                                                            <BsFillCarFrontFill size="2em" className="me-2" style={{marginTop: "-10px"}}/>
                                                            <span className="fs-5 fw-bold">{`${reserveData.carBrand} / ${reserveData.carModel}`}</span>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <img src={cars[reserveData.carId].image} alt={`${reserveData.carBrand} / ${reserveData.carModel}`} />
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item>
                                                            <TbEngine size="2em" className="me-2" style={{marginTop: "-8px"}}/>
                                                            <span className="fs-6">HP:</span> &nbsp;
                                                            <span className="fs-5 fw-bold">{cars[reserveData.carId].power}</span>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <PiEngineFill size="2em" className="me-2" style={{marginTop: "-8px"}}/>
                                                            <span className="fs-6">Engine Size:</span> &nbsp;
                                                            <span className="fs-5 fw-bold">{cars[reserveData.carId].engineSize}</span>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <TbManualGearbox size="2em" className="me-2" style={{marginTop: "-8px"}}/>
                                                            <span className="fs-6">Gear Box:</span> &nbsp;
                                                            <span className="fs-5 fw-bold">{cars[reserveData.carId].gearbox}</span>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <BsCarFront size="2em" className="me-2" style={{marginTop: "-10px"}}/>
                                                            <span className="fs-6">Body Type:</span> &nbsp;
                                                            <span className="fs-5 fw-bold">{cars[reserveData.carId].bodyType}</span>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <BsFillFuelPumpFill size="2em" className="me-2" style={{marginTop: "-10px"}}/>
                                                            <span className="fs-6">Fuel Type:</span> &nbsp;
                                                            <span className="fs-5 fw-bold">{cars[reserveData.carId].fuelType}</span>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col xs={12} md={6}>
                                                            <InputGroup size="lg" className="my-2">
                                                                <InputGroup.Text id="pick-up-locations">Pick-up Location</InputGroup.Text>
                                                                <Form.Select size="lg" disabled>
                                                                    <option value={reserveData.pickupLocation}>{locations[reserveData.pickupLocation]}</option>
                                                                </Form.Select>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col xs={12} md={6}>
                                                            <InputGroup size="lg" className="my-2">
                                                                <InputGroup.Text id="start-date">Start Date</InputGroup.Text>
                                                                <Form.Control
                                                                    type="date"
                                                                    min={reserveData.startDate}
                                                                    value={reserveData.startDate}
                                                                    disabled
                                                                />
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={12} md={6}>
                                                            <InputGroup size="lg" className="my-2">
                                                                <InputGroup.Text id="drop-off-locations">Drop-off Location</InputGroup.Text>
                                                                <Form.Select size="lg" disabled>
                                                                    <option value={reserveData.dropoffLocation} >{locations[reserveData.dropoffLocation]}</option>
                                                                </Form.Select>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col xs={12} md={6}>
                                                            <InputGroup size="lg" className="my-2">
                                                                <InputGroup.Text id="end-date">End Date</InputGroup.Text>
                                                                <Form.Control
                                                                    type="date"
                                                                    min={reserveData.endDate}
                                                                    value={reserveData.endDate}
                                                                    disabled
                                                                />
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>)
                                })
                                :
                                <Col>
                                    <Card className="text-center text-danger p-5">
                                        <p className="fs-4 mb-5">You have not rented any vehicles yet!</p>
                                        <Link to="/vehicles">
                                            <Button variant="secondary" size="lg" className="primary-bg-color border-0">Click to Browse Vehicles</Button>
                                        </Link>
                                    </Card>
                                </Col>
                        :
                            loadingContent
                    }
                </Row>
            </Container>
        </div>
    );
};

export default MyRentals;