import React from 'react';
import {Container, Row, Col, Form, Button} from "react-bootstrap";


const ContactSection = () => {
    return (
    <div id="contact-section">
        <Container className="pt-4">
            <Row className="mb-5">
                <Col>
                    <h1 className="fs-1 text-center text-uppercase">Get In Touch</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="primary-bg-color py-5 rounded-top">
                        <Row className="justify-content-center">
                            <Col xs={8} className="text-center">
                                <Form.Control type="text" placeholder="Name" className="mb-2"/>
                                <Form.Control type="email" placeholder="Email" className="mb-2"/>
                                <Form.Control type="tel" placeholder="Phone Number" className="mb-2"/>
                                <Form.Control as="textarea" rows={3} placeholder="Message" className="mb-2"/>
                                <div className="d-grid">
                                <Button variant="secondary" className="border-0 py-2" type="button">SEND</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    );
};
export default ContactSection;