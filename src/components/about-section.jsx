import React from 'react'
import {Container, Row, Col} from "react-bootstrap"
import AboutImage from '../assets/images/about-image.png'


const AboutSection = () => {
    return (
    <div id="about-section">
     <Container>
        <Row className="mt-1 mb-2">
          <Col xs={{span:12, order:"last"}} md={{span:6, order:"first"}}>
            <div className="image_iman">
                <img src={AboutImage} className="about_img" />
            </div>
          </Col>
          <Col xs={{span:12, order:"first"}} md={{span:6, order:"last"}}>
            <div className="mt-2 mb-5">
              <h1 className="text-uppercase fs-1 fw-600">
                  About <span className="primary-color">Us</span>
              </h1>
              <p className="about-text fs-5 m-0">
                  Quisque a nulla a elit efficitur consequat quis vitae nulla. Vestibulum ornare turpis felis. Praesent varius tellus et augue faucibus cursus. Nam a condimentum mauris. Aenean non fermentum mi. Etiam ultrices eleifend aliquam. Sed id felis sed massa ornare efficitur eu sed diam. Proin sollicitudin tristique vulputate. Aenean non est hendrerit, tincidunt purus non, vestibulum ante. Phasellus vel ullamcorper sapien. Nulla accumsan venenatis dolor. Etiam metus diam, malesuada sit amet.
              </p>
              <div className="mt-3">
                  <a href="#" className="readmore-btn fs-5 px-3 py-2">Read More</a>
              </div>
            </div>
          </Col>
        </Row>
     </Container>
    </div>
    );
    };
    export default AboutSection;