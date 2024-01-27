import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, Spinner} from "react-bootstrap";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase";

import {loadingContent} from "../admin-components";
import {fetchBrands} from "./vehicle-components";
import Swal from "sweetalert2";

const VehicleBrands = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [brands, setBrands] = useState(null);
    const [newBrand, setNewBrand] = useState("");

    useEffect(() => {

        fetchBrands().then(response => {
            setBrands(response);
            setIsLoading(false);
        });

    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBrands((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddNewButton = () => {

        let newBrandIndex = Object.values(brands).length;
        setBrands((prevState) => ({
            ...prevState,
            [newBrandIndex]: newBrand,
        }));

        setNewBrand("");
    }
    const handleRemoveButton = (key) => {

        setBrands(current => {

            const copy = {...current};
            delete copy[key];

            return copy;
        });

        setBrands(current => {

            let copy = {...current};

            Object.keys(copy).map((id, index) => {

                copy[index] = copy[id];
                if(index != id) delete copy[id];
            })

            return copy;
        });
    }

    const handleSaveChangesSubmit = async e => {
        e.preventDefault();

        console.log(brands);
        setIsLoading(true);

        setDoc(doc(db, "vehicle", "brands"), brands)
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
            <h1>Vehicle Brands</h1>
            <Form onSubmit={handleSaveChangesSubmit}>
                <div className="d-grid gap-2 p-3">
                    {
                        brands && !isLoading
                        ?
                            <>
                                {
                                    Object.entries(brands).map(([key, value]) =>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                name={key}
                                                value={value}
                                                onChange={handleInputChange}
                                                placeholder="Brand..."
                                            />
                                            <InputGroup.Text className="p-0">
                                                <Button variant="danger" type="button" onClick={() => handleRemoveButton(key)}>
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
                                        placeholder="New Brand Name..."
                                    />
                                    <InputGroup.Text className="p-0">
                                        <Button variant="primary" type="button" onClick={handleAddNewButton}>
                                            Add New
                                        </Button>
                                    </InputGroup.Text>
                                </InputGroup>

                                <Button variant="success" type="submit">
                                    Save Changes
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

export default VehicleBrands;