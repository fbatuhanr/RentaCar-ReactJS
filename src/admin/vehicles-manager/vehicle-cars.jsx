import React, { useEffect, useState } from 'react';
import { Accordion, Button, Form, InputGroup } from "react-bootstrap";

import Swal from "sweetalert2";

import { loadingContent } from "../../components/general/general-components";
import newRequet from '../../utils/request';
import axios from 'axios';
import { useSelector } from 'react-redux';

const VehicleCars = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [vehicles, setVehicle] = useState()
    const [showrooms, setShowrooms] = useState([])
    const accessToken = localStorage.getItem("accessToken")
    const { roleName } = useSelector(state => state.UserSlice)

    const getVehicles = async () => {
        await newRequet.get('/vehicles/')
            .then(data => {
                console.log(data.data)
                setVehicle(data.data)
            })
            .catch(err => {
                console.log("ERR when get vehicles: ", err)
            })
    }

    const getShowrooms = async () => {
        await newRequet.get('/showrooms/')
            .then(data => {
                setShowrooms(data.data)
            })
            .catch(err => {
                console.log("ERR when get showrooms: ", err)
            })
    }

    useEffect(() => {
        getVehicles()
        getShowrooms()
    }, []);
    const handleAddNewVehicle = async (event) => {
        event.preventDefault();
        if (roleName === 'ADMIN') {
            setIsLoading(true);

            let brand = event.target.elements.brand.value
            let description = event.target.elements.description.value
            let image = event.target.elements.image.files[0]
            let name = event.target.elements.name.value
            let price = parseInt(event.target.elements.price.value)
            let showroomId = event.target.elements.showroomId.value
            let specifications = event.target.elements.specifications.value

            const formData = new FormData()

            formData.append("image", image)

            await axios.post(
                'http://localhost:8080/Showroom/cloudinary/upload',
                formData)
                .then(data => {
                    console.log(data.data.url)
                    newRequet.post('/vehicles/create/', {
                        name, price, specifications, description, brand, status: "available", showroomId, image: data.data.url
                    }, {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    }).then(data => {
                        console.log(data.data)
                        setIsLoading(false)
                        getVehicles()
                        event.target.reset();
                    })
                        .catch(err => {
                            console.log("ERR when add vehicle: ", err)
                        })
                })
                .catch(err => {
                    console.log("ERR when upload image: ", err)
                })
        } else {
            alert("You dont have permission to handle this action!")
        }
    }
    const handleDeleteVehicle = async (id) => {
        if (roleName === 'ADMIN') {
            await newRequet.delete(`/vehicles/delete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
                .then(data => {
                    console.log(data.data)
                    getVehicles()
                }).catch(err => {
                    console.log("ERR when delete vehicle: ", err)
                })
        } else {
            alert("You dont have permission to handle this action!")
        }
    }

    const handleDisplayImage = imgUrl => {
        console.log(imgUrl)

        Swal.fire({
            imageUrl: imgUrl,
            imageWidth: "100%",
            imageAlt: "Car Image"
        });
    }

    const handleUpdateVehicle = async (event, item) => {
        event.preventDefault()

        if (roleName === 'ADMIN') {
            const form = event.target.elements

            const updatedVehicle = {
                brand: form.brand.value,
                description: form.description.value,
                imageFile: form.image.files[0],
                name: form.name.value,
                price: form.price.value,
                specifications: form.specifications.value,
            };

            let updateValue = {}

            if (item.brand !== updatedVehicle.brand.trim()) {
                updateValue.brand = updatedVehicle.brand
            }
            if (item.description !== updatedVehicle.description.trim()) {
                updateValue.description = updatedVehicle.description
            }
            if (item.name !== updatedVehicle.name.trim()) {
                updateValue.name = updatedVehicle.name
            }
            if (item.price !== parseInt(updatedVehicle.price.trim())) {
                updateValue.price = updatedVehicle.price
            }
            if (item.specifications !== updatedVehicle.specifications.trim()) {
                updateValue.specifications = updatedVehicle.specifications
            }

            if (updatedVehicle.imageFile) {
                const formData = new FormData()
                formData.append("image", updatedVehicle.imageFile)

                await axios.post(
                    'http://localhost:8080/Showroom/cloudinary/upload',
                    formData)
                    .then(data => {
                        console.log(data.data.url)
                        newRequet.patch('/vehicles/update/', {
                            vehicleId: item.id.toString(), ...updateValue, image: data.data.url
                        }, {
                            headers: {
                                "Authorization": `Bearer ${accessToken}`
                            }
                        }).then(data => {
                            console.log(data.data)
                            getVehicles()
                            event.target.reset();
                        })
                            .catch(err => {
                                console.log("ERR when update vehicle: ", err)
                            })
                    })
                    .catch(err => {
                        console.log("ERR when update image: ", err)
                    })

            } else {
                if (Object.keys(updateValue).length > 0) {
                    newRequet.patch('/vehicles/update/', {
                        vehicleId: item.id.toString(), ...updateValue
                    }, {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    }).then(data => {
                        console.log(data.data)
                        getVehicles()
                        event.target.reset()
                    })
                        .catch(err => {
                            console.log("ERR when update vehicle: ", err)
                        })
                }
            }

        } else {
            alert("You dont have permission to handle this action!")
        }

    }

    return (
        <div>
            <h1>Cars Management</h1>
            <div className="d-grid gap-2 p-3">
                {
                    vehicles && !isLoading
                        ?
                        <>
                            <Accordion>
                                {
                                    Object.values(vehicles).map((item, index) => {
                                        return (
                                            <Accordion.Item key={index} eventkey={index}>
                                                <Accordion.Header className="m-0 p-0">{item.name} / {item.brand}</Accordion.Header>
                                                <Accordion.Body>
                                                    <Form onSubmit={(event) => { handleUpdateVehicle(event, item) }}>
                                                        <div className="mb-3 input-groups-1">
                                                            <h3>Vehicle Properties</h3>
                                                            <InputGroup className="my-1">
                                                                <InputGroup.Text>Brand</InputGroup.Text>
                                                                <Form.Control
                                                                    type="text" name="brand" placeholder="Brand"
                                                                    defaultValue={item.brand}
                                                                />
                                                            </InputGroup>
                                                            <InputGroup className="my-1">
                                                                <InputGroup.Text>description</InputGroup.Text>
                                                                <Form.Control
                                                                    type="text" name="description" placeholder="Description"
                                                                    defaultValue={item.description}
                                                                />
                                                            </InputGroup>
                                                            <Form.Control
                                                                name="imageUrl"
                                                                hidden={true}
                                                                defaultValue={item.image ? item.image : null}
                                                            />
                                                            <InputGroup className="my-1">
                                                                <InputGroup.Text>Image</InputGroup.Text>
                                                                <Form.Control
                                                                    type="file" name="image"
                                                                    defaultValue={item.image !== null ? item.image.value : null}
                                                                />
                                                                <Button variant="warning" type="button"
                                                                    onClick={() => handleDisplayImage(item.image)}>
                                                                    See Exist IMG
                                                                </Button>
                                                            </InputGroup>
                                                            <InputGroup className="my-1">
                                                                <InputGroup.Text>Name</InputGroup.Text>
                                                                <Form.Control
                                                                    type="text" name="name" placeholder="Name"
                                                                    defaultValue={item.name}
                                                                />
                                                            </InputGroup>
                                                            <InputGroup className="my-1">
                                                                <InputGroup.Text>Price</InputGroup.Text>
                                                                <Form.Control
                                                                    type="text" name="price" placeholder="Price"
                                                                    defaultValue={item.price}
                                                                />
                                                            </InputGroup>
                                                            <InputGroup className="my-1">
                                                                <InputGroup.Text>Specifications</InputGroup.Text>
                                                                <Form.Control
                                                                    type="text" name="specifications" placeholder="Specifications"
                                                                    defaultValue={item.specifications}
                                                                />
                                                            </InputGroup>
                                                            <InputGroup className="my-1">
                                                                <InputGroup.Text>Showroom: {item.showroom.name}</InputGroup.Text>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="mt-3 input-groups-2">
                                                            <Button variant="info" type="submit" className="w-100">
                                                                Update Car
                                                            </Button>
                                                        </div>
                                                        <div className="mt-3 input-groups-2">
                                                            <Button variant="danger" type="button" className="w-100" onClick={() => handleDeleteVehicle(item.id)}>
                                                                Remove Car
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })
                                }
                            </Accordion>

                            <Accordion>
                                <Accordion.Item>
                                    <Accordion.Header className="m-0 p-0">Add a New Car</Accordion.Header>
                                    <Accordion.Body>
                                        <Form onSubmit={handleAddNewVehicle}>
                                            <div className="mb-3 input-groups-1">
                                                <h3>Vehicle Properties</h3>
                                                <InputGroup className="my-1">
                                                    <InputGroup.Text>Brand</InputGroup.Text>
                                                    <Form.Control type="text" name="brand" placeholder="Brand" required={true} />
                                                </InputGroup>
                                                <InputGroup className="my-1">
                                                    <InputGroup.Text>Image</InputGroup.Text>
                                                    <Form.Control type="file" name="image" required={true} />
                                                </InputGroup>
                                                <InputGroup className="my-1">
                                                    <InputGroup.Text>description</InputGroup.Text>
                                                    <Form.Control type="text" name="description" placeholder="description" required={true} />
                                                </InputGroup>
                                                <InputGroup className="my-1">
                                                    <InputGroup.Text>Name</InputGroup.Text>
                                                    <Form.Control type="text" name="name" placeholder="Name" required={true} />
                                                </InputGroup>
                                                <InputGroup className="my-1">
                                                    <InputGroup.Text>Price</InputGroup.Text>
                                                    <Form.Control type="number" name="price" placeholder="Price" required={true} />
                                                </InputGroup>
                                                <InputGroup className="my-1">
                                                    <InputGroup.Text>Specifications</InputGroup.Text>
                                                    <Form.Control type="text" name="specifications" placeholder="Specifications" required={true} />
                                                </InputGroup>

                                                <InputGroup className="my-1">
                                                    <InputGroup.Text>Showroom</InputGroup.Text>
                                                    <Form.Select name="showroomId" required={true}>
                                                        {
                                                            showrooms.map(showroom => {
                                                                return <option key={showroom.id} value={showroom.id}>{showroom.name}</option>
                                                            })
                                                        }
                                                    </Form.Select>
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
                        </>
                        :
                        loadingContent
                }
            </div>
        </div>
    );
};

export default VehicleCars;