import React, {useState} from "react"

import useAuthentication from "../../hooks/useAuthentication";

import { NavLink, useNavigate } from "react-router-dom"

import {Alert, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap"
import {loadingContent} from "../../components/general/general-components";

const Signup = () => {

    const navigate = useNavigate();

    const {isLoading, message, signUpCall} = useAuthentication();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try{
            const signUp = await signUpCall({email, password})
        }
        catch (e) {

        }
    }

    return (
        <div id="sign-up">
            <Container className="pt-4 pb-5">
                <Row className="mb-5">
                    <Col>
                        <h1 className="fs-1 text-center text-uppercase">Sign Up</h1>
                        {
                            message !== null &&
                            (message.isError
                            ? <Alert key="danger" variant="danger">{message.content}</Alert>
                            : <Alert key="success" variant="success">{message.content}</Alert>)
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row className="justify-content-center">
                            <Col xs={12} md={8} className={isLoading ? "text-center" : null}>
                                {
                                    isLoading
                                    ?
                                        loadingContent
                                    :
                                    <Form onSubmit={handleSignup}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required={true}
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
                                                required={true}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Check me out" />
                                        </Form.Group>
                                        <Button
                                            variant="primary rent-now-button primary-bg-color border-0 rounded-1 px-4 fw-bold"
                                            type="submit"
                                        >
                                            Sign Up
                                        </Button>
                                    </Form>
                                }
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