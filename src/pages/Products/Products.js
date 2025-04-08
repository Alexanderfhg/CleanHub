import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown, Spinner } from 'react-bootstrap';
import { FaSortAmountDown, FaMoneyBillWave, FaTag } from 'react-icons/fa';
import './Products.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

/**
 * Displays a list of available products.
 * Allows sorting by price or name.
 * Shows a loading spinner while data is being "fetched".
 */
const Products = () => {
	// State for storing the list of products
	const [products, setProducts] = useState([]);

	// Sorting criteria: 'price' or 'name'
	const [sortBy, setSortBy] = useState('price');

	// Loading state to simulate data fetching
	const [loading, setLoading] = useState(true);

	/**
	 * Sample product data simulating a backend response
	 */
	const sampleProducts = [
		{
			id: 1,
			name: 'Multi-Purpose Cleaner',
			price: 34900,
			category: 'home',
			image:
				'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
		},
		{
			id: 2,
			name: 'Floor Disinfectant',
			price: 56400,
			category: 'floors',
			image:
				'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
		},
		{
			id: 3,
			name: 'Liquid Laundry Soap',
			price: 29000,
			category: 'clothing',
			image:
				'https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
		},
		{
			id: 4,
			name: 'Glass Cleaner',
			price: 25900,
			category: 'glass',
			image:
				'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
		}
	];

	/**
	 * Simulates fetching product data asynchronously
	 */
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				// Simulate network delay
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setProducts(sampleProducts);
			} catch (error) {
				console.error('Failed to load products:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	/**
	 * Sorts products based on selected criteria
	 */
	const sortedProducts = [...products].sort((a, b) => {
		if (sortBy === 'price') return a.price - b.price;
		if (sortBy === 'name') return a.name.localeCompare(b.name);
		return 0;
	});

	return (
		<div>
			<Header />

			<Container className="products-page py-4">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h1 className="h3 mb-0">
						<FaTag className="me-2 text-primary" />
						Our Products
					</h1>

					<Dropdown>
						<Dropdown.Toggle variant="light" className="d-flex align-items-center">
							<FaSortAmountDown className="me-2" />
							Sort by
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={() => setSortBy('price')}>
								<FaMoneyBillWave className="me-2" />
								Price (Low to High)
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setSortBy('name')}>
								<FaSortAmountDown className="me-2" />
								Name (A-Z)
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>

				{loading ? (
					<div className="text-center py-5">
						<Spinner animation="border" variant="primary" />
						<p className="mt-2">Loading products...</p>
					</div>
				) : (
					<Row xs={1} md={2} lg={3} className="g-4">
						{sortedProducts.map((product) => (
							<Col key={product.id}>
								<Card className="h-100 shadow-sm product-card">
									<Card.Img variant="top" src={product.image} alt={product.name} className="product-image" />
									<Card.Body className="d-flex flex-column">
										<Card.Title className="h6 mb-3">{product.name}</Card.Title>
										<div className="mt-auto">
											<span className="badge bg-primary mb-2">{product.category.toUpperCase()}</span>
											<p className="h5 text-success mb-0">${product.price}</p>
										</div>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				)}
			</Container>

			<Footer />
		</div>
	);
};

export default Products;
