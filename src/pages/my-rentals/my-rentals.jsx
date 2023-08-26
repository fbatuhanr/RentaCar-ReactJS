import React from 'react';
import {useSelector} from "react-redux";
import {TbEngine, TbManualGearbox} from "react-icons/tb";
import {BsCarFront, BsFillCarFrontFill, BsFillFuelPumpFill} from "react-icons/bs";
import {PiEngineFill} from "react-icons/pi";
import Swal from 'sweetalert2'
import {Container, Row, Col, Button, Card, ListGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const MyRentals = () => {

    const {reserveData} = useSelector(state => state.reserveInfo);
    const navigate = useNavigate();
    if (reserveData!=null) {
        return (
            <div id="my-rentals" style={{clear: "both"}}>
                <Container className="py-4">
                    <Row className="mb-5">
                        <Col>
                            <h1 className="fs-1 text-center text-uppercase">My Rentals</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <Card className="my-2">
                                <Row className="mb-4">
                                    <Col xs={4} className="border-end">
                                        <Card.Img src="https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/hyundai/i20.png" />
                                    </Col>
                                        <Card.Body>
                                        <Card.Title className='text-left'>Car Properties</Card.Title>
                                            <Card.Text>
                                            <Col xs={12} md={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item variant="secondary" action>
                                    <BsFillCarFrontFill size="2em" className="me-2" style={{marginTop: "-10px"}}/>
                                    <span className="fs-6">Brand & Model:</span> &nbsp;
                                    <span className="fs-5 fw-bold">{`${reserveData.carBrand} / ${reserveData.carModel}`}</span>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <TbEngine size="2em" className="me-2" style={{marginTop: "-8px"}}/>
                                    <span className="fs-6">HP:</span> &nbsp;
                                    <span className="fs-5 fw-bold">{reserveData.power}</span>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <PiEngineFill size="2em" className="me-2" style={{marginTop: "-8px"}}/>
                                    <span className="fs-6">Engine Size:</span> &nbsp;
                                    <span className="fs-5 fw-bold">{reserveData.engineSize}</span>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <TbManualGearbox size="2em" className="me-2" style={{marginTop: "-8px"}}/>
                                    <span className="fs-6">Gear Box:</span> &nbsp;
                                    <span className="fs-5 fw-bold">{reserveData.gearbox}</span>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <BsCarFront size="2em" className="me-2" style={{marginTop: "-10px"}}/>
                                    <span className="fs-6">Body Type:</span> &nbsp;
                                    <span className="fs-5 fw-bold">{reserveData.bodyType}</span>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <BsFillFuelPumpFill size="2em" className="me-2" style={{marginTop: "-10px"}}/>
                                    <span className="fs-6">Fuel Type:</span> &nbsp;
                                    <span className="fs-5 fw-bold">{reserveData.fuelType}</span>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                {
                                                reserveData.starDate
                                            }
                                            {
                                                reserveData.endDate
                                            }
                                            {
                                                reserveData.pickupLocation
                                            }
                                            {
                                                reserveData.dropoffLocation
                                            }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                                            </Card.Text>
                                        </Card.Body>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You have no reservations!!',
            footer: 'you are being directed...'
          })
          navigate('../pages/home');
    }
   
};

export default MyRentals;