import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {loadingContent} from "../admin-components";
import {collection, doc, updateDoc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";

const UserRoles = { admin: "Admin", user: "User" };
const UsersManager = () => {

    const user = useSelector(({UserSlice}) => UserSlice.user);

    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState(null);

    const refs = useRef([]);

    const compareByName = (a, b) => {
        const isRoleSame = a.role === b.role;
        return isRoleSame ? a.email.localeCompare(b.email) : a.role.localeCompare(b.role);
    }

    useEffect(() => {

        const fetchUsers = async () => {

            const querySnapshot = await getDocs(collection(db, "users"));

            if (querySnapshot.docs) {

                const resultData = querySnapshot.docs.map(i => Object.assign({id: i.id}, i.data()));
                resultData.sort(compareByName);

                console.log(resultData)
                return resultData;
            } else {
                console.log("No such document (users)!");
                return {};
            }
        }

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
            <h1>Users</h1>
            <Form onSubmit={null}>
                <div className="d-grid gap-2 p-3">
                    {
                        users && !isLoading
                            ?
                            <>
                                <h2>Edit Users</h2>
                                {
                                    Object.entries(users).map(([key, value]) => {

                                        let isAdmin = value.role == Object.keys(UserRoles).find(key => UserRoles[key] == UserRoles.admin);
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
                                                        disabled={isAdmin && isCurrentUser}
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
                                                            disabled={isAdmin && isCurrentUser}>
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
            </Form>
        </div>
    );
};

export default UsersManager;