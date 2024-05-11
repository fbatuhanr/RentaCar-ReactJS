import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import AboutImage from '../assets/images/about-image.png'


const AboutSection = () => {
  return (
    <div id="about-section">
      <Container>
        <Row className="mt-1 mb-2">
          <Col xs={{ span: 12, order: "last" }} md={{ span: 6, order: "first" }}>
            <div className="image_iman">
              <img src={AboutImage} className="about_img" />
            </div>
          </Col>
          <Col xs={{ span: 12, order: "first" }} md={{ span: 6, order: "last" }}>
            <div className="mt-2 mb-5">
              <h1 className="text-uppercase fs-1 fw-600">
                About <span className="primary-color">Us</span>
              </h1>
              <p className="about-text fs-5 m-0">
                CAR WORLD - A car store that offers a wide range of cars for rent and buy. Also, we provide car maintenance services.
                We offer a variety of cars to suit your needs.
                Our cars are well-maintained and reliable, so you can be sure that you are getting a quality car when you buy or rent from us.
                Moreover, we offer competitive prices and excellent customer service, so you can trust us to provide you with the best car-buying or renting experience.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AboutSection;