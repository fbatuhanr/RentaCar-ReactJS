import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const AdminGuard = ({children}) => {

    const user = useSelector(({UserSlice}) => UserSlice);

    if(user.roleName !== "ADMIN" && user.roleName !== "STAFF"){
        return <Navigate to="/" />
    }

    return <div>{children}</div>;
};

export default AdminGuard;