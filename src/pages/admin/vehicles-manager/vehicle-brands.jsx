import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, Spinner} from "react-bootstrap";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../../config/firebase";

const VehicleBrands = () => {

    const [brands, setBrands] = useState(null);
    const [newBrand, setNewBrand] = useState("");


    useEffect(() => {
        const fetchBrands = async () => {

            const docRef = doc(db, "vehicle", "brands");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document!");
                return {};
            }
        }

        fetchBrands().then(response => setBrands(response));

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

    const handleSubmit = async e => {
        e.preventDefault();

        await setDoc(doc(db, "vehicle", "brands"), brands);
    }

    return (
        <div>
            <h1>Vehicle Brands</h1>
            <Form onSubmit={handleSubmit}>
                <div className="d-grid gap-2 p-2 border border-1 rounded">
                    {
                        brands
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

export default VehicleBrands;