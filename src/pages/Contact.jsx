import "./contactus.css";

const Contact = () => {
  return (
    <div className="container">
      {/* <h1 classNameNameName="headline">Contact Us</h1>
      <div classNameNameName="main-content">
        <div classNameNameName="details">
          <div classNameNameName="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            magni, ipsum enim iure laboriosam harum fuga asperiores. Quae fugiat
          </div>
          <div classNameNameName="contact-links">
              <div classNameNameName="address">
                  <p classNameNameName="addresspara"> <span>Address: </span> Sector 33, Gurgaon</p>
              </div>
              <div classNameNameName="linkedin">
                <p classNameNameName="linkedinpara"> <span>LinkedIn: </span> blogpilot</p>
              </div>
              <div classNameNameName="email">
                <p classNameNameName="emailpara"><span>Email: </span> blogpilot.bussiness@gmail.com</p>
              </div>
          </div>
        </div>

        <div classNameNameName="contact-form">
          <form action="submit">
            <p>Send Me A Message</p>
            <div classNameNameName="firstrow">
              <div classNameNameName="name">
                <label htmlFor="name-input">Name</label> <br />
                <input type="text" classNameNameName="name-input" />
              </div>
              <div classNameNameName="email">
                <label htmlFor="email-input">Email</label>  <br />
                <input type="text" classNameNameName="email-input" />
              </div>
            </div>

            <div classNameNameName="secondrow">
              <label htmlFor="subject-input">Subject</label>  <br />
              <input classNameNameName="subjet-input" type="text" />
            </div>

            <div classNameNameName="thirdrow">
              <label htmlFor="message-input">Message</label> <br />
              <input type="text" classNameNameName="message-input" />
            </div>

          </form>
        </div>
      </div> */}

      <div className="content">
        <div className="left-side">
          <div className="address details">
            <i className="fas fa-map-marker-alt"></i>
            <div className="topic">Address</div>
            <div className="text-one">Sector 33, Gurgaon</div>
            <div className="text-two">Noida</div>
          </div>
          <div className="phone details">
            <i className="fas fa-phone-alt"></i>
            <div className="topic">Phone</div>
            <div className="text-one">+91-9234567890</div>
            <div className="text-two">+91-9987654321</div>
          </div>
          <div className="email details">
            <i className="fas fa-envelope"></i>
            <div className="topic">Email</div>
            <div className="text-one">bugpilot.bussiness@gmail.com</div>
            <div className="text-two">info.bugpilot@gmail.com</div>
          </div>
        </div>
        <div className="right-side">
          <div className="topic-text">Send us a message</div>
          <p>
            If you have any work from us or any types of quries related to our
            work, you can send us message from here. It's our pleasure to
            help you.
          </p>
          <form action="#">
            <div className="input-box">
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter Your Email" />
            </div>
            <div className="input-box message-box">
              <input type="text" placeholder="Write Your Message Here!" />
            </div>
      
            <button>Send Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
