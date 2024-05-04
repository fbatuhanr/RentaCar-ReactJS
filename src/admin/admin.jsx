import React from 'react';
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <div>
            <h1>Admin Management</h1>
            <div className="p-4" style={{ color: 'green', fontSize: '20px' }}>
                <p>Welcome to the Car World Management!!!</p>
            </div>
            <h3><Link to="/">Click here for back to website!</Link></h3>
        </div>
    );
};

export default Admin;