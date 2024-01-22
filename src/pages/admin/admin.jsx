import React from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import {NavLink, Outlet} from "react-router-dom";
import VehiclesManager from "./vehicles-manager/vehicles-manager";


const Admin = () => {

    return (
        <>
            <Container fluid className="p-1">
                <Row>
                    <Col xs={3}>
                        <NavLink to="/admin/users">
                            <Button variant="primary" className="w-100">Users</Button>
                        </NavLink>
                        <NavLink to="/admin/vehicles">
                            <Button variant="primary" className="w-100">Vehicles</Button>
                        </NavLink>
                    </Col>
                    <Col xs={7}>
                        <VehiclesManager />
                        <Outlet />
                        {/*
                            We used Outlet for Nested Routing (router v6.21.3)
                        */}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Admin;