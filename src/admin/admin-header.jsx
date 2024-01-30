import React from 'react';
import {Navbar, Container, Button, NavDropdown} from "react-bootstrap";
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
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Rent a Car | Management</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text>
                            Signed in as: <label className="text-dark fw-500">{`${user.email} (${user.role})`}</label>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button variant="outline-danger" className="py-1" type="button" onClick={handleLogout}>Log out!</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar className="bg-body-tertiary rounded-bottom fw-500">
                <Container>
                    <Navbar.Collapse className="justify-content-start">
                        <Nav className="ms-2">
                            <Nav.Link as={Link} to="users">Users</Nav.Link>
                            <NavDropdown title="Vehicle" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="vehicles/brands">Brands</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="vehicles/models">Models</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="vehicles/add">Add Car</NavDropdown.Item>
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