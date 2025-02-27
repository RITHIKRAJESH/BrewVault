import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact);
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url);
    axios
      .post(`${url}/user/contact`, contact)
      .then((res) => {
        alert(res.data.msg);
        setContact({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container id="contact" className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Contact Us</h2>
          {/* Single Form element */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={contact.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={contact.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Your message..."
                name="message"
                value={contact.message}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
