import React, {useEffect, useState, useRef} from 'react';
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase";
import {Button, Form, InputGroup, Spinner} from "react-bootstrap";
import Swal from "sweetalert2";

import {fetchBrands, fetchModels} from "../../hooks/useFetchData";
import {loadingContent} from "../../components/general/general-components";
import {current} from "@reduxjs/toolkit";

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

        if(newModelBrandId === "" || !newModel.trim().length) return;

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

        if(!refs.current[key].value.trim().length) return;

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

            if(Object.values(copy[parentKey].models).length > 1)
                delete copy[parentKey].models[childKey];
            else
                delete copy[parentKey];

            return copy;
        });

        setModels(current => {

            let copy = {...current};

            if(!copy[parentKey])
                return copy;

            const newModels = {models:{}};
            Object.keys(copy[parentKey].models).map((id, index) => {
                newModels.models[index] = copy[parentKey].models[id];
            });
            const newObj = Object.assign({}, copy[parentKey], newModels);

            const result = {
                ...copy,
                [parentKey]: newObj
            }

            return result;
        });
    }

    const handleSaveChangesSubmit = async e => {
        e.preventDefault();

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
            <h1>Vehicle Models Management</h1>
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
                                        onChange={e => setNewModelBrandId(e.target.value ? parseInt(e.target.value) || 0 : "")}
                                    >
                                        <option value="">Select a new brand...</option>
                                        {
                                            // this structure will filter unique brands that not used before
                                            Object.entries(brands)
                                                .filter(([k, brand]) => !Object.values(models).some(model => model.brandId === Object.values(brands).indexOf(brand)))
                                                .map(([key, value]) =>
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
