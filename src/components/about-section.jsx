import React from 'react'
import {Container, Row, Col} from "react-bootstrap"
import AboutImage from '../assets/images/about-image.png'


const AboutSection = () => {
    return (
    <div id="about-section">
     <Container>
        <Row>
          <Col xs={6}>
            <div className="image_iman">
                <img src={AboutImage} className="about_img" />
            </div>
          </Col>
          <Col xs={6}>
            <div className="about_taital_box">
              <h1 className="about_taital">About <span style={{color: '#fe5b29'}}>Us</span></h1>
              <p className="about_text">going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined </p>
              <div className="readmore_btn"><a href="#">Read More</a></div>
            </div>
          </Col>
        </Row>
     </Container>
    </div>
    );
    };
    export default AboutSection;