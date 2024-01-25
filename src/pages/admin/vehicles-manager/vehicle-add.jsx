import React, {useEffect, useRef, useState} from 'react';
import {Accordion, Button, Form, InputGroup} from "react-bootstrap";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc, setDoc, serverTimestamp} from "firebase/firestore";
import { db, storage } from "../../../config/firebase";
import Swal from "sweetalert2";

const VehicleAdd = () => {

    const [cars, setCars] = useState(null);
    const [isOK, setIsOK] = useState(false);

    const [brands, setBrands] = useState(null);
    const [models, setModels] = useState(null);

    const [modelsByBrandId, setModelsByBrandId] = useState(null);

    useEffect(() => {

        const fetchCars = async () => {

            const docRef = doc(db, "vehicle", "cars");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document!");
            }
        }
        const fetchBrands = async () => {

            const docRef = doc(db, "vehicle", "brands");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document!");
            }
        }
        const fetchModels = async () => {

            const docRef = doc(db, "vehicle", "models");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document!");
            }
        }


        fetchCars().then(response => setCars(response));
        fetchBrands().then(response => setBrands(response));
        fetchModels().then(response => setModels(response));

    }, []);

    const handleBrandChange = e => {

        let selectedValue = e.target.value;

        let currentModels = selectedValue && Object.values(models).find(i => i.brandId == selectedValue).models;
        setModelsByBrandId(currentModels);
    }


    useEffect(() => {

        if(isOK && cars){
            console.log("tetiklendi!");
            console.log(cars);
            setDocFirebase();
            setIsOK(false);
        }

    }, [cars, isOK])
    const handleSubmit = async event => {

       event.preventDefault();

        console.log(cars);

        await Promise.all(

            Object.values(cars).map(async (item, index) => {

                if(!('File' in window && item.image instanceof File)) // if it is not file (firebaseurl) then no changes happened so skip upload
                    return null;

                const uploadedImageUrl = await uploadImageToStorage(item.image);
                setCars((prevState) => ({
                    ...prevState,
                    [index]: {
                        ...prevState[index],
                        image: uploadedImageUrl
                    }
                }))
            })
        );

        console.log(cars);
        setIsOK(true);
    }

    const setDocFirebase = async () => {
        await setDoc(doc(db, "vehicle", "cars"), cars);

        Swal.fire({
            title: "Good job!",
            text: "All changes saved!",
            icon: "success"
        });
    }

    const uploadImageToStorage = async file => {

        return new Promise((resolve, reject) => {

            const storageRef = ref(storage, `vehicle-images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file, file.type);

            uploadTask.on('state_changed', (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% Done!`);

                }, (err) => {

                    console.log(`Upload Error: ${err}`)
                    reject();

                }, () => {

                    console.log("Upload is Completed!");
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {

                        console.log("download url ready: " + downloadURL);
                        resolve(downloadURL)
                    });
                }
            );
        });
    }


    const handleAddNewSubmit = event => {

        event.preventDefault();

        console.log(event.target.elements)

        let eventElementsArray =
            Array.from(event.target.elements)
                .filter(element => element.name)
                .map(e => ({
                    [e.name]: e.name != 'image' ? e.value : e.files[0]
                }));
        let newCar = Object.assign({}, ...eventElementsArray);


        let newCarIndex = cars ? Object.values(cars).length : 0;

        setCars((prevState) => ({
            ...prevState,
            [newCarIndex]: newCar,
        }));

    }

    const inputChange = (event, index) => {

        const e = event.target;

        setCars(current => {
            return {
                ...current,
                [index]: {
                    ...current[index],
                    [e.name]: e.name != 'image' ? e.value : e.files[0]
                }
            }
        })
    }

    const displayCurrentImage = imgUrl => {

        Swal.fire({
            imageUrl: imgUrl,
            imageWidth: "100%",
            imageAlt: "Car Image"
        });
    }

    return (
        <div>
            <h1>Vehicle Models</h1>
                <div className="d-grid gap-2 p-3 border border-1 rounded">

                    {
                        cars && brands && models
                        ?
                            <Accordion defaultActiveKey="0">
                                {
                                    Object.values(cars).map((item, index) => {

                                    let brandName = Object.values(brands)[item.brandId];
                                    let modelName = Object.values(models).find(i => i.brandId == item.brandId).models[item.modelId];

                                    let currentModelsByBrandId = Object.values(models).find(i => i.brandId == item.brandId).models;

                                        return (
                                            <Accordion.Item key={index} eventKey={index}>
                                                <Accordion.Header className="m-0 p-0">{brandName} / {modelName}</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="mb-3 input-groups-1">
                                                        <h3>Vehicle Properties</h3>
                                                        <InputGroup className="my-1">
                                                            <InputGroup.Text>Brand</InputGroup.Text>
                                                            <Form.Select
                                                                name="brandId"
                                                                defaultValue={item.brandId}
                                                                onChange={event => inputChange(event, index)}
                                                            >
                                                                <option value="">Select a Brand...</option>
                                                                {
                                                                    Object.entries(brands).map(([key, value]) =>
                                                                        <option value={key} key={key}>{value}</option>
                                                                    )
                                                                }
                                                            </Form.Select>
                                                        </InputGroup>
                                                        <InputGroup className="my-1">
                                                            <InputGroup.Text>Model</InputGroup.Text>
                                                            <Form.Select
                                                                name="modelId"
                                                                defaultValue={item.modelId}
                                                                onChange={event => inputChange(event, index)}
                                                            >
                                                                <option value="">Select a Model...</option>
                                                                {
                                                                    Object.entries(currentModelsByBrandId).map(([key, value]) =>
                                                                        <option value={key} key={key}>{value}</option>
                                                                    )
                                                                }
                                                            </Form.Select>
                                                        </InputGroup>
                                                        <InputGroup className="my-1">
                                                            <InputGroup.Text>Image</InputGroup.Text>
                                                            <Form.Control
                                                                type="file" name="image"
                                                                defaultValue={item.image ? item.image.value : null}
                                                                onChange={event => inputChange(event, index)}
                                                            />
                                                            <Button variant="warning" type="button"
                                                                    onClick={() => displayCurrentImage(item.image)}>
                                                                See IMG
                                                            </Button>
                                                        </InputGroup>
                                                        <InputGroup className="my-1">
                                                            <InputGroup.Text>Power</InputGroup.Text>
                                                            <Form.Control
                                                                type="text" name="power" placeholder="Power"
                                                                defaultValue={item.power}
                                                                onChange={event => inputChange(event, index)}
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="my-1">
                                                            <InputGroup.Text>Engine</InputGroup.Text>
                                                            <Form.Control
                                                                type="text" name="engineSize" placeholder="Engine Size"
                                                                defaultValue={item.engineSize}
                                                                onChange={event => inputChange(event, index)}
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="my-1">
                                                            <InputGroup.Text>Gearbox</InputGroup.Text>
                                                            <Form.Select
                                                                name="gearbox"
                                                                defaultValue={item.gearbox}
                                                                onChange={event => inputChange(event, index)}
                                                            >
                                                                <option value="">Select a Gearbox...</option>
                                                                <option value="manual">Manual</option>
                                                                <option value="automatic">Automatic</option>
                                                            </Form.Select>
                                                        </InputGroup>
                                                        <InputGroup className="my-1">
                                                            <InputGroup.Text>Body</InputGroup.Text>
                                                            <Form.Select
                                                                name="bodyType"
                                                                defaultValue={item.bodyType}
                                                                onChange={event => inputChange(event, index)}
                                                            >
                                                                <option value="">Select a Body Type...</option>
                                                                <option value="Sedan">Sedan</option>
                                                                <option value="Hatchback">Hatchback</option>
                                                                <option value="SUV">SUV</option>
                                                                <option value="Coupe">Coupe</option>
                                                                <option value="Station Wagon">Station Wagon</option>
                                                                <option value="Minivan/Van">Minivan/Van</option>
                                                                <option value="Truck">Truck</option>
                                                                <option value="Convertible">Convertible</option>
                                                            </Form.Select>
                                                        </InputGroup>
                                                        <InputGroup className="my-1">
                                                            <InputGroup.Text>Fuel</InputGroup.Text>
                                                            <Form.Select
                                                                name="fuelType"
                                                                defaultValue={item.fuelType}
                                                                onChange={event => inputChange(event, index)}
                                                            >
                                                                <option value="">Select a Fuel Type...</option>
                                                                <option value="Gas">Gas</option>
                                                                <option value="Diesel">Diesel</option>
                                                                <option value="Hybrid">Hybrid</option>
                                                            </Form.Select>
                                                        </InputGroup>
                                                    </div>
                                                    <div className="mt-3 input-groups-2">
                                                        <h3>Vehicle Info</h3>
                                                        <InputGroup className="my-1">
                                                            <InputGroup.Text>Car Count</InputGroup.Text>
                                                            <Form.Control
                                                                type="number" name="carCount" placeholder="Available Car Count..."
                                                                defaultValue={item.carCount}
                                                                onChange={event => inputChange(event, index)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })
                                }
                            </Accordion>
                        :
                            null
                    }

                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="m-0 p-0">Add a New Car</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={handleAddNewSubmit}>
                                <div className="mb-3 input-groups-1">
                                    <h3>Vehicle Properties</h3>
                                    <InputGroup className="my-1">
                                        <InputGroup.Text>Brand</InputGroup.Text>
                                        <Form.Select
                                            name="brandId"
                                            onChange={handleBrandChange}>
                                            <option value="">Select a Brand...</option>
                                            {
                                                brands && Object.entries(brands).map(([key, value])=>
                                                    <option value={key} key={key}>{value}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </InputGroup>
                                    <InputGroup className="my-1">
                                        <InputGroup.Text>Model</InputGroup.Text>
                                        <Form.Select name="modelId">
                                            <option value="">Select a Model...</option>
                                            {
                                                modelsByBrandId && Object.entries(modelsByBrandId).map(([key, value])=>
                                                    <option value={key} key={key}>{value}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </InputGroup>
                                    <InputGroup className="my-1">
                                        <InputGroup.Text>Image</InputGroup.Text>
                                        <Form.Control type="file" name="image" />
                                    </InputGroup>
                                    <InputGroup className="my-1">
                                        <InputGroup.Text>Power</InputGroup.Text>
                                        <Form.Control type="text" name="power" placeholder="Power" />
                                    </InputGroup>
                                    <InputGroup className="my-1">
                                        <InputGroup.Text>Engine Size</InputGroup.Text>
                                        <Form.Control type="text" name="engineSize" placeholder="Engine Size" />
                                    </InputGroup>
                                    <InputGroup className="my-1">
                                        <InputGroup.Text>Gearbox</InputGroup.Text>
                                        <Form.Select name="gearbox">
                                            <option value="">Select a Gearbox...</option>
                                            <option value="manual">Manual</option>
                                            <option value="automatic">Automatic</option>
                                        </Form.Select>
                                    </InputGroup>
                                    <InputGroup className="my-1">
                                        <InputGroup.Text>Body</InputGroup.Text>
                                        <Form.Select name="bodyType">
                                            <option value="">Select a Body Type...</option>
                                            <option value="Sedan">Sedan</option>
                                            <option value="Hatchback">Hatchback</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Coupe">Coupe</option>
                                            <option value="Station Wagon">Station Wagon</option>
                                            <option value="Minivan/Van">Minivan/Van</option>
                                            <option value="Truck">Truck</option>
                                            <option value="Convertible">Convertible</option>
                                        </Form.Select>
                                    </InputGroup>
                                    <InputGroup className="my-1">
                                        <InputGroup.Text>Fuel</InputGroup.Text>
                                        <Form.Select name="fuelType">
                                            <option value="">Select a Fuel Type...</option>
                                            <option value="Gas">Gas</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Hybrid">Hybrid</option>
                                        </Form.Select>
                                    </InputGroup>
                                </div>
                                <div className="mt-3 input-groups-2">
                                    <h3>Vehicle Info</h3>
                                    <InputGroup className="my-1">
                                        <InputGroup.Text>Car Count</InputGroup.Text>
                                        <Form.Control type="number" name="carCount" placeholder="Available Car Count..." />
                                    </InputGroup>
                                </div>
                                <div className="mt-3 input-groups-3">
                                    <Button variant="primary" type="submit" className="w-100">
                                        Add New
                                    </Button>
                                </div>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <Button variant="success" type="button" onClick={handleSubmit}>
                        Save All Changes
                    </Button>

                </div>
        </div>
    );
};

export default VehicleAdd;