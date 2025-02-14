import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col, Form, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import img1 from '../assets/akha-farmers.webp'
import img2 from '../assets/beautiful-natural-landscape.webp'
import img3 from '../assets/tree-with-small-green-red-berries-it.webp'
export default function Homepage() {
  
  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Coffee Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Bootstrap Carousel */}
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={img1} alt="First slide" />
          <Carousel.Caption>
            <h3>Freshly Brewed Coffee</h3>
            <p>Enjoy the best coffee in town!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img2} alt="Second slide" />
          <Carousel.Caption>
            <h3>Relaxing Atmosphere</h3>
            <p>Perfect place to unwind and work.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img3} alt="Third slide" />
          <Carousel.Caption>
            <h3>Quality Beans</h3>
            <p>We source the finest beans from around the world.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* About Section */}
      <Container id="about" className="mt-5">
        <Row className="text-center">
          <Col>
            <h2>About Us</h2>
            <p>We are a premium coffee shop dedicated to bringing you the best coffee experience. Our beans are carefully selected to ensure quality and taste.</p>
          </Col>
        </Row>
      </Container>

      {/* Contact Form */}
      <Container id="contact" className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-center">Contact Us</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Your message..." />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <Container>
          <p>&copy; {new Date().getFullYear()} Coffee Shop. All Rights Reserved.</p>
        </Container>
      </footer>
    </>
  );
}
