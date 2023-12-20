import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const GuestGuard = ({children}) => {

    const user = useSelector(({UserSlice}) => UserSlice.user);

    if(user.email){
        return <Navigate to="/" />
    }

    return <div>{children}</div>;
};

export default GuestGuard;