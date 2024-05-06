import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from "react-bootstrap";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Swal from "sweetalert2";

import { fetchLocations } from "../../hooks/useFetchData";
import { loadingContent } from "../../components/general/general-components";
import { useSelector } from 'react-redux';
import newRequet from '../../utils/request';

const LocationsManager = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [locations, setLocations] = useState(null);
    const [name, setName] = useState("");
    const [location, setLocation] = useState('')

    const [showrooms, setShowrooms] = useState([])

    const accessToken = localStorage.getItem("accessToken")
    const { roleName } = useSelector(state => state.UserSlice)

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
        getShowrooms()

    }, [])

    const handleAddNewShowroom = async () => {
        if (roleName === 'ADMIN') {
            if (!name.trim().length) return;
            if (!location.trim().length) return;

            await newRequet.post('/showrooms/create/', { name, location },
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
                .then(data => {
                    getShowrooms()
                })
                .catch(err => {
                    console.log("ERR when create showroom: ", err)
                })
        } else {
            alert("You dont have permission to handle this action!")
        }

    }

    const handleRemoveButton = async (showroom) => {

        await newRequet.delete('/showrooms/')

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLocations((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChangesSubmit = async e => {
        e.preventDefault();

        console.log(locations);
        setIsLoading(true);

        setDoc(doc(db, "vehicle", "locations"), locations)
            .then(() => {
                setIsLoading(false);
                Swal.fire({
                    title: "Good job!",
                    text: "All changes saved!",
                    icon: "success"
                });
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
            });
    }

    return (
        <div>
            <h1>Showrooms Management</h1>
            <Form onSubmit={handleSaveChangesSubmit}>
                <div className="d-grid gap-2 p-3">
                    {
                        showrooms
                            ?
                            <>
                                <h2>Edit</h2>
                                {
                                    showrooms.map((showroom) =>

                                        <div style={{ marginBottom: '10px' }} key={showroom.id} className="my-2">
                                            <p style={{ marginBottom: '2px', marginTop: '0px' }}>ID: {showroom.id}</p>
                                            <p style={{ marginBottom: '2px', marginTop: '0px' }}>Name: {showroom.name}</p>
                                            <p style={{ marginBottom: '2px', marginTop: '0px' }}>Location: {showroom.location}</p>
                                        </div>
                                    )
                                }
                                <div className="my-2">
                                    <h2>Add New Showroom</h2>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            placeholder="Showroom name..."
                                        />
                                        <Form.Control
                                            type="text"
                                            value={location}
                                            onChange={e => setLocation(e.target.value)}
                                            placeholder="Showroom location..."
                                        />
                                        <Button variant="primary" type="button" onClick={handleAddNewShowroom}>
                                            Add
                                        </Button>
                                    </InputGroup>
                                </div>
                            </>
                            :
                            loadingContent
                    }
                </div>
            </Form>
        </div>
    );
};

export default LocationsManager;