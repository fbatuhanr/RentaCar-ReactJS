import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase";
import Swal from "sweetalert2";

import {fetchLocations} from "../../hooks/useFetchData";
import {loadingContent} from "../../components/general/general-components";

const LocationsManager = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [locations, setLocations] = useState(null);
    const [newLocation, setNewLocation] = useState("");

    useEffect(() => {

        fetchLocations().then(response => setLocations(response));

    }, [])

    const handleAddNewButton = () => {

        if(!newLocation.trim().length) return;

        let newIndex = Object.values(locations).length;

        setLocations((prevState) => ({
            ...prevState,
            [newIndex]: newLocation,
        }));

        setNewLocation("");
    }

    const handleRemoveButton = (key) => {

        setLocations(current => {

            const copy = {...current};
            delete copy[key];

            return copy;
        });

        setLocations(current => {

            const copy = {...current};
            Object.keys(copy).map((id, index) => {

                copy[index] = copy[id];
                if(index != id) delete copy[id];
            })

            return copy;
        });

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
            <h1>Locations Management</h1>
            <Form onSubmit={handleSaveChangesSubmit}>
                <div className="d-grid gap-2 p-3">
                    {
                        locations && !isLoading
                            ?
                            <>
                                <h2>Edit Cities</h2>
                                {
                                    Object.entries(locations).map(([key, value]) =>

                                        <div key={key} className="my-2">
                                            <InputGroup>
                                                <Form.Control
                                                    type="text"
                                                    name={key}
                                                    value={value || ''}
                                                    onChange={handleInputChange}
                                                    placeholder="Location..."
                                                />
                                                <Button variant="danger" type="button" onClick={() => handleRemoveButton(key)}>
                                                    Remove
                                                </Button>
                                            </InputGroup>
                                        </div>
                                    )
                                }
                                <div className="my-2">
                                    <h2>Add New City</h2>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            value={newLocation}
                                            onChange={e => setNewLocation(e.target.value)}
                                            placeholder="Location..."
                                        />
                                        <Button variant="primary" type="button" onClick={handleAddNewButton}>
                                            Add
                                        </Button>
                                    </InputGroup>
                                </div>

                                <Button variant="success" type="submit">
                                    Save All Changes
                                </Button>
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