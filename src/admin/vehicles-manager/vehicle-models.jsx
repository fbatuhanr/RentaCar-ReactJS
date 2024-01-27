import React, {useEffect, useState, useRef} from 'react';
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase";
import {Button, Form, InputGroup, Spinner} from "react-bootstrap";
import Swal from "sweetalert2";

import {loadingContent} from "../admin-components";
import {fetchBrands, fetchModels} from "./vehicle-components";

const VehicleModels = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [brands, setBrands] = useState(null);
    const [models, setModels] = useState(null);

    const [newModelBrandId, setNewModelBrandId] = useState("");
    const [newModel, setNewModel] = useState("");

    const refs = useRef([]);

    useEffect(() => {

        fetchBrands().then(response => setBrands(response));
        fetchModels().then(response => setModels(response));

    }, []);

    const handleInputChange = (event, key) => {

        const { name, value } = event.target;
        setModels(current => {

            return {
                ...current,
                [key]: {
                    ...current[key],
                    models: {
                        ...current[key].models,
                        [name]: value
                    },
                },
            };
        });
    };

    const handleCreateNewButton = () => {

        let newModelIndex = models ? Object.values(models).length : 0;
        setModels(current => {

            return {
                ...current,
                [newModelIndex]: {
                    brandId: newModelBrandId,
                    models: {
                        0: newModel
                    },
                },
            };
        });

        setNewModelBrandId("");
        setNewModel("");
    }

    const handleAddNewButton = (key) => {

        let newModelIndex = Object.values(models[key].models).length;
        setModels(current => {

            return {
                ...current,
                [key]: {
                    ...current[key],
                    models: {
                        ...current[key].models,
                        [newModelIndex]: refs.current[key].value
                    },
                },
            };
        });
    }

    const handleRemoveButton = (parentKey, childKey) => {

        setModels(current => {

            const copy = {...current};
            delete copy[parentKey].models[childKey];

            return copy;
        });


        setModels(current => {

            let copy = {...current};

            Object.keys(copy[parentKey].models).map((id, index) => {

                copy[parentKey].models[index] = copy[parentKey].models[id];
                if(index != id) delete copy[parentKey].models[id];
            });

            return copy;
        });
    }

    const handleSaveChangesSubmit = async e => {
        e.preventDefault();

        console.log(models);
        setIsLoading(true);

        setDoc(doc(db, "vehicle", "models"), models)
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
            <h1>Vehicle Models</h1>
            <Form onSubmit={handleSaveChangesSubmit}>
                <div className="d-grid gap-2 p-3">
                    {
                        models && brands && !isLoading
                        ?
                            <>
                            {
                            Object.entries(models).map(([parentKey, value]) =>
                                <div className="my-2">
                                    <h2 className="mb-1">{brands[value.brandId]}</h2>
                                    {
                                        Object.entries(value.models).map(([key, value]) =>
                                            <InputGroup className="my-1">
                                                <Form.Control
                                                    type="text"
                                                    name={key}
                                                    value={value}
                                                    onChange={event => handleInputChange(event, parentKey)}
                                                    placeholder="Model..."
                                                />
                                                <Button variant="danger" type="button" onClick={() => handleRemoveButton(parentKey, key)}>
                                                    Remove
                                                </Button>
                                            </InputGroup>
                                        )
                                    }
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Add Model..."
                                            defaultValue={null}
                                            ref={(e) => refs.current[parentKey] = e}
                                        />
                                        <Button variant="primary" type="button" onClick={() => handleAddNewButton(parentKey)}>
                                            Add New
                                        </Button>
                                    </InputGroup>
                                </div>
                            )
                            }

                            <div className="my-2">
                                <h2>Create New</h2>
                                <InputGroup>
                                    <Form.Select
                                        defaultValue=""
                                        value={newModelBrandId}
                                        onChange={e => setNewModelBrandId(e.target.value)}
                                    >
                                        <option value="">Select a brand...</option>
                                        {
                                            brands && Object.entries(brands).map(([key, value])=>
                                                <option value={key}>{value}</option>
                                            )
                                        }
                                    </Form.Select>
                                    <Form.Control
                                        type="text"
                                        value={newModel}
                                        onChange={e => setNewModel(e.target.value)}
                                        placeholder="New Model Name..."
                                    />

                                    <Button variant="primary" type="button" onClick={handleCreateNewButton}>
                                        Create New
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

export default VehicleModels;