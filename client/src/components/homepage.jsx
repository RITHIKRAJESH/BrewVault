import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col, Form, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import img1 from '../assets/akha-farmers.webp'
import img2 from '../assets/beautiful-natural-landscape.webp'
import img3 from '../assets/tree-with-small-green-red-berries-it.webp'
import video from '../assets/7125322-uhd_3840_2160_25fps.mp4'
import video1 from '../assets/BB_2c2decb2-35e1-4301-873c-fb83f14c1ac2.webm'
import video3 from  '../assets/BB_834a5845-68f5-40e7-b8fe-49815427ba34.mov'

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
            <p style={{textAlign:"justify"}}>Coffee plantation and farming involve the cultivation of coffee plants, primarily in tropical regions with rich soil, adequate rainfall, and high altitudes. Farmers grow coffee trees, which take several years to mature and produce cherries containing coffee beans. The harvesting process can be manual or mechanical, depending on the terrain and farm size. After harvesting, the beans go through processing, drying, and roasting before reaching consumers. Sustainable coffee farming practices help preserve the environment and ensure better livelihoods for farmers, making coffee production a vital part of many economies worldwide.</p>
          </Col>
        </Row>
      </Container>

      {/* Testimonial Section */}
      <Container id="testimonials" className="mt-5 text-center">
        <h2>What Our Customers Say</h2>
        <Row className="mt-4">
          <Col md={4}>
            <video controls className="w-100 rounded shadow">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="mt-2">"Best coffee I've ever had!" - Alex</p>
          </Col>
          <Col md={4}>
            <video controls className="w-100 rounded shadow">
              <source src={video1} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <p className="mt-2">"A cozy place to relax and work." - Jamie</p>
          </Col>
          <Col md={4}>
            <video controls className="w-100 rounded shadow">
              <source src={video3} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="mt-2">"Amazing quality and great service!" - Taylor</p>
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
