import React, { useState } from "react"


import { NavLink, useNavigate } from "react-router-dom"

import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import { loadingContent } from "../../components/general/general-components";
import { fetchRegister } from "../../redux/features/accountSlice";
import { useDispatch } from "react-redux";

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    let isLoading

    const [email, setEmail] = useState("");
    const [clientName, setclientName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        const userData = {
            username: clientName.trim(),
            password: password.trim(),
            email: email.trim(),
            roleName: "CUSTOMER"
        }

        if (clientName.trim() === '') {
            alert("Username is requied!")
        }
        else if (password.trim() === '') {
            alert("Password is requied!")
        }
        else if (email.trim() === '') {
            alert("Email is requied!")
        } else {
            console.log(userData)
            dispatch(fetchRegister(userData))
                .then(data => {
                    console.log(data)
                    navigate('/login')
                })
                .catch(err => {
                    console.log('err: ', err)
                })
        }
    }

    return (
        <div id="sign-up">
            <Container className="pt-4 pb-5">
                <Row className="mb-5">
                    <Col>
                        <h1 className="fs-1 text-center text-uppercase">Sign Up</h1>
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
                                            <Form.Group className="mb-3" controlId="formBasicClientName">
                                                <Form.Label>Full name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter full name"
                                                    value={clientName}
                                                    onChange={(e) => setclientName(e.target.value)}
                                                    required={true}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required={true}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required={true}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="Check me out" />
                                            </Form.Group>
                                            <Button
                                                variant="success rent-now-button primary-bg-color border-0 rounded-1 px-4 fw-bold"
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