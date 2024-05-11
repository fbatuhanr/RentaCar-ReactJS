import React, { useEffect, useState } from 'react';

import { locationsData, vehiclesData } from "../../DATA/data.jsx";

import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { Container, Row, Col, Button, Card, ListGroup, InputGroup, Form, Accordion } from "react-bootstrap";

import { TbEngine, TbManualGearbox } from "react-icons/tb";
import { BsCarFront, BsFillCarFrontFill, BsFillFuelPumpFill } from "react-icons/bs";
import { PiEngineFill } from "react-icons/pi";

import { fetchBrands, fetchModels, fetchCars, fetchReservations, fetchLocations } from "../../hooks/useFetchData";
import { loadingContent } from "../../components/general/general-components";
import newRequet from '../../utils/request.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaLocationDot } from 'react-icons/fa6';
import moment from 'moment';


const MyRentals = () => {

    // IT WAS USING BEFORE DATABASE USAGE (FOR GLOBAL STATE MANAGEMENT)
    // const {reservations} = useSelector(state => state.ReserveSlice);
    // NOT REQUIRED ANYMORE (BECAUSE RESERVATION DATA WILL FETCH FROM DB)

    const locale = 'en';
    const [date, setDate] = useState(new Date());

    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector(({ UserSlice }) => UserSlice);

    const [cars, setCars] = useState(null);
    const [locations, setLocations] = useState(null);

    const [reservations, setReservations] = useState(null);

    const [rentals, setRentals] = useState()
    const accessToken = localStorage.getItem("accessToken")
    const { roleName } = useSelector(state => state.UserSlice)

    const getRentals = async () => {
        await newRequet.get('/rentals/', {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(data => {
                console.log(data.data)
                setRentals(data.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log('ERR when get rentals: ', err)
            })
    }

    useEffect(() => {

        getRentals()

        setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);

        Promise.all([
            fetchCars(),
            fetchLocations(),
            fetchReservations(user.email),
        ])
            .then(responses => {

                setCars(responses[0])
                setLocations(responses[1])
                setReservations(responses[2])

                setIsLoading(false);
            });

    }, []);


    const welcomeMessage = () => {

        let day = `${date.toLocaleDateString(locale, { weekday: 'long' })}, ${date.getDate()} ${date.toLocaleDateString(locale, { month: 'long' })}`;
        let hour = date.getHours();
        let wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;

        let time = date.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

        return <h4 className="mb-1">
            {day} <span className="text-black-50">|</span> {time}
            <hr className="my-1" />
            {wish} <span className="fw-600">{user.email}</span>
        </h4>
    }

    return (
        <div id="my-rentals">
            <Container className="py-4">
                <Row className="mb-5">
                    <Col>
                        <h1 className="fs-1 text-center text-uppercase">My Rentals</h1>
                    </Col>
                </Row>
                {
                    user.email &&
                    <div className="d-flex justify-content-center mb-1">
                        {welcomeMessage()}
                    </div>
                }
                <Row>
                    {
                        !isLoading
                            ?
                            rentals
                                ?
                                <Accordion>
                                    {
                                        roleName==='CUSTOMER' && rentals.map(rental =>

                                            <Accordion.Item key={rental.id} eventkey={rental.id}>
                                                <Accordion.Header className="m-0 p-0">
                                                    <h3 className="m-0 p-0">
                                                        <span>USER: </span>
                                                        <span className="fw-600">{rental.customer.email}</span>
                                                    </h3>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <Accordion className="my-2">
                                                        <Accordion.Header className="m-0 p-0">
                                                            <h3 className="m-0 p-0">
                                                                <BsFillCarFrontFill size="2em" className="me-2" style={{ marginTop: "-10px" }} />
                                                                <span className="fs-5 fw-bold">{`${rental.vehicle.brand} / ${rental.vehicle.name}`}</span>
                                                            </h3>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <Col xs={12}>
                                                                <Row>
                                                                    <Col xs={12} md={6}>
                                                                        <LazyLoadImage
                                                                            src={rental.vehicle.image}
                                                                            className="img-fluid"
                                                                            effect="blur"
                                                                        />
                                                                    </Col>
                                                                    <Col xs={12} md={6}>
                                                                        <ListGroup variant="flush">
                                                                            <ListGroup.Item variant="secondary" action>
                                                                                <BsFillCarFrontFill size="2em" className="me-2" style={{ marginTop: "-10px" }} />
                                                                                <span className="fs-6">Brand & Model:</span> &nbsp;
                                                                                <span className="fs-5 fw-bold">{`${rental.vehicle.brand} / ${rental.vehicle.name}`}</span>
                                                                            </ListGroup.Item>
                                                                            <ListGroup.Item action>
                                                                                <BsCarFront size="2em" className="me-2" style={{ marginTop: "-10px" }} />
                                                                                <span className="fs-6">Name:</span> &nbsp;
                                                                                <span className="fs-5 fw-bold">{rental.vehicle.name}</span>
                                                                            </ListGroup.Item>
                                                                            <ListGroup.Item action>
                                                                                <TbManualGearbox size="2em" className="me-2" style={{ marginTop: "-8px" }} />
                                                                                <span className="fs-6">Brand:</span> &nbsp;
                                                                                <span className="fs-5 fw-bold">{rental.vehicle.brand}</span>
                                                                            </ListGroup.Item>
                                                                            <ListGroup.Item action>
                                                                                <PiEngineFill size="2em" className="me-2" style={{ marginTop: "-8px" }} />
                                                                                <span className="fs-6">Specifications:</span> &nbsp;
                                                                                <span className="fs-5 fw-bold">{rental.vehicle.specifications}</span>
                                                                            </ListGroup.Item>
                                                                            <ListGroup.Item action>
                                                                                <FaLocationDot size="2em" className="me-2" style={{ marginTop: "-8px" }} />
                                                                                <span className="fs-6">Location:</span> &nbsp;
                                                                                <span className="fs-5 fw-bold">{rental.vehicle.showroom.name}</span>
                                                                            </ListGroup.Item>

                                                                            {/* <ListGroup.Item action>
                                        <BsFillFuelPumpFill size="2em" className="me-2" style={{ marginTop: "-10px" }} />
                                        <span className="fs-6">Fuel Type:</span> &nbsp;
                                        <span className="fs-5 fw-bold">{cars[carId].fuelType}</span>
                                    </ListGroup.Item> */}
                                                                        </ListGroup>

                                                                        {/* <div className="text-end">
                                    <span className={`text-secondary fst-italic ${cars[carId].carCount > 0 ? "text-success" : "text-danger"}`}>
                                        Available Stock: {cars[carId].carCount}
                                    </span>
                                </div> */}
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <Row>
                                                                            <Col xs={12} md={6}>
                                                                                <InputGroup size="lg" className="my-2">
                                                                                    <InputGroup.Text id="start-date">Start Date</InputGroup.Text>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={moment(rental.startDate).format('DD/MM/YYYY')}
                                                                                        disabled
                                                                                    />
                                                                                </InputGroup>
                                                                            </Col>
                                                                            <Col xs={12} md={6}>
                                                                                <InputGroup size="lg" className="my-2">
                                                                                    <InputGroup.Text id="end-date">End Date</InputGroup.Text>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={moment(rental.endDate).format('DD/MM/YYYY')}
                                                                                        disabled
                                                                                    />
                                                                                </InputGroup>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={12} md={6}>
                                                                        <InputGroup size="lg" className="my-2">
                                                                            <InputGroup.Text id="start-date">Status</InputGroup.Text>
                                                                            <Form.Control
                                                                                type="text"
                                                                                value={rental.status}
                                                                                disabled
                                                                            />
                                                                        </InputGroup>
                                                                    </Col>
                                                                </Row>

                                                            </Col>
                                                        </Accordion.Body>
                                                    </Accordion>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    }
                                </Accordion>
                                :
                                <p>No reservations have been made by users...</p>
                            :
                            loadingContent
                    }
                </Row>
            </Container>
        </div>
    );
};

export default MyRentals;