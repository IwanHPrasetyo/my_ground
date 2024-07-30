import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ContactImg from "../assets/img/contact-img.svg";

export const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetail, setFormDetail] = useState(formInitialDetails);
  const [buttonText, setButtonTxt] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetail({
      ...formDetail,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonTxt("Sending...");

    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetail),
    });
    setButtonTxt("Send");

    let result = response.json();
    setFormDetail(formInitialDetails);

    if (result.code === 200) {
      setStatus({ success: true, message: "Mesage sent successfully" });
    } else {
      setStatus({
        success: false,
        message: "Something went wrong, please try again leter",
      });
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="alignt-items-center">
          <Col md={6}>
            <img src={ContactImg} alt="Contact Us" />
          </Col>
          <Col md={6}>
            <h2>Get In Touch</h2>
            <form>
              <Row>
                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    value={formDetail.firstName}
                    placeholder="First Name"
                    onChange={(e) => {
                      onFormUpdate("firstName", e.target.value);
                    }}
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    value={formDetail.lastName}
                    placeholder="Last Name"
                    onChange={(e) => {
                      onFormUpdate("lastName", e.target.value);
                    }}
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="email"
                    value={formDetail.email}
                    placeholder="Email Address"
                    onChange={(e) => {
                      onFormUpdate("email", e.target.value);
                    }}
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="tel"
                    value={formDetail.phone}
                    placeholder="Phone No."
                    onChange={(e) => {
                      onFormUpdate("phone", e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <textarea
                    row="6"
                    value={formDetail.message}
                    placeholder="Message"
                    onChange={(e) => {
                      onFormUpdate("message", e.target.value);
                    }}
                  />
                  <button type="submit">
                    <span>{buttonText}</span>
                  </button>
                </Col>
                {status.message && (
                  <Col>
                    <p
                      className={
                        status.success === false ? "danger" : "success"
                      }
                    >
                      {status.message}
                    </p>
                  </Col>
                )}
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
