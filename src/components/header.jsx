import React from 'react';
import {IoLocation, IoLocationOutline} from "react-icons/io5";
import {LiaCarSideSolid, LiaHandsHelpingSolid} from "react-icons/lia";

import {Link} from "react-router-dom";
import {Container, Row, Nav, Navbar, NavDropdown, Col} from "react-bootstrap";

const Header = () => {
    return (
        <header id="header">
            <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary header-line-1">
                <Container>
                    <Navbar.Brand as={Link} to="/">Rent a Car</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Nav.Link as={Link} to="/services">Services</Nav.Link>
                            <Nav.Link as={Link} to="/vehicles">Vehicles</Nav.Link>
                            <Nav.Link as={Link} to="/client">Client</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#memes">Help <LiaHandsHelpingSolid size="1.25em" className="align-text-bottom"/></Nav.Link>
                            <Nav.Link href="#deets">My Rentals <LiaCarSideSolid size="1.25em" className="align-text-top"/></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid className="header-line-2 py-2 text-white fs-5">
            <Row className="justify-content-md-center text-center">
                <Col xs={8}>
                    <Row>
                        <Col>
                            <IoLocation/>
                            <span>Location</span>
                        </Col>
                        <Col>
                            <span>(+71) 8522369417</span>
                        </Col>
                        <Col>
                            <span>demo@gmail.com</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </Container>
        </header>
    );
};

export default Header;