import React from 'react';


const AboutSection = () => {
    return (
    <div id='AboutSection'>
        <div className="about_section layout_padding">
         <div className="container">
          <div className="about_section_2">
            <div className="row">
              <div className="col-md-6"> 
                <div className="image_iman"><img src="" className="about_img" /></div>
              </div>
              <div className="col-md-6"> 
                <div className="about_taital_box">
                  <h1 className="about_taital">About <span style={{color: '#fe5b29'}}>Us</span></h1>
                  <p className="about_text">going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined </p>
                  <div className="readmore_btn"><a href="#">Read More</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    };
    export default AboutSection;