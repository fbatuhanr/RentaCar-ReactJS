import React from 'react';


const Footer = () => {
    return (
    <div id='Footer'>   
    <div>
        <div className="footer_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="footeer_logo"><img src="images/logo.png" /></div>
              </div>
            </div>
            <div className="footer_section_2">
              <div className="row">
                <div className="col">
                  <h4 className="footer_taital">Subscribe Now</h4>
                  <p className="footer_text">There are many variations of passages of Lorem Ipsum available,</p>
                  <div className="form-group">
                    <textarea className="update_mail" placeholder="Enter Your Email" rows={5} id="comment" name="Enter Your Email" defaultValue={""} />
                    <div className="subscribe_bt"><a href="#">Subscribe</a></div>
                  </div>
                </div>
                <div className="col">
                  <h4 className="footer_taital">Information</h4>
                  <p className="lorem_text">There are many variations of passages of Lorem Ipsum available, but the majority </p>
                </div>
                <div className="col">
                  <h4 className="footer_taital">Helpful Links</h4>
                  <p className="lorem_text">There are many variations of passages of Lorem Ipsum available, but the majority </p>
                </div>
                <div className="col">
                  <h4 className="footer_taital">Invesments</h4>
                  <p className="lorem_text">There are many variations of passages of Lorem Ipsum available, but the majority </p>
                </div>
                <div className="col">
                  <h4 className="footer_taital">Contact Us</h4>
                  <div className="location_text"><a href="#"><i className="fa fa-map-marker" aria-hidden="true" /><span className="padding_left_15">Location</span></a></div>
                  <div className="location_text"><a href="#"><i className="fa fa-phone" aria-hidden="true" /><span className="padding_left_15">(+71) 8522369417</span></a></div>
                  <div className="location_text"><a href="#"><i className="fa fa-envelope" aria-hidden="true" /><span className="padding_left_15">demo@gmail.com</span></a></div>
                  <div className="social_icon">
                    <ul>
                      <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
                      <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
                      <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a></li>
                      <li><a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright_section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <p className="copyright_text">2023 All Rights Reserved. Design by Rico&amp;Bacu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
    );
};
export default Footer;