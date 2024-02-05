import React, {useEffect, useState} from 'react';
import {vehiclesData} from "../DATA/data.jsx";

import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";

import {Container, Row, Col, Button} from "react-bootstrap";
import {fetchBrands, fetchCars, fetchModels} from "../hooks/useFetchData";


const CarSearch = () => {

    const [cars, setCars] = useState(null);
    const [brands, setBrands] = useState(null);
    const [models, setModels] = useState(null);

    const [brandModelIds, setBrandModelIds] = useState(null);

    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const [carResults, setCarResults] = useState(null);
    const [selectedCarId, setSelectedCarId] = useState("");

    const handleBrandChange = e => {

        let value = e.target.value ? parseInt(e.target.value) || 0 : "";
        setSelectedBrand(value);

        if(value === "")
            setSelectedModel("")
    }
    const handleModelChange = e => {

        let value = e.target.value ? parseInt(e.target.value) || 0 : "";
        setSelectedModel(value);

        if(value !== "") {

            let carResults = Object.entries(cars).filter(([k, v]) => v.brandId == selectedBrand && v.modelId == value);
            let carResultsIds = carResults.map(i => i[0]);

            setCarResults(carResultsIds);
        }
    }
    const handleCarChange = e => {

        let value = e.target.value ? parseInt(e.target.value) || 0 : "";
        setSelectedCarId(value);
    }

    useEffect(() => {

        fetchBrands().then(response => setBrands(response));
        fetchModels().then(response => setModels(response));
        fetchCars().then(response => {
            setCars(response)

            const brandIds = Object.values(response).map(item => ({brandId: item.brandId, modelId: item.modelId}));
            const brandModelIds = Object.values(brandIds.reduce((acc, obj) => {
                acc[obj.brandId] = acc[obj.brandId] || { brandId: obj.brandId, modelId: [] };

                if(!acc[obj.brandId].modelId.includes(obj.modelId))
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
                                         value={selectedBrand}
                                         onChange={handleBrandChange}
                                    >
                                        <option value="">Choose a Brand</option>
                                        {
                                            brandModelIds && brandModelIds.map(item =>
                                                <option key={`brand_${item.brandId}`} value={item.brandId}>
                                                    {brands[item.brandId]}
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={3} className="my-2">
                                    <Form.Select
                                        size="lg"
                                        value={selectedModel}
                                        onChange={handleModelChange}
                                    >
                                        <option value="">{selectedBrand ? "Choose a Model" : "---"}</option>
                                        {
                                            selectedBrand !== "" && brandModelIds && brandModelIds
                                                .filter(i => i.brandId == selectedBrand)
                                                .map(item =>
                                                    item.modelId.map(i =>
                                                        <option key={`model_${i}`} value={i}>
                                                            {Object.values(models).find(i => i.brandId == selectedBrand).models[i]}
                                                        </option>
                                                    )
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={3} className="my-2">
                                    <Form.Select
                                        size="lg"
                                        value={selectedCarId}
                                        onChange={handleCarChange}
                                    >
                                        <option value="">---</option>
                                        {
                                            selectedBrand !== "" && selectedModel !== "" &&
                                            carResults && carResults.map(id =>
                                                <option key={`car_${id}`} value={id}>
                                                    {`${new Date().getFullYear()} (ID: ${id})`}
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={3} className="my-2">
                                    <div className="d-grid">
                                        <Link to={
                                                selectedCarId !== ""
                                                    ?
                                                        `/cars/${brands[selectedBrand]}/${Object.values(models).find(i => i.brandId == selectedBrand).models[selectedModel]}/${selectedCarId}`
                                                    :
                                                        null
                                        }
                                              disabled={selectedCarId === ""}
                                        >
                                            <Button variant="primary" size="lg" className="search-btn w-100">Search Now</Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                </Container>
        </div>
    );
};
export default CarSearch;