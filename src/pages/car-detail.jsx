import React, {useEffect, useState} from 'react';

import {useParams} from "react-router-dom";

import data from '../DATA/data.json';
import {getNextKeyDef} from "@testing-library/user-event/dist/keyboard/getNextKeyDef";

const CarDetail = () => {

    const {carBrand, carModel} = useParams();

    const [modelProperties, setModelProperties] = useState();

    useEffect(()=>{

        setModelProperties(data.find(item => item.brand === carBrand).model[carModel])

    },[]);

    return (
        <div className='main'>,
            {
                modelProperties ?
                    <div>
                        <p>{carBrand} - {carModel}</p>
                        <p>{modelProperties.power}</p>
                        <p>{modelProperties.engineSize}</p>
                        <p>{modelProperties.gearbox}</p>
                        <p>{modelProperties.bodyType}</p>
                        <p>{modelProperties.fuelType}</p>
                    </div>
                    : null
            }
        </div>
    );
};

export default CarDetail;