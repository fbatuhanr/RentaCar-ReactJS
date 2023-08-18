import React from 'react';


const CarSearch = () => {
    return (
            <div id='CarSearch'>
                <div className="search_section">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <h1 className="search_taital">Search Your Best Cars</h1>
                        <p className="search_text">Using 'Content here, content here', making it look like readable</p>
                        <div className="container">
                            <div className="select_box_section">
                            <div className="select_box_main">
                                <div className="row">
                                <div className="col-md-3 select-outline">
                                    <select className="mdb-select md-form md-outline colorful-select dropdown-primary">
                                    <option value disabled selected>Any Brand</option>
                                    <option value={1}>Option 1</option>
                                    <option value={2}>Option 2</option>
                                    <option value={3}>Option 3</option>
                                    </select>
                                </div>
                                <div className="col-md-3 select-outline">
                                    <select className="mdb-select md-form md-outline colorful-select dropdown-primary">
                                    <option value disabled selected>Any type</option>
                                    <option value={1}>Option 1</option>
                                    <option value={2}>Option 2</option>
                                    <option value={3}>Option 3</option>
                                    </select>
                                </div>
                                <div className="col-md-3 select-outline">
                                    <select className="mdb-select md-form md-outline colorful-select dropdown-primary">
                                    <option value disabled selected>Price</option>
                                    <option value={1}>Option 1</option>
                                    <option value={2}>Option 2</option>
                                    <option value={3}>Option 3</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <div className="search_btn"><a href="#">Search Now</a></div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            
            </div>
    );
};
export default CarSearch;