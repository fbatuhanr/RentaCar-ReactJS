import React, { useState } from 'react';

import { NavLink, useNavigate } from "react-router-dom"

import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { loadingContent } from "../../components/general/general-components";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../redux/features/accountSlice';
import { fetchUserData } from '../../redux/features/UserSlice';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const user = useSelector(state => state.UserSlice)

    let isLoading

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(fetchLogin({ username, password }))
            .then(data => {
                dispatch(fetchUserData(username))
                localStorage.setItem('accessToken', data.payload.accessToken)
                navigate('/')
            })

            .catch(err => {
                console.log('err: ', err)
            })
    }

    return (
        <div id="login">
            <Container className="pt-4 pb-5">
                <Row className="mb-5">
                    <Col>
                        <h1 className="fs-1 text-center text-uppercase">Log In</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p className="m-0">Demo Login Informations (Click for Autofill)</p>
                        <p className="m-0">
                            <a href="#" onClick={() => {
                                setUsername("admin")
                                setPassword("123456")
                            }
                            }>
                                For Admin: admin 123456
                            </a>
                        </p>
                        <p className="m-0">
                            <a href="#" onClick={() => {
                                setUsername("staff")
                                setPassword("123456")
                            }
                            }>
                                For Staff: staff 123456
                            </a>
                        </p>
                        <p className="m-0">
                            <a href="#" onClick={() => {
                                setUsername("customer3")
                                setPassword("123456")
                            }
                            }>
                                For User: customer3 123456
                            </a>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row className="justify-content-center">
                            <Col xs={12} md={8} className={isLoading ? "text-center" : null}>
                                {/* {
                                    isLoading
                                        ?
                                        loadingContent
                                        : */}
                                <Form onSubmit={handleLogin}>
                                    <Form.Group className="mb-3" controlId="formBasicusername">
                                        <Form.Label>Username address</Form.Label>
                                        <Form.Control
                                            type="username"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required={true}
                                        />
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
                                        variant="success rent-now-button primary-bg-color border-0 rounded-1 px-4 fw-bold"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </Form>
                                {/* } */}
                                <p>
                                    No account yet? {' '}
                                    <NavLink to="/sign-up">
                                        Sign up
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

export default Login;