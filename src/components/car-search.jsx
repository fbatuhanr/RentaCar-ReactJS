import   {useState} from 'react';
import Form from 'react-bootstrap/Form';

import data from '../DATA/data.json'


const CarSearch = () => {
    
  const [models, setModels] = useState(null);

    const handleBrandChange = (event) => {
        setModels(event.target.value === "" ? null : data.find(x=>x.brand === event.target.value).model)
    }
    
    
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
                                <Form.Select size="lg" onChange={handleBrandChange}>
                                <option value="">Choose a Brand</option>
                                {
                                    data.map((car)=>{
                                        console.log(car);
                                        return <option>{car.brand}</option>
                                    })
                                }
                                </Form.Select>
                                </div>
                                <div className="col-md-3 select-outline">
                                <Form.Select size="lg" onChange={null}>
                                <option>Choose a Model</option>
                                
                                {
                                    models && models.map((model)=>{
                                        return <option>{model}</option>
                                    })
                                }
                                </Form.Select>
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