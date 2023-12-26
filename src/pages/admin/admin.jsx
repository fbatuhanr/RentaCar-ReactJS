import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Navbar, Nav, Form, Button} from "react-bootstrap";
import {NavLink, Link} from "react-router-dom";


const Admin = () => {

    const [users, setUsers] = useState(null);

    const [vehicle, setVehicle] = useState({
        brand: null,
        model: null,
        hp: null,
        engineSize: null,
        gearBox: null,
        bodyType: null,
        fuelType: null
    });

    useEffect(()=>{

    },[]);

    return (
        <Container fluid className="p-0">
            <Row>
                <Col xs={3}>
                    <NavLink to="/admin/users">
                        <Button variant="primary" className="w-100">Users</Button>
                    </NavLink>
                    <NavLink to="/admin/vehicles">
                        <Button variant="primary" className="w-100">Vehicles</Button>
                    </NavLink>
                </Col>
                <Col xs={3}>
                    <Form>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Brand</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    name="brand"
                                    value={null}
                                    placeholder="Type here..."
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Model</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Type here..." />
                            </Col>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;