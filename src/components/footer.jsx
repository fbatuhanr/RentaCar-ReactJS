import React from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { IoLocation } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { useLocation } from "react-router-dom";


const Footer = () => {

  const location = useLocation();

  return <>
    {
      !location.pathname.includes("admin") &&
      <footer id="footer" className="secondary-bg-color">
        <Container className="pt-2 pb-2">
          <Row>
            <Col>
              <h1 className="fs-1 text-center quinary-color">Car World</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col md={{ span: 3, offset: 2 }}>
                  <h4 className="fs-4 text-white fw-700">Information</h4>
                  <p className="fs-6 text-white m-0">Day la bao cao cuoi ky mon LTCSDL, toi van chua hoan thanh no, toi thay bat luc va met moi, toi muon tu bo moi thu. Hay chi loi cho toi </p>
                </Col>
                <Col md={{ span: 3, offset: 2 }}>
                  <h4 className="fs-4 text-white fw-700">Contact Us</h4>
                  <p className="fs-6 text-white m-0">
                    <span>
                      <IoLocation className="header-line-2-icon" />&nbsp;
                      <a href="https://goo.gl/maps/2rkkAA9FP5pegCXF9" target="_blank" className="text-white">Nha Be Campus</a>
                    </span>
                    <br />
                    <span>
                      <BsTelephoneFill size="0.9em" className="header-line-2-icon" />&nbsp;
                      <a href="tel:+12126583916" target="_blank" className="text-white">(84)(89)815-4773</a>
                    </span>
                    <br />
                    <span>
                      <GrMail className="header-line-2-icon" />&nbsp;
                      <a href="mailto:info@rentacar" target="_blank" className="text-white">info@carworld</a>
                    </span>
                  </p>
                  <div className="social-icon">
                    <ul>
                      <li><a href="https://www.facebook.com/" target="_blank"><BiLogoFacebook /></a></li>
                      <li><a href="https://twitter.com/" target="_blank"><AiOutlineTwitter /></a></li>
                      <li><a href="https://www.linkedin.com/" target="_blank"><BiLogoLinkedin /></a></li>
                      <li><a href="https://www.instagram.com/" target="_blank"><AiFillInstagram /></a></li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
    }
  </>
};
export default Footer;