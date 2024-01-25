import React, {useEffect, useState, useRef} from 'react';
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../../config/firebase";
import {Button, Form, InputGroup, Spinner} from "react-bootstrap";

const VehicleModels = () => {

    const [brands, setBrands] = useState(null);
    const [models, setModels] = useState(null);

    const [newModelBrandId, setNewModelBrandId] = useState("");
    const [newModel, setNewModel] = useState("");


    const refs = useRef([]);


    useEffect(() => {


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

    const handleSubmit = async e => {
        e.preventDefault();

        console.log(models);

        await setDoc(doc(db, "vehicle", "models"), models);
    }

    return (
        <div>
            <h1>Vehicle Models</h1>
            <Form onSubmit={handleSubmit}>
                <div className="d-grid gap-2 p-3 border border-1 rounded">
                    {
                        models && brands
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
                            <div className="text-center p-4">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                    }
                </div>
            </Form>
        </div>
    );
};

export default VehicleModels;