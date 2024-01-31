import React from 'react';
import {Navbar, Container, Row, Col, Button, NavDropdown} from "react-bootstrap";
import {useSelector} from "react-redux";
import useAuthentication from "../hooks/useAuthentication";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

const AdminHeader = () => {

    const user = useSelector(({UserSlice}) => UserSlice.user);

    const {signOutCall} = useAuthentication();
    const handleLogout = async () => {
        await signOutCall();
    }

    return (
        <header>
            <div className="bg-body-tertiary px-2 pt-4 pb-2">
                <Container>
                    <Row>
                        <Col xs={12} md={6} className="text-center text-sm-start">
                            <h2 className="mt-1 mb-2">
                                <Link as={Link} to="/admin">Rent a Car | Management</Link>
                            </h2>
                        </Col>
                        <Col xs={12} md={6}>
                            <Row>
                                <Col xs={8} md={9}>
                                    <h5>
                                        Signed in as: <br/><label className="text-dark fw-500">{`${user.email} (${user.role})`}</label>
                                    </h5>
                                </Col>
                                <Col xs={4} md={3}>
                                    <Button variant="outline-danger" className="mt-2 py-1" type="button" onClick={handleLogout}>Log out!</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Navbar className="bg-body-tertiary rounded-bottom fw-500 py-1">
                <Container>
                    <Navbar.Collapse className="justify-content-start">
                        <Nav className="ms-2">
                            <Nav.Link as={Link} to="users">Users</Nav.Link>
                            <NavDropdown title="Vehicle">
                                <NavDropdown.Item as={Link} to="vehicles/brands">Brands</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="vehicles/models">Models</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="vehicles/cars">Cars</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="locations">Locations</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="me-4">
                            <Nav.Link as={Link} to="rentals">User Rentals</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default AdminHeader;