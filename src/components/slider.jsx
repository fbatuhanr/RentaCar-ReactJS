import React, {useRef} from 'react';

import BannerBg from '../assets/images/banner-bg.jpg'
import {Container, Row, Col, Carousel, Button} from "react-bootstrap";
import {GrFormNext, GrNext, GrPrevious} from "react-icons/gr";


const Slider = () => {

  const sliderRef = useRef(null);

  const onPrevClick = () => {
    sliderRef.current.prev();
  };
  const onNextClick = () => {
    sliderRef.current.next();
  };

    return (
        <div id="slider">
          <div className="banner_section py-5">
              <Container>
                <Row className="justify-content-star">
                  <Col xs={{span:4, offset:2}}>
                    <Row className="mt-5">
                      <Col xs={2}>
                        <div className="slider-buttons d-grid mt-5">
                          <Button variant="outline-dark" onClick={onNextClick} className="next-button secondary-bg-color" size="lg"><GrNext /></Button>
                          <Button variant="outline-dark" onClick={onPrevClick} className="prev-button primary-bg-color " size="lg"><GrPrevious /></Button>
                        </div>
                      </Col>
                      <Col xs={{span:8, offset:1}}>
                        <Carousel ref={sliderRef}>
                          <Carousel.Item interval={3000}>
                            <Carousel.Caption className="carousel-caption text-dark text-start">
                              <h2 className="fs-1 fw-bold mb-2"><span>Car Rent</span><br/><span className="primary-color">For You</span></h2>
                              <p className="fs-3 m-0">There are many variations of passages of Lorem Ipsum available, but the majority</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                          <Carousel.Item interval={3000}>
                            <Carousel.Caption className="carousel-caption text-dark text-start">
                              <h2 className="fs-1 fw-bold mb-2"><span>Rent a Car</span><br/><span className="primary-color">Easy</span></h2>
                              <p className="fs-3 m-0">There are many variations of passages of Lorem Ipsum available, but the majority</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                        </Carousel>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
          </div>
        </div>
    );
};
export default Slider;