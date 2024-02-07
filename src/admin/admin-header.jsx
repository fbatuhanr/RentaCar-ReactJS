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
        <header className="admin-header">
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
            <Navbar expand="lg" bg="white" collapseOnSelect data-bs-theme="white" className="rounded-bottom py-2">
                <Container>
                    <Navbar.Brand href="#" className="d-block d-lg-none fs-6 ms-3">Admin Menu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-admin-navbar-nav" />
                    <Navbar.Collapse id="responsive-admin-navbar-nav">
                        <Nav className="ms-2">
                            <Nav.Link as={Link} to="users" eventKey="i">Users</Nav.Link>
                            <NavDropdown title="Vehicle">
                                <NavDropdown.Item as={Link} to="vehicles/brands" eventKey="i">Brands</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="vehicles/models" eventKey="i">Models</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="vehicles/cars" eventKey="i">Cars</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="locations" eventKey="i">Locations</Nav.Link>
                        </Nav>
                        <Nav className="ms-lg-3 mt-2 mt-lg-0">
                            <Nav.Link as={Link} to="rentals" eventKey="i">User Rentals</Nav.Link>
                            <Nav.Link as={Link} to="contact-form" eventKey="i">Contact Form</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default AdminHeader;