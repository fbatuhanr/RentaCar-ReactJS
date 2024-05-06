import React, { useEffect, useState } from 'react';
import { vehiclesData } from "../DATA/data.jsx";

import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import { Container, Row, Col, Button, InputGroup } from "react-bootstrap";
import { fetchBrands, fetchCars, fetchModels } from "../hooks/useFetchData";
import newRequet from '../utils/request.js';


const CarSearch = () => {

    const [cars, setCars] = useState(null);
    const [brands, setBrands] = useState(null);
    const [models, setModels] = useState(null);
    const [vehicles, setVehicles] = useState([])
    const [showrooms, setShowrooms] = useState()

    const [brandModelIds, setBrandModelIds] = useState(null);

    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [selectedShowroom, setSelectedShowroom] = useState("")
    const [selectedModel, setSelectedModel] = useState("");

    const [carResults, setCarResults] = useState(null);
    const [selectedCarId, setSelectedCarId] = useState("");

    const getShowrooms = async () => {
        await newRequet.get('/showrooms/')
            .then(data => {
                setShowrooms(data.data)
            })
            .catch(err => {
                console.log("ERR when get showrooms: ", err)
            })
    }

    const handleBrandChange = e => {

        let value = e.target.value ? parseInt(e.target.value) || 0 : "";
        setBrand(value);

        if (value === "")
            setSelectedModel("")
    }
    const handleModelChange = e => {

        let value = e.target.value ? parseInt(e.target.value) || 0 : "";
        setSelectedModel(value);

        if (value !== "") {

            let carResults = Object.entries(cars).filter(([k, v]) => v.brandId == brand && v.modelId == value);
            let carResultsIds = carResults.map(i => i[0]);

            setCarResults(carResultsIds);
        }
    }
    const handleSearchVehicles = async () => {

        let params = '?'

        if (brand !== '') {
            params += `brand=${brand}&`
        }
        if (name.trim() !== '') {
            params += `name=${name}&`
        }
        if (selectedShowroom !== '') {
            params += `showroomName=${selectedShowroom}&`
        }

        if (params.length > 1) {
            await newRequet.get(`/vehicles/${params}`)
                .then(data => {
                    console.log(data.data)
                    setVehicles(data.data)
                })
                .catch(err => {
                    alert('ERR: ', err)
                })
        }
    }

    useEffect(() => {
        getShowrooms()

        fetchBrands().then(response => setBrands(response));
        fetchModels().then(response => setModels(response));
        fetchCars().then(response => {
            setCars(response)

            const brandIds = Object.values(response).map(item => ({ brandId: item.brandId, modelId: item.modelId }));
            const brandModelIds = Object.values(brandIds.reduce((acc, obj) => {
                acc[obj.brandId] = acc[obj.brandId] || { brandId: obj.brandId, modelId: [] };

                if (!acc[obj.brandId].modelId.includes(obj.modelId))
                    acc[obj.brandId].modelId.push(obj.modelId);

                return acc;
            }, {}));

            setBrandModelIds(brandModelIds);
        });

    }, []);

    return (
        <div id="car-search" className="pb-1">
            <Container className="py-5">
                <Row>
                    <Col>
                        <h1 className="quinary-color fs-2 p-0 mb-2">
                            Search Your Best Cars
                        </h1>
                        <p className="quinary-color fs-5 p-0 m-0 mb-5">
                            Using 'Content here, content here', making it look like readable
                        </p>
                        <Container>
                            <Row>
                                <Col xs={12} md={3} className="my-2">
                                    <Form.Select
                                        size="lg"
                                        value={brand}
                                        onChange={(e) => { setBrand(e.target.value) }}
                                    >
                                        <option value="">Choose a Brand</option>
                                        <option value='MERCEDES'>MERCEDES</option>
                                        <option value='PURCHER'>PURCHER</option>
                                        <option value='BMW'>BMW</option>
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={3} className="my-2">
                                    <Form.Select
                                        size="lg"
                                        value={selectedShowroom}
                                        onChange={(e) => { setSelectedShowroom(e.target.value) }}
                                    >
                                        <option value="">Choose a Showroom</option>
                                        {
                                            showrooms && showrooms.map(item =>
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={3} className="my-2">
                                    <Form.Control size="lg" type="text" name="name" placeholder="Name"
                                        onChange={e => { setName(e.target.value) }}
                                    />
                                </Col>
                                <Col xs={12} md={3} className="my-2">
                                    <div className="d-grid">
                                        <Link to={
                                            selectedCarId !== ""
                                                ?
                                                `/cars/${brands[brand]}/${Object.values(models).find(i => i.brandId == brand).models[selectedModel]}/${selectedCarId}`
                                                :
                                                null
                                        }
                                            disabled={selectedCarId === ""}
                                        >
                                            <Button onClick={handleSearchVehicles} variant="primary" size="lg" className="search-btn w-100">Search Now</Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Row>
                {
                    vehicles.length > 0 &&
                    vehicles.map(vehicle => {
                        return (
                            <Col style={{ backgroundColor:'#fff', marginRight:'20px', marginBottom:'20px' }} xs={6} md={4} className="py-2" key={vehicle.id}>
                                <div className="gallery-box p-2">
                                    <div style={{ width: '100%', height: '100%' }} className="gallery-img">
                                        <img
                                            src={vehicle.image}
                                            className="img-fluid"
                                            effect="blur"
                                            style={{ height: '266px', objectFit: 'cover', marginBottom: '16px', borderRadius: '4px' }}
                                        />
                                    </div>
                                    <div className="gallery-content text-center">
                                        <h3 className="fs-4 fw-600 p-0">
                                            {vehicle.brand}
                                        </h3>
                                        <p className="fs-5 fw-500 m-0 pt-1 pb-3 primary-color">
                                            {vehicle.name}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        )
                    }
                    )
                }
            </Row>
        </div>
    );
};
export default CarSearch;