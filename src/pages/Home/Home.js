import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Carousel, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaStar, FaChevronRight, FaBroom, FaLeaf, FaShieldAlt } from 'react-icons/fa';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadProducts = async () => {
			setIsLoading(true);
			try {
				// Api call simulated
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Mocked data
				const mockProducts = [
					{
						id: 1,
						name: 'Eco-Friendly Multi-Surface Cleaner',
						price: 32900,
						image:
							'https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
					},
					{
						id: 2,
						name: 'Bamboo Floor Cleaner Concentrate',
						price: 49900,
						image:
							'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
					},
					{
						id: 3,
						name: 'Streak-Free Glass Cleaner',
						price: 27900,
						image:
							'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
					}
				];

				setFeaturedProducts(mockProducts);
			} catch (error) {
				console.error('Error loading products:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadProducts();
	}, []);

	return (
		<div className="home-page">
			<Header />

			{/* Hero Section */}
			<section className="hero-section bg-light py-5">
				<Container>
					<Row className="align-items-center">
						<Col lg={6} className="mb-4 mb-lg-0">
							<h1 className="display-4 fw-bold mb-3">
								Professional Cleaning <span className="text-primary">Products</span>
							</h1>
							<p className="lead mb-4">
								Discover our eco-friendly cleaning solutions that combine effectiveness with environmental
								responsibility. Perfect for homes and businesses alike.
							</p>
							<div className="d-flex gap-3">
								<Button as={Link} to="/products" variant="primary" size="lg">
									Shop Now <FaChevronRight className="ms-2" />
								</Button>
								<Button as={Link} to="/about" variant="outline-primary" size="lg">
									Learn More
								</Button>
							</div>
						</Col>
						<Col lg={6}>
							<Carousel fade controls={false} indicators={false} interval={3000}>
								<Carousel.Item>
									<img
										className="d-block w-100 rounded shadow"
										src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
										alt="Cleaning products"
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
										className="d-block w-100 rounded shadow"
										src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
										alt="Eco friendly cleaning"
									/>
								</Carousel.Item>
							</Carousel>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Features Section */}
			<section className="features-section py-5">
				<Container>
					<h2 className="text-center mb-5">
						Why Choose <span className="text-primary">CleanHub</span>?
					</h2>
					<Row className="g-4">
						<Col md={4}>
							<Card className="h-100 border-0 shadow-sm text-center p-4 feature-card">
								<div className="icon-wrapper bg-primary bg-opacity-10 text-primary mx-auto mb-3">
									<FaLeaf size={30} />
								</div>
								<Card.Body>
									<Card.Title>Eco-Friendly</Card.Title>
									<Card.Text>
										Our products are made with biodegradable ingredients that are safe for your family and the
										environment.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="h-100 border-0 shadow-sm text-center p-4 feature-card">
								<div className="icon-wrapper bg-primary bg-opacity-10 text-primary mx-auto mb-3">
									<FaBroom size={30} />
								</div>
								<Card.Body>
									<Card.Title>Powerful Cleaning</Card.Title>
									<Card.Text>
										Scientifically formulated to remove tough stains and dirt without harsh chemicals.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="h-100 border-0 shadow-sm text-center p-4 feature-card">
								<div className="icon-wrapper bg-primary bg-opacity-10 text-primary mx-auto mb-3">
									<FaShieldAlt size={30} />
								</div>
								<Card.Body>
									<Card.Title>Quality Guaranteed</Card.Title>
									<Card.Text>All our products are tested and approved by cleaning professionals.</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Featured Products */}
			<section className="products-section py-5 bg-light">
				<Container>
					<div className="d-flex justify-content-between align-items-center mb-5">
						<h2 className="mb-0">
							Featured <span className="text-primary">Products</span>
						</h2>
						<Link to="/products" className="btn btn-link text-primary">
							View All <FaChevronRight />
						</Link>
					</div>

					{isLoading ? (
						<Row className="g-4">
							{[1, 2, 3].map((item) => (
								<Col md={4} key={item}>
									<Card className="h-100 product-card">
										<div className="placeholder-glow">
											<div className="placeholder" style={{ height: '200px', width: '100%' }} />
											<Card.Body>
												<h5 className="card-title placeholder-glow">
													<span className="placeholder col-8"></span>
												</h5>
												<p className="card-text placeholder-glow">
													<span className="placeholder col-6"></span>
												</p>
												<div className="d-flex justify-content-between">
													<span className="placeholder col-4"></span>
													<span className="placeholder col-2"></span>
												</div>
											</Card.Body>
										</div>
									</Card>
								</Col>
							))}
						</Row>
					) : (
						<Row className="g-4">
							{featuredProducts.map((product) => (
								<Col md={4} key={product.id}>
									<Card className="h-100 product-card shadow-sm">
										<div className="product-image-wrapper">
											<Card.Img variant="top" src={product.image} />
										</div>
										<Card.Body>
											<Card.Title>{product.name}</Card.Title>
											<div className="d-flex justify-content-between align-items-center mb-2">
												<h5 className="text-primary mb-0">${product.price}</h5>
											</div>
											<Button variant="outline-primary" className="w-100 mt-2">
												<FaShoppingCart className="me-2" /> Add to Cart
											</Button>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					)}
				</Container>
			</section>

			{/* Call to Action */}
			<section className="cta-section py-5 bg-primary text-white">
				<Container className="text-center">
					<h2 className="display-5 fw-bold mb-4">Ready to Transform Your Cleaning Routine?</h2>
					<p className="lead mb-5">
						Join thousands of satisfied customers who trust CleanHub for their cleaning needs.
					</p>
					<Button variant="light" size="lg" className="px-4" as={Link} to="/register">
						Get Started
					</Button>
				</Container>
			</section>

			<Footer />
		</div>
	);
};

export default Home;
