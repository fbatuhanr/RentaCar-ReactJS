import React from 'react';


const ContactSection = () => {
    return (
    <div id='ContactSection'>
         <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="contact_taital">Get In Touch</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="contact_section_2">
            <div className="row">
              <div className="col-md-12">
                <div className="mail_section_1">
                  <input type="text" className="mail_text" placeholder="Name" name="Name" />
                  <input type="text" className="mail_text" placeholder="Email" name="Email" />
                  <input type="text" className="mail_text" placeholder="Phone Number" name="Phone Number" />
                  <textarea className="massage-bt" placeholder="Massage" rows={5} id="comment" name="Massage" defaultValue={""} />
                  <div className="send_bt"><a href="#">Send</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    );
};
export default ContactSection;