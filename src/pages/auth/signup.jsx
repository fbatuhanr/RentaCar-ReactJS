import React, {useState} from "react"

import useAuthentication from "../../hooks/useAuthentication";

import { NavLink, useNavigate } from "react-router-dom"

import {Button, Col, Container, Form, Row} from "react-bootstrap"

const Signup = () => {

    const navigate = useNavigate();

    const {isLoading, signUpCall} = useAuthentication();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault()

        await signUpCall({email, password})
    }

    return (
        <div id="login">
            <Container className="pt-4 pb-5">
                <Row className="mb-5">
                    <Col>
                        <h1 className="fs-1 text-center text-uppercase">Sign Up</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row className="justify-content-center">
                            <Col xs={8}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group>
                                    <Button
                                        variant="primary rent-now-button primary-bg-color border-0 rounded-1 px-4 fw-bold"
                                        type="submit"
                                        onClick={handleSignup}
                                    >
                                        Sign Up
                                    </Button>
                                </Form>
                                <p>
                                    Already have an account?{' '}
                                    <NavLink to="/login" >
                                        Sign in
                                    </NavLink>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;