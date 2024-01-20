import React, {useEffect, useRef, useState} from 'react';

import { doc, setDoc, getDoc } from "firebase/firestore";
import {db} from "../../config/firebase";

import {Container, Row, Col, Navbar, Nav, Form, Button, Card, InputGroup} from "react-bootstrap";
import {NavLink, Link} from "react-router-dom";
import {current} from "@reduxjs/toolkit";


const Admin = () => {

    const [brands, setBrands] = useState({});
    const [newBrand, setNewBrand] = useState("");


    useEffect(() => {

        getBrands();

    }, []);
    const getBrands = async () => {

        const docRef = doc(db, "vehicle", "brands");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setBrands(docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBrands((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddNewBrand = () => {

        let newBrandIndex = Object.values(brands).length;
        setBrands((prevState) => ({
            ...prevState,
            [newBrandIndex]: newBrand,
        }));

        setNewBrand("");
    }
    const handleRemoveBrand = (ind) => {

         setBrands(current => {

            const copy = {...current};
            delete copy[`${ind}`];

            return copy;
        });

        setBrands(current => {

            let copy = {...current};
            console.log(copy);
            Object.keys(copy).map((id, index) => {

                copy[`${index}`] = copy[`${id}`];
                if(index != id) delete copy[`${id}`];
            })
            console.log(copy);
            return copy;
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        await setDoc(doc(db, "vehicle", "brands"), brands);
    }

    return (
        <Container fluid className="p-0">
            <Row>
                <Col xs={3}>
                    <NavLink to="/admin/users">
                        <Button variant="primary" className="w-100">Users</Button>
                    </NavLink>
                    <NavLink to="/admin/vehicles">
                        <Button variant="primary" className="w-100">Vehicles</Button>
                    </NavLink>
                </Col>
                <Col xs={6}>
                    <Form onSubmit={handleSubmit}>
                        <div className="d-grid gap-2 p-2 border border-1 rounded">
                            {
                                brands && Object.values(brands).map((item, index) =>

                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            name={index}
                                            value={item}
                                            onChange={handleInputChange}
                                            placeholder="Brand..."
                                        />
                                    <InputGroup.Text className="p-0">
                                        <Button variant="danger" type="button" onClick={() => handleRemoveBrand(index)}>
                                            Remove
                                        </Button>
                                    </InputGroup.Text>
                                    </InputGroup>
                                )
                            }

                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={newBrand}
                                    onChange={e => setNewBrand(e.target.value)}
                                    placeholder="Brand..."
                                />
                                <InputGroup.Text className="p-0">
                                    <Button variant="primary" type="button" onClick={handleAddNewBrand}>
                                        Add New
                                    </Button>
                                </InputGroup.Text>
                            </InputGroup>

                            <Button variant="success" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;