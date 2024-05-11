import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { BsFillCarFrontFill } from 'react-icons/bs';

const Payment = ({ location }) => {
    const fakeCarData = {
        brand: "Toyota",
        name: "Corolla",
        cusname: "Nguyen Van A",
        id: "id1233",
        image: "https://cms-i.autodaily.vn/du-lieu/2023/09/04/2024-toyota-fortuner-rendered-1068x534.jpg",
    };
    const fakePaymentData = {
        totalAmount: "$150",
        paymentMethod: "Credit Card",
        expirationTime: 3600,
    };

    const handlePayment = (event) => {
        event.preventDefault();

        const cardNumber = event.target.elements.cardNumber.value;
        const expiryDate = event.target.elements.expiryDate.value;
        const cvv = event.target.elements.cvv.value;

        console.log(`Paying with credit card number ${cardNumber}, expiry date ${expiryDate}, and CVV ${cvv}`);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <Accordion.Header className="m-0 p-0">
                        <h3 className="m-0 p-0">
                            <BsFillCarFrontFill size="2em" className="me-2" style={{ marginTop: "-10px" }} />
                            <span className="fs-5 fw-bold">Brand & Name: {fakeCarData.brand} / {fakeCarData.name}</span>
                        </h3>
                    </Accordion.Header>
                    <div className="card" style={{ border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
                        <img src={fakeCarData.image} className="card-img-top" alt={fakeCarData.name} />

                        <div style={{ marginTop: "20px" }}>
                            <strong style={{ fontSize: "18px", marginBottom: "10px" }}>Customer Name</strong>
                            <span style={{ display: "block", fontSize: "16px", border: "1px solid #ccc", borderRadius: "10px", padding: "5px", marginBottom: "10px" }}>{fakeCarData.cusname}</span>

                            <strong style={{ fontSize: "18px", marginBottom: "10px" }}>ID</strong>
                            <span style={{ display: "block", fontSize: "16px", border: "1px solid #ccc", borderRadius: "10px", padding: "5px", marginBottom: "10px" }}>{fakeCarData.id}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Payment Information</h5>
                            <p>Total Amount: {fakePaymentData.totalAmount}</p>
                            <p>Payment Method: {fakePaymentData.paymentMethod}</p>

                            <form onSubmit={handlePayment}>
                                <div className="mb-3">
                                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                    <input type="text" className="form-control" id="cardNumber" placeholder="Enter card number" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                    <input type="text" className="form-control" id="expiryDate" placeholder="MM/YYYY" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control" id="cvv" placeholder="Enter CVV" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Pay with Credit Card</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Payment;