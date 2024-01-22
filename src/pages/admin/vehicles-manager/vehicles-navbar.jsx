import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

const VehiclesNavbar = () => {
    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/admin/brands">Brands</Nav.Link>
                            <Nav.Link as={Link} to="/admin/models">Models</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#link">Add Car</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default VehiclesNavbar;