import React from 'react';
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import {IoLocation} from "react-icons/io5";
import {BsTelephoneFill} from "react-icons/bs";
import {GrMail} from "react-icons/gr";
import {BiLogoFacebook, BiLogoLinkedin} from "react-icons/bi";
import {AiFillInstagram, AiOutlineTwitter} from "react-icons/ai";
import {useLocation} from "react-router-dom";


const Footer = () => {

  const location = useLocation();

  return <>
    {
        !location.pathname.includes("admin") &&
        <footer id="footer" className="secondary-bg-color">
          <Container className="pt-3 pb-2">
            <Row>
              <Col>
                <h1 className="fs-1 text-center quinary-color">Rent a Car</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h4 className="fs-4 text-white fw-700">Subscribe Now</h4>
                    <p className="fs-6 text-white m-0 mb-1">There are many variations of passages of Lorem Ipsum available, Ipsum.</p>
                    <div className="form-group">
                      <Form.Control as="textarea" rows={1} placeholder="Enter Your Email"/>
                      <Button variant="primary" className="primary-bg-color border-0 w-100 mt-1">Subscribe</Button>
                    </div>
                  </Col>
                  <Col>
                    <h4 className="fs-4 text-white fw-700">Information</h4>
                    <p className="fs-6 text-white m-0">There are many variations of passages of Lorem Ipsum available, but the majority </p>
                  </Col>
                  <Col>
                    <h4 className="fs-4 text-white fw-700">Helpful Links</h4>
                    <p className="fs-6 text-white m-0">There are many variations of passages of Lorem Ipsum available, but the majority </p>
                  </Col>
                  <Col>
                    <h4 className="fs-4 text-white fw-700">Contact Us</h4>
                    <p className="fs-6 text-white m-0">
                  <span>
                    <IoLocation className="header-line-2-icon"/>&nbsp;
                    <a href="https://goo.gl/maps/2rkkAA9FP5pegCXF9" target="_blank" className="text-white">New York</a>
                  </span>
                      <br/>
                      <span>
                    <BsTelephoneFill size="0.9em" className="header-line-2-icon"/>&nbsp;
                        <a href="tel:+12126583916" target="_blank" className="text-white">(212) 658-3916</a>
                  </span>
                      <br/>
                      <span>
                    <GrMail className="header-line-2-icon"/>&nbsp;
                        <a href="mailto:fbatuhanr@gmail.com" target="_blank" className="text-white">fbatuhanr@gmail.com</a>
                  </span>
                    </p>
                    <div className="social-icon">
                      <ul>
                        <li><a href="https://www.facebook.com/" target="_blank"><BiLogoFacebook/></a></li>
                        <li><a href="https://twitter.com/" target="_blank"><AiOutlineTwitter/></a></li>
                        <li><a href="https://www.linkedin.com/" target="_blank"><BiLogoLinkedin/></a></li>
                        <li><a href="https://www.instagram.com/" target="_blank"><AiFillInstagram/></a></li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-white text-center fs-6 mt-2 mb-1">
                  {new Date().getFullYear()} All Rights Reserved. Developed & Designed by &nbsp;
                  <a href="https://github.com/fbatuhanr/" target="_blank" className="text-primary">fbatuhanr</a>
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
    }
    </>
};
export default Footer;