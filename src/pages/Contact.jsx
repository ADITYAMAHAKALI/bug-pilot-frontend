import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <Wrapper>
      <header className="section">
        <div className="title">
          <h1>Contact Us</h1>
          <div className="title-underline"></div>
        </div>
      </header>

      <div className="section">
        <div className="section section-center contact-center">
          <article className="contact-info">
            <div className="address details">
              <FaMapMarkerAlt />
              <h4>Address</h4>
              <p>Sector 33, Gurgaon</p>
              <p>Haryana</p>
            </div>
            <div className="phone details">
              <FaPhoneAlt />
              <h4>Phone</h4>
              <p>+91-9234567890</p>
              <p>+91-9987654321</p>
            </div>
            <div className="email details">
              <FaEnvelope />
              <h4>Email</h4>
              <p>bugpilot.bussiness@gmail.com</p>
              <p>info.bugpilot@gmail.com</p>
            </div>
          </article>

          <article className="contact-form">
            <h3>Send us a message</h3>
            <p>
              If you have any work from us or any types of queries related to
              our work, you can send us message from here. It'll be our pleasure
              to help you.
            </p>
            <form className="">
              <div className="form-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="form-row">
                <textarea
                  type="text"
                  className="form-textarea"
                  placeholder="Write Your Message Here!"
                />
              </div>

              <button type="submit" className="btn btn-block">
                Send Now
              </button>
            </form>
          </article>
        </div>
      </div>
    </Wrapper>
  );
};

export const Wrapper = styled.section`
  header {
    background: var(--primary-1);
    text-align: center;

    .title {
      margin-bottom: 0;
    }
  }

  .contact-center {
    background: var(--white);
    padding-left: 2rem;
    padding-right: 2rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column-reverse;
    gap: 4rem;

    @media (min-width: 992px) {
      flex-direction: row;
      justify-content: space-around;
    }
  }

  .contact-info {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    text-align: center;
    justify-self: center;

    @media (min-width: 992px) {
      align-items: flex-start;
      text-align: left;
      flex-direction: column;
      position: relative;
      padding-right: 4rem;

      ::before {
        content: '';
        position: absolute;
        height: 70%;
        width: 1px;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #ccc;
      }
    }

    svg {
      font-size: 1.5rem;
      color: var(--primary-5);
      margin-bottom: 0.5rem;
    }

    h4 {
      font-weight: 500;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    p {
      font-size: 0.875rem;
      color: #afafb6;
      margin-bottom: 0;
    }
  }

  .contact-form {
    h3 {
      color: var(--primary-5);
      font-size: 1.5rem;
    }
  }
`;

export default Contact;
