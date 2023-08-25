import React from 'react';
import {useSelector} from "react-redux";


import {Container, Row, Col, Button, Card} from "react-bootstrap";

const MyRentals = () => {

    const {reserveData} = useSelector(state => state.reserveInfo);

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
                            <Row>
                                <Col xs={4} className="border-end">
                                    <Card.Img src="https://raw.githubusercontent.com/fbatuhanr/RentaCar-ReactJS/master/src/assets/images/hyundai/i20.png" />
                                </Col>
                                <Col xs={8}>
                                    <Card.Body>
                                        <Card.Title className="text-center">{reserveData.carModel}</Card.Title>
                                        <Card.Text>
                                            Data:
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
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MyRentals;