import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-dark text-white pt-5 pb-3">
			<Container>
				<Row className="g-4">
					{/* Column 1: Company info */}
					<Col lg={4} md={6}>
						<h5 className="text-uppercase fw-bold mb-4 text-primary">CleanHub</h5>
						<p className="">
							Your trusted partner for eco-friendly cleaning solutions. We provide high-quality products that are safe
							for your home and the environment.
						</p>
						<div className="mt-4">
							<h6 className="text-uppercase fw-bold mb-3">Follow Us</h6>
							<div className="social-icons">
								<a href="https://facebook.com" className="text-white me-3" aria-label="Facebook">
									<FaFacebook size={20} />
								</a>
								<a href="https://twitter.com" className="text-white me-3" aria-label="Twitter">
									<FaTwitter size={20} />
								</a>
								<a href="https://instagram.com" className="text-white me-3" aria-label="Instagram">
									<FaInstagram size={20} />
								</a>
								<a href="https://linkedin.com" className="text-white" aria-label="LinkedIn">
									<FaLinkedin size={20} />
								</a>
							</div>
						</div>
					</Col>

					{/* Column 2: Quick links */}
					<Col lg={2} md={6}>
						<h6 className="text-uppercase fw-bold mb-4">Quick Links</h6>
						<ListGroup variant="flush" className="bg-transparent">
							<ListGroup.Item action as={Link} to="/" className="bg-transparent text-white border-0 ps-0">
								Home
							</ListGroup.Item>
							<ListGroup.Item action as={Link} to="/products" className="bg-transparent text-white border-0 ps-0">
								Products
							</ListGroup.Item>
							<ListGroup.Item action as={Link} to="/about" className="bg-transparent text-white border-0 ps-0">
								About Us
							</ListGroup.Item>
							<ListGroup.Item action as={Link} to="/contact" className="bg-transparent text-white border-0 ps-0">
								Contact
							</ListGroup.Item>
							<ListGroup.Item action as={Link} to="/faq" className="bg-transparent text-white border-0 ps-0">
								FAQ
							</ListGroup.Item>
						</ListGroup>
					</Col>

					{/* Columna 3: Contact info */}
					<Col lg={3} md={6}>
						<h6 className="text-uppercase fw-bold mb-4">Contact Info</h6>
						<ListGroup variant="flush" className="bg-transparent">
							<ListGroup.Item className="bg-transparent  border-0 ps-0 mb-2 d-flex align-items-start">
								<FaMapMarkerAlt className="me-3 mt-1 text-primary" />
								<span className="text-white">123 Clean Street, Green City, EC 12345</span>
							</ListGroup.Item>
							<ListGroup.Item className="bg-transparent  border-0 ps-0 mb-2 d-flex align-items-start">
								<FaPhone className="me-3 mt-1 text-primary" />
								<span className="text-white">+1 (555) 123-4567</span>
							</ListGroup.Item>
							<ListGroup.Item className="bg-transparent  border-0 ps-0 d-flex align-items-start">
								<FaEnvelope className="me-3 mt-1 text-primary" />
								<span className="text-white">info@cleanhub.com</span>
							</ListGroup.Item>
						</ListGroup>
					</Col>

					{/* Columna 4: Newsletter */}
					<Col lg={3} md={6}>
						<h6 className="text-uppercase fw-bold mb-4">Newsletter</h6>
						<p className="">Subscribe to get updates on new products and special offers.</p>
						<Form className="mt-4">
							<Form.Group controlId="formEmail" className="mb-3">
								<Form.Control
									type="email"
									placeholder="Your email address"
									className="bg-secondary border-0 text-white"
								/>
							</Form.Group>
							<Button variant="primary" type="submit" className="w-100">
								Subscribe
							</Button>
						</Form>
					</Col>
				</Row>

				{/* Rights reserved */}
				<Row className="mt-5">
					<Col md={6} className="text-center text-md-start mb-3 mb-md-0">
						<p className="mb-0">&copy; {currentYear} CleanHub. All rights reserved.</p>
					</Col>
					<Col md={6} className="text-center text-md-end">
						<div className="legal-links">
							<Link to="/privacy-policy" className=" me-3">
								Privacy Policy
							</Link>
							<Link to="/terms" className=" me-3">
								Terms of Service
							</Link>
							<Link to="/cookies" className="">
								Cookie Policy
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
