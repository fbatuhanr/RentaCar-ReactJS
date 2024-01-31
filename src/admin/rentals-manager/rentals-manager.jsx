import React, {useEffect, useState} from 'react';
import {Accordion, Button, Card, Col, Form, InputGroup, ListGroup, Row} from "react-bootstrap";

import {fetchCars, fetchLocations, fetchReservations} from "../../hooks/useFetchData";
import {loadingContent} from "../../components/general/general-components";
import {BsCarFront, BsFillCarFrontFill, BsFillFuelPumpFill} from "react-icons/bs";
import {TbEngine, TbManualGearbox} from "react-icons/tb";
import {PiEngineFill} from "react-icons/pi";

import {doc, getDocs, deleteDoc, query, collection, where} from "firebase/firestore";
import { db } from "../../config/firebase";
import Swal from "sweetalert2";

const RentalsManager = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [cars, setCars] = useState(null);
    const [locations, setLocations] = useState(null);

    const [reservations, setReservations] = useState(null);

    const groupReservationsWithSameOwner = (allReservations) => {

        return allReservations.reduce((acc, curr) => {

            let key = curr["reservationOwner"]
            if(!acc[key]) acc[key] = []

            acc[key].push(curr)

            return acc
        }, {});
    }

    useEffect(() => {

        Promise.all([
            fetchCars(),
            fetchLocations(),
            fetchReservations(),
        ])
        .then(responses => {
            setCars(responses[0])
            setLocations(responses[1])
            setReservations( responses[2] ? groupReservationsWithSameOwner(responses[2]) : responses[2] )

            setIsLoading(false);
        });
    }, []);

    const handleCancelAllReservations = () => {

    }
    const handleCancelUserReservations = async (owner) => {

        Swal.fire({
            title: "Do you want to cancel all reservation of this user?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel all!",
            cancelButtonText: "No"
        }).then(async (result) => {

            if (result.isConfirmed) {

                const q = query(collection(db, "rentals"), where("reservationOwner", "==", owner));
                const querySnapshot = await getDocs(q);

                Promise.all(querySnapshot.docs.map(async (doc) => {
                    await deleteDoc(doc.ref)
                }))
                    .then(() => {

                        Swal.fire(
                            `User's All Reservations Cancelled!`,
                            `Reservations has been removed!`,
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!"
                        });
                    });;
            }
        });
    }

    const handleCancelSpecificReservation = async documentId => {

        Swal.fire({
            title: "Do you want to cancel this reservation?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {

                deleteDoc(doc(db, "rentals", documentId))
                    .then(() => {

                        Swal.fire(
                            'Reservation Cancelled!',
                            'Selected car has been removed!',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!"
                        });
                    });
            }
        });
    }

    return (
        <div>
            <h1>Rentals Management</h1>
            <div className="d-grid gap-2 p-3">
                {
                    !isLoading
                    ?
                        reservations
                        ?
                            <Accordion>
                                {
                                    Object.entries(reservations).map(([groupKey, reserveGroup], index) =>

                                        <Accordion.Item key={index} eventKey={index}>
                                            <Accordion.Header className="m-0 p-0">
                                                <h3 className="m-0 p-0">
                                                    <span>USER: </span>
                                                    <span className="fw-600">{groupKey}</span>
                                                </h3>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Accordion className="my-2">
                                                {
                                                    reserveGroup.map((reserveData, index) =>
                                                        <Accordion.Item eventKey={index}>
                                                            <Accordion.Header className="m-0 p-0">
                                                                <h3 className="m-0 p-0">
                                                                    <BsFillCarFrontFill size="2em" className="me-2" style={{marginTop: "-10px"}}/>
                                                                    <span className="fs-5 fw-bold">{`${reserveData.carBrand} / ${reserveData.carModel}`}</span>
                                                                </h3>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                    <Col xs={12}>
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
                                                                        <Row>
                                                                            <Col>
                                                                                <Button variant="danger" className="w-100" type="button"
                                                                                    onClick={() => handleCancelSpecificReservation(reserveData.documentId)}
                                                                                >
                                                                                    Cancel this Reservation
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    )
                                                }
                                                </Accordion>

                                                <div className="mt-2">
                                                    <Button variant="danger" className="w-100" type="button"
                                                        onClick={() => handleCancelUserReservations(groupKey)}
                                                    >
                                                        Cancel all reservations for this user
                                                    </Button>
                                                </div>
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