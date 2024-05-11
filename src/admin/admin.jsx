import React from 'react';
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <div>
            <h1>Admin Management</h1>
            <div className="p-4">
                <p>Welcome to the Car World Management!</p>
                <h4><Link to="/">Click here for back to website!</Link></h4>
            </div>
        </div>
    );
};

export default Admin;