import React, {useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {useParams} from "react-router-dom";

import data from '../DATA/data.json';
import {getNextKeyDef} from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import { Col, Container, Row } from 'react-bootstrap';

const CarDetail = () => {

    const {carBrand, carModel} = useParams();

    const [modelProperties, setModelProperties] = useState();

    useEffect(()=>{

        setModelProperties(data.find(item => item.brand === carBrand).model[carModel])

    },[]);

    return (
        <Container>,
            {
                modelProperties ?
                    <Row>
                        <Col><img src={modelProperties.imageUrl}/></Col>
                        <Col>
                        <ListGroup>
                            <ListGroup.Item>Brand: - Model:  <b>{carBrand} - {carModel}</b></ListGroup.Item>
                            <ListGroup.Item>HP: {modelProperties.power}</ListGroup.Item>
                            <ListGroup.Item>Engine Size: {modelProperties.engineSize}</ListGroup.Item>
                            <ListGroup.Item>Gear Box: {modelProperties.gearbox}</ListGroup.Item>
                            <ListGroup.Item>Body Type: {modelProperties.bodyType}</ListGroup.Item>
                            <ListGroup.Item> Fuel Type: {modelProperties.fuelType}</ListGroup.Item>
                        </ListGroup>
                        <p></p>
                        
                        
                        </Col>
                        
                    </Row>
                    : null
            }
        </Container>
    );
};

export default CarDetail;