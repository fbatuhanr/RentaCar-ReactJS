import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Button} from "react-bootstrap";
import {vehiclesData} from "../DATA/data.jsx";
import {Link} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../config/firebase";

const CarOffers = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [cars, setCars] = useState(null);
    const [brands, setBrands] = useState(null);
    const [models, setModels] = useState(null);


    useEffect(() => {

        const fetchBrands = async () => {

            const docRef = doc(db, "vehicle", "brands");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document (vehicle/brands)!");
                return {};
            }
        }
        const fetchModels = async () => {

            const docRef = doc(db, "vehicle", "models");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document (vehicle/models)!");
                return {};
            }
        }
        const fetchCars = async () => {

            const docRef = doc(db, "vehicle", "cars");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document (vehicle/cars)!");
                return {};
            }
        }

        fetchBrands().then(response => setBrands(response));
        fetchModels().then(response => setModels(response));
        fetchCars().then(response => setCars(response));

    }, []);

    return (
        <div id="car-offers" style={{clear: "both"}}>
            <Container className="py-4">
              <Row className="mb-5">
                <Col>
                    <h1 className="fs-1 text-center text-uppercase">Our Best Offers</h1>
                </Col>
              </Row>
                <Row>
                    {
                        cars && brands && models && Object.entries(cars).map(([key, value]) => {

                            let brand = brands[value.brandId];
                            let model = Object.values(models).find(i => i.brandId == value.brandId).models[value.modelId];
                            return (
                                <Col xs={6} md={4} className="py-2">
                                    <div className="gallery-box p-2">
                                        <div className="gallery-img">
                                            <img src={value.image} className="img-fluid"/>
                                        </div>
                                        <div className="gallery-content text-center">
                                            <h3 className="fs-4 fw-600 p-0">
                                                {brand}
                                            </h3>
                                            <p className="fs-5 fw-500 m-0 pt-1 pb-3 primary-color">
                                                {model}
                                            </p>
                                            <div className="d-grid pb-2">
                                                <Link to={`/cars/${brand}/${model}/${key}`}>
                                                    <Button variant="primary rent-now-button primary-bg-color border-0 rounded-1 px-4 fw-bold">Rent Now</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                )
                            }
                        )
                    }
                    {
                        vehiclesData.map(vehicle =>
                            Object.entries(vehicle.model).map(model =>
                                 <Col xs={6} md={4} className="py-2">
                                    <div className="gallery-box p-2">
                                        <div className="gallery-img">
                                            <img src={model[1].imageUrl} className="img-fluid"/>
                                        </div>
                                        <div className="gallery-content text-center">
                                            <h3 className="fs-4 fw-600 p-0">
                                                {vehicle.brand}
                                            </h3>
                                            <p className="fs-5 fw-500 m-0 pt-1 pb-3 primary-color">
                                                {model[0]}
                                            </p>
                                            <div className="d-grid pb-2">
                                                <Link to={`/cars/${vehicle.brand}/${model[0]}`}>
                                                    <Button variant="primary rent-now-button primary-bg-color border-0 rounded-1 px-4 fw-bold">Rent Now</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        )
                    }
                </Row>
            </Container>
        </div>
    );
};
export default CarOffers;