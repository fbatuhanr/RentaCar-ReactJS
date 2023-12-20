import React from 'react';

import useAuthentication from "../hooks/useAuthentication";

import {useNavigate, Link} from "react-router-dom";
import {Container, Row, Nav, Navbar, NavDropdown, Col, Button} from "react-bootstrap";

import Swal from "sweetalert2";

import {IoLocation, IoLocationOutline} from "react-icons/io5";
import {LiaCarSideSolid, LiaHandsHelpingSolid} from "react-icons/lia";
import {BsTelephoneFill} from "react-icons/bs";
import {GrMail} from "react-icons/gr";
import {useSelector} from "react-redux";
import {FaUser, FaUserPlus} from "react-icons/fa";
import {RxSlash} from "react-icons/rx";

const Header = () => {

    const navigate = useNavigate();

    const user = useSelector(({UserSlice}) => UserSlice.user);

    const {signOutCall} = useAuthentication();

    const handleLogout = async () => {
        await signOutCall();
    }

    const handleHelpButtonClick = e => {
        e.preventDefault()

        Swal.fire(
            'Do you need help?',
            'You can contact with us 24/7.',
            'question'
        )
    }

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
                            {
                                user.email
                                    ?
                                        <Nav.Link as={Link} to="/my-rentals">My Rentals <LiaCarSideSolid size="1.25em" className="align-text-top"/></Nav.Link>
                                    :
                                    <>
                                        <Nav.Link as={Link} to="/login" className="d-inline px-0">Login <FaUser className="align-text-top"/></Nav.Link>
                                        <RxSlash className="mt-2"/>
                                        <Nav.Link as={Link} to="/sign-up" className="d-inline px-0">Sign Up <FaUserPlus size="1.1em" className="align-text-top"/></Nav.Link>
                                    </>
                            }
                            <Nav.Link as={Link} to="/" onClick={handleHelpButtonClick}>Help <LiaHandsHelpingSolid size="1.25em" className="align-text-bottom"/></Nav.Link>
                            {
                                user.email && <Button variant="danger" className="py-0" onClick={handleLogout}>Log out</Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid className="header-line-2 py-md-2 text-white fs-5">
            <Row className="justify-content-md-center text-center">
                <Col xs={12} md={8}>
                    <Row>
                        <Col xs={12} md={4}>
                            <span className="fs-6">
                                <IoLocation className="header-line-2-icon"/>&nbsp;
                                <a href="https://goo.gl/maps/2rkkAA9FP5pegCXF9" target="_blank" className="text-white">New York</a>
                            </span>
                        </Col>
                        <Col xs={12} md={4}>
                          <span className="fs-6">
                            <BsTelephoneFill size="0.9em" className="header-line-2-icon"/>&nbsp;
                              <a href="tel:+12126583916" target="_blank" className="text-white">(212) 658-3916</a>
                          </span>
                        </Col>
                        <Col xs={12} md={4}>
                          <span className="fs-6">
                            <GrMail className="header-line-2-icon"/>&nbsp;
                              <a href="mailto:info@rentacar" target="_blank" className="text-white">info@rentacar</a>
                          </span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </Container>
        </header>
    );
};

export default Header;