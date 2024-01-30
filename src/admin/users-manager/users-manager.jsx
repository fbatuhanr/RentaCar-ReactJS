import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../config/firebase";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";

import {fetchUsers} from "../../hooks/useFetchData";
import {loadingContent} from "../../components/general/general-components";

import {UserRoles, isAdmin} from "../../config/general";

const UsersManager = () => {

    const user = useSelector(({UserSlice}) => UserSlice.user);

    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState(null);

    const refs = useRef([]);

    useEffect(() => {

        fetchUsers().then(response => setUsers(response));

    }, [])


    const handleUpdateButton = async key => {

        let role = refs.current[key].value;

        setIsLoading(true);

        const userRef = doc(db, "users", users[key].id);

        updateDoc(userRef, {role})
            .then(() => {
                // setIsLoading(false);
                Swal.fire({
                    title: "Good job!",
                    text: "All changes saved!",
                    icon: "success",
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed)
                        window.location.reload()
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
            <h1>Users Management</h1>
                <div className="d-grid gap-2 p-3">
                    {
                        users && !isLoading
                            ?
                            <>
                                <h2>Edit Users</h2>
                                {
                                    Object.entries(users).map(([key, value]) => {

                                        let isAnAdmin = isAdmin(value.role);
                                        let isCurrentUser = value.email == user.email;
                                        return (
                                            <div key={key} className="my-2">
                                                <InputGroup>
                                                    <Form.Control
                                                        type="text"
                                                        name="userEmail"
                                                        value={value.email}
                                                        placeholder="User email..."
                                                        disabled={true}
                                                        /*
                                                        ref={event => {
                                                            refs.current[key] = refs.current[key] || [];
                                                            refs.current[key][0] = event;
                                                        }}
                                                        */
                                                    />
                                                    <Form.Select
                                                        name="userRole"
                                                        defaultValue={value.role}
                                                        disabled={isAnAdmin && isCurrentUser}
                                                        ref={event => refs.current[key] = event}
                                                    >
                                                        <option value="">Select a role...</option>
                                                        {
                                                            Object.keys(UserRoles).map(key => (
                                                                <option key={key} value={key}>
                                                                    {UserRoles[key]}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Select>

                                                    <Button variant="success" type="button"
                                                            onClick={() => handleUpdateButton(key)}
                                                            disabled={isAnAdmin && isCurrentUser}>
                                                        Update
                                                    </Button>

                                                </InputGroup>
                                            </div>
                                        )
                                        }
                                    )
                                }
                            </>
                            :
                            loadingContent
                    }
                </div>
        </div>
    );
};

export default UsersManager;