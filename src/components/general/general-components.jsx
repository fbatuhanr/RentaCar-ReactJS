import {Spinner} from "react-bootstrap";
import React from "react";

const loadingContent =
    <div className="text-center p-4">
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>

export {loadingContent}