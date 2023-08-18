import React from 'react';


const Slider = () => {
    return (
        <div id='slider'>



    <div className="banner_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div id="banner_slider" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="banner_taital_main">
                      <h1 className="banner_taital">Car Rent <br /><span style={{color: '#fe5b29'}}>For You</span></h1>
                      <p className="banner_text">There are many variations of passages of Lorem Ipsum available, but the majority</p>
                      <div className="btn_main">
                        <div className="contact_bt"><a href="#">Read More</a></div>
                        <div className="contact_bt active"><a href="#">Contact Us</a></div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="banner_taital_main">
                      <h1 className="banner_taital">Car Rent <br /><span style={{color: '#fe5b29'}}>For You</span></h1>
                      <p className="banner_text">There are many variations of passages of Lorem Ipsum available, but the majority</p>
                      <div className="btn_main">
                        <div className="contact_bt"><a href="#">Read More</a></div>
                        <div className="contact_bt active"><a href="#">Contact Us</a></div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="banner_taital_main">
                      <h1 className="banner_taital">Car Rent <br /><span style={{color: '#fe5b29'}}>For You</span></h1>
                      <p className="banner_text">There are many variations of passages of Lorem Ipsum available, but the majority</p>
                      <div className="btn_main">
                        <div className="contact_bt"><a href="#">Read More</a></div>
                        <div className="contact_bt active"><a href="#">Contact Us</a></div>
                      </div>
                    </div>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#banner_slider" role="button" data-slide="prev">
                  <i className="fa fa-angle-left" />
                </a>
                <a className="carousel-control-next" href="#banner_slider" role="button" data-slide="next">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="banner_img"><img src="" /></div>
            </div>
          </div>
        </div>
    </div>

   
        </div>
    );
};
export default Slider;