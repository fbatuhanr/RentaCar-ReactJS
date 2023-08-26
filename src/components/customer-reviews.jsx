import React, {useRef} from 'react';

import {Button, Card, Carousel, Col, Container, Row} from "react-bootstrap";
import {GrNext, GrPrevious} from "react-icons/gr";


const CustomerReview = () => {

    const sliderRef = useRef(null);

    const onPrevClick = () => {
        sliderRef.current.prev();
    };
    const onNextClick = () => {
        sliderRef.current.next();
    };


    return (
    <div id="customer-reviews">
        <Container>
          <Row className="mt-5">
            <Col xs={2}>
              <div className="slider-buttons d-grid mt-5">
                <Button variant="outline-dark" onClick={onNextClick} className="next-button secondary-bg-color border-0 rounded-0" size="lg"><GrNext /></Button>
                <Button variant="outline-dark" onClick={onPrevClick} className="prev-button primary-bg-color border-0 rounded-0" size="lg"><GrPrevious /></Button>
              </div>
            </Col>
            <Col xs={{span:8, offset:1}}>
              <Carousel ref={sliderRef}>
                <Carousel.Item interval={3000}>
                  <Carousel.Caption className="carousel-caption text-dark text-start">
                      <Card>
                          <Card.Img variant="top" src="holder.js/100px180" />
                          <Card.Body>
                              <Card.Title>Card Title</Card.Title>
                              <Card.Text>
                                  Some quick example text to build on the card title and make up the
                                  bulk of the card's content.
                              </Card.Text>
                              <Button variant="primary">Go somewhere</Button>
                          </Card.Body>
                      </Card>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
    </div>
    );
    };
    export default CustomerReview;