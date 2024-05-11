import React, { useEffect } from 'react';


import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import { Container, Row, Nav, Navbar, NavDropdown, Col, Button } from "react-bootstrap";

import Swal from "sweetalert2";

import { IoLocation, IoLocationOutline } from "react-icons/io5";
import { LiaCarSideSolid, LiaHandsHelpingSolid } from "react-icons/lia";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { RxSlash } from "react-icons/rx";

import { isAdmin } from "../config/general";
import { clearUserData } from '../redux/features/UserSlice';
import { logout } from '../redux/features/accountSlice';

const Header = () => {

    const location = useLocation();
    console.log('loc: ', location)
    const dispatch = useDispatch()

    const user = useSelector(({ UserSlice }) => UserSlice);

    console.log(user)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        dispatch(clearUserData())
    }

    return <>
        {
            !location.pathname.includes("admin") &&
            <header id="header">
                {
                    user.roleName && user.roleName !== 'CUSTOMER' &&
                    <NavLink to="/admin">
                        <Button variant="primary" className="w-100 rounded-0 fw-bold">
                            Click here for Admin Panel!
                        </Button>
                    </NavLink>
                }
                <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary header-line-1">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Car World</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/" eventkey="i">Home</Nav.Link>
                                <Nav.Link as={Link} to="/about" eventkey="i">About</Nav.Link>
                                <Nav.Link as={Link} to="/payment" eventkey="i">Payment</Nav.Link>
                                <Nav.Link as={Link} to="/rental" eventkey="i">Rental</Nav.Link>
                            </Nav>
                            <Nav>
                                {
                                    user.email
                                        ?
                                        <Nav.Link as={Link} to="/my-rentals" eventkey="i">My Rentals <LiaCarSideSolid size="1.25em" className="align-text-top" /></Nav.Link>
                                        :
                                        <>
                                            <Nav.Link as={Link} to="/login" className="d-inline px-0-md" eventkey="i">Login <FaUser className="align-text-top" /></Nav.Link>
                                            <RxSlash className="mt-2 d-none d-lg-block" />
                                            <Nav.Link as={Link} to="/sign-up" className="d-inline px-0-md" eventkey="i">Sign Up <FaUserPlus size="1.1em" className="align-text-top" /></Nav.Link>
                                        </>
                                }

                                {
                                    user.email && <Button variant="danger" className="py-0" onClick={handleLogout} eventkey="i">Log out</Button>
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
                                        <IoLocation className="header-line-2-icon" />&nbsp;
                                        <a href="https://maps.app.goo.gl/wphsTnigtYHeVGfz8" target="_blank" className="text-white">Nha Be Campus</a>
                                    </span>
                                </Col>
                                <Col xs={12} md={4}>
                                    <span className="fs-6">
                                        <BsTelephoneFill size="0.9em" className="header-line-2-icon" />&nbsp;
                                        <a href="tel:+12126583916" target="_blank" className="text-white">(84)(89)815-4773</a>
                                    </span>
                                </Col>
                                <Col xs={12} md={4}>
                                    <span className="fs-6">
                                        <GrMail className="header-line-2-icon" />&nbsp;
                                        <a href="mailto:info@rentacar" target="_blank" className="text-white">info@carworld</a>
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </header>
        }
    </>
};

export default Header;