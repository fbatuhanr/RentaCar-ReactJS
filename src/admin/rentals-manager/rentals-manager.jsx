import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";

import { fetchCars, fetchLocations, fetchReservations } from "../../hooks/useFetchData";
import { loadingContent } from "../../components/general/general-components";
import { BsCarFront, BsFillCarFrontFill, BsFillFuelPumpFill } from "react-icons/bs";
import { TbEngine, TbManualGearbox } from "react-icons/tb";
import { PiEngineFill } from "react-icons/pi";

import { doc, getDocs, deleteDoc, query, collection, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import Swal from "sweetalert2";
import newRequet from '../../utils/request';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaLocationDot } from 'react-icons/fa6';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';

const RentalsManager = () => {

    const [isLoading, setIsLoading] = useState(true);

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
    }, []);

    const handleUpdateRental = async (status, id) => {

        await newRequet.patch(`/rentals/update/${id}`, status, {
            headers :{
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(data => {
            if (window.confirm(data.data)) {
                window.location.reload()
            }
        })
        .catch(err => {
            alert('ERR: ', err)
        })
    }

    return (
        <div>
            <h1>Rentals Management</h1>
            <div className="d-grid gap-2 p-3">
                {
                    !isLoading
                        ?
                        rentals
                            ?
                            <Accordion>
                                {
                                    rentals.map(rental =>

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
                                                            {
                                                                roleName === 'STAFF' && <Row>
                                                                    <Col className='d-flex justify-content-around mt-4'>
                                                                        <Button variant="danger" className="w-47" type="button"
                                                                            onClick={() => handleUpdateRental('Canceled', rental.id)}
                                                                        >
                                                                            Cancel this Reservation
                                                                        </Button>
                                                                        <Button variant="success" className="w-47" type="button"
                                                                            onClick={() => handleUpdateRental('Confirmed', rental.id)}
                                                                        >
                                                                            Confirm this Reservation
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            }
                                                            {
                                                                roleName === 'ADMIN' && <Row>
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
                                                            }
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
            </div>
        </div>
    );
};

export default RentalsManager;