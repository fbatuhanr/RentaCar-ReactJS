import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, redirect, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'

import { Container, Row, Col, Form, ListGroup, InputGroup, Button, Spinner } from 'react-bootstrap';

import { TbEngine, TbManualGearbox } from "react-icons/tb";
import { BsCarFront, BsFillCarFrontFill, BsFillFuelPumpFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { PiEngineFill } from "react-icons/pi";

import { useDispatch, useSelector } from "react-redux";

import { fetchBrands, fetchModels, fetchCars, fetchLocations } from "../hooks/useFetchData";

import { loadingContent } from "../components/general/general-components";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import newRequet from '../utils/request';

const CarDetail = () => {

    const user = useSelector(({ UserSlice }) => UserSlice);

    const { vehicleId } = useParams();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [rentDate, setRentDate] = useState({ start: getDateByInputFormat(), end: getDateByInputFormat(1) });

    const [vehicle, setVehicle] = useState()
    const accessToken = localStorage.getItem("accessToken")

    const getVehicle = async () => {
        await newRequet.get(`/vehicles/${vehicleId}`)
            .then(data => {
                setVehicle(data.data)
            })
            .catch(err => {
                console.log("ERR when get vehicles: ", err)
            })
    }

    useEffect(() => {
        getVehicle()
    }, []);


    function getDateByInputFormat(dayOffset = 0, date = null) {

        let currentDate = date === null ? new Date() : new Date(date)
        if (dayOffset === 0) return currentDate.toISOString().split('T')[0]

        const offsetDate = new Date(currentDate)
        offsetDate.setDate(currentDate.getDate() + dayOffset)
        return offsetDate.toISOString().split('T')[0]
    }

    const handleCreateRental = async () => {

        if (!user.email) {

            Swal.fire({
                title: "You have to log in",
                text: "Please log in for reservation",
                icon: "info",
                showConfirmButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login")
                }
            });
        }
        else {
            await newRequet.post('/rentals/create', {
                startDate: `${rentDate.start}T08:00:00Z`,
                endDate: `${rentDate.end}T08:00:00Z`,
                vehicleId: vehicle.id
            }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            .then(data => {
                alert(data.data)
            })
            .catch(err => {
                alert('ERR: ', err)
            })
        }
    }

    return (
        <div id="car-detail" style={{ clear: "both" }}>
            <Container className="py-4">
                <Row className="mb-5">
                    <Col>
                        {
                            <h1 className="fs-1 text-center text-uppercase">Complete your reservation information</h1>
                        }
                    </Col>
                </Row>
                {
                    vehicle
                        ?
                        <>
                            <Row className="mb-4">
                                <Col xs={12} md={6}>
                                    <LazyLoadImage
                                        src={vehicle.image}
                                        className="img-fluid"
                                        effect="blur"
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item variant="secondary" action>
                                            <BsFillCarFrontFill size="2em" className="me-2" style={{ marginTop: "-10px" }} />
                                            <span className="fs-6">Brand & Model:</span> &nbsp;
                                            <span className="fs-5 fw-bold">{`${vehicle.brand} / ${vehicle.name}`}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item action>
                                            <BsCarFront size="2em" className="me-2" style={{ marginTop: "-10px" }} />
                                            <span className="fs-6">Name:</span> &nbsp;
                                            <span className="fs-5 fw-bold">{vehicle.name}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item action>
                                            <TbManualGearbox size="2em" className="me-2" style={{ marginTop: "-8px" }} />
                                            <span className="fs-6">Brand:</span> &nbsp;
                                            <span className="fs-5 fw-bold">{vehicle.brand}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item action>
                                            <PiEngineFill size="2em" className="me-2" style={{ marginTop: "-8px" }} />
                                            <span className="fs-6">Specifications:</span> &nbsp;
                                            <span className="fs-5 fw-bold">{vehicle.specifications}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item action>
                                            <FaLocationDot size="2em" className="me-2" style={{ marginTop: "-8px" }} />
                                            <span className="fs-6">Location:</span> &nbsp;
                                            <span className="fs-5 fw-bold">{vehicle.showroom.name}</span>
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
                                    <Row className="justify-content-center">
                                        <Form.Group className="mb-3" controlId="formBasicemail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your email"
                                                value={email !== '' || user.email ? user.email : ''}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required={true}
                                                style={{ width: '100%', height: '40px' }}
                                            />
                                        </Form.Group>
                                        {/* <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                                            <Form.Label>Phone number</Form.Label>
                                            <Form.Control
                                                type="phone"
                                                placeholder="Enter phone Number"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                required={true}
                                                style={{ width: '600px', height: '40px' }}
                                            />
                                        </Form.Group> */}
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col xs={12} md={6}>
                                    <InputGroup size="lg" className="my-2">
                                        <InputGroup.Text id="start-date">Start Date</InputGroup.Text>
                                        <Form.Control
                                            type="date"
                                            min={getDateByInputFormat()}
                                            name="start-date"
                                            placeholder="Start Date"
                                            value={rentDate.start}
                                            onKeyDown={e => e.preventDefault()}
                                            onChange={e => {
                                                setRentDate({
                                                    start: e.target.value,
                                                    end: getDateByInputFormat(1, e.target.value)
                                                })
                                            }}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <InputGroup size="lg" className="my-2">
                                        <InputGroup.Text id="end-date">End Date</InputGroup.Text>
                                        <Form.Control
                                            type="date"
                                            min={getDateByInputFormat(1, rentDate.start)}
                                            name="end-date"
                                            placeholder="End Date"
                                            value={rentDate.end}
                                            onKeyDown={e => e.preventDefault()}
                                            onChange={e => {
                                                setRentDate(prevState => ({
                                                    ...prevState,
                                                    end: e.target.value
                                                }));
                                            }}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="success" size="lg" className="w-100 fs-4 fw-bold"
                                        type="button"
                                        onClick={handleCreateRental}
                                    // disabled={cars[carId].carCount <= 0}
                                    >
                                        Rental Now!
                                    </Button>
                                </Col>
                            </Row>
                        </>
                        :
                        loadingContent
                }
            </Container >
        </div >
    )
};

export default CarDetail;