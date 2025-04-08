import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Dropdown, Button, Badge, Form, InputGroup, Offcanvas } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaSignOutAlt } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import './Header.css';

const Header = () => {
	const { user, logout, isAdmin } = useContext(AuthContext);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
			setSearchQuery('');
			setShowMobileMenu(false);
		}
	};

	const cartItemsCount = 3;

	return (
		<>
			<Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
				<Container>
					{/* Logo and button */}
					<div className="d-flex align-items-center">
						<Button variant="link" className="d-lg-none me-2 text-dark" onClick={() => setShowMobileMenu(true)}>
							<FaBars size={20} />
						</Button>
						<Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
							CleanHub
						</Navbar.Brand>
					</div>

					{/* Searchbar - Desktop */}
					<Form onSubmit={handleSearch} className="d-none d-lg-flex mx-4 flex-grow-1">
						<InputGroup>
							<Form.Control
								type="search"
								placeholder="Search products..."
								aria-label="Search"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<Button variant="primary" type="submit">
								<FaSearch />
							</Button>
						</InputGroup>
					</Form>

					<div className="d-flex align-items-center">
						{/* Car */}
						<Nav.Link as={Link} to="/cart" className="position-relative mx-2">
							<FaShoppingCart size={20} />
							{cartItemsCount > 0 && (
								<Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
									{cartItemsCount}
								</Badge>
							)}
						</Nav.Link>

						{/* User */}
						{user ? (
							<Dropdown align="end">
								<Dropdown.Toggle variant="link" className="text-dark text-decoration-none">
									<div className="d-flex align-items-center">
										<div className="user-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2">
											{user.name.charAt(0)}
										</div>
										<span className="d-none d-lg-inline">{user.name}</span>
									</div>
								</Dropdown.Toggle>

								<Dropdown.Menu className="shadow-sm">
									<Dropdown.Item as={Link} to="/profile">
										<FaUser className="me-2" /> Profile
									</Dropdown.Item>
									{isAdmin() && (
										<Dropdown.Item as={Link} to="/admin">
											<FaUser className="me-2" /> Admin Panel
										</Dropdown.Item>
									)}
									<Dropdown.Divider />
									<Dropdown.Item onClick={handleLogout}>
										<FaSignOutAlt className="me-2" /> Logout
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						) : (
							<>
								<Button as={Link} to="/login" variant="outline-primary" className="d-none d-lg-inline-block ms-2">
									Login
								</Button>
								<Button as={Link} to="/register" variant="primary" className="d-none d-lg-inline-block ms-2">
									Register
								</Button>
							</>
						)}
					</div>
				</Container>
			</Navbar>

			{/* Secondary navigation menu - Desktop */}
			<Navbar bg="primary" expand="lg" className="d-none d-lg-block">
				<Container>
					<Nav className="me-auto">
						<Nav.Link as={NavLink} to="/" exact className="text-white">
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/products" className="text-white">
							Products
						</Nav.Link>
						<Nav.Link as={NavLink} to="/about" className="text-white">
							About Us
						</Nav.Link>
						<Nav.Link as={NavLink} to="/contact" className="text-white">
							Contact
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link as={NavLink} to="/offers" className="text-warning fw-bold">
							Special Offers
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			{/* Menu - Offcanvas */}
			<Offcanvas
				show={showMobileMenu}
				onHide={() => setShowMobileMenu(false)}
				placement="start"
				className="mobile-menu"
			>
				<Offcanvas.Header closeButton closeVariant="white">
					<Offcanvas.Title className="text-white">CleanHub</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className="d-flex flex-column">
					{/* Searchbar - Mobile */}
					<Form onSubmit={handleSearch} className="mb-4">
						<InputGroup>
							<Form.Control
								type="search"
								placeholder="Search products..."
								aria-label="Search"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<Button variant="light" type="submit">
								<FaSearch />
							</Button>
						</InputGroup>
					</Form>

					{/* Navigation */}
					<Nav className="flex-column mb-auto">
						<Nav.Link as={NavLink} to="/" exact className="text-white" onClick={() => setShowMobileMenu(false)}>
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/products" className="text-white" onClick={() => setShowMobileMenu(false)}>
							Products
						</Nav.Link>
						<Nav.Link as={NavLink} to="/about" className="text-white" onClick={() => setShowMobileMenu(false)}>
							About Us
						</Nav.Link>
						<Nav.Link as={NavLink} to="/contact" className="text-white" onClick={() => setShowMobileMenu(false)}>
							Contact
						</Nav.Link>
						<Nav.Link as={NavLink} to="/offers" className="text-warning" onClick={() => setShowMobileMenu(false)}>
							Special Offers
						</Nav.Link>
					</Nav>

					{/* Authentication */}
					{user ? (
						<div className="border-top pt-3">
							<div className="d-flex align-items-center mb-3">
								<div className="user-avatar bg-light text-primary rounded-circle d-flex align-items-center justify-content-center me-3">
									{user.name.charAt(0)}
								</div>
								<div>
									<div className="fw-bold text-white">{user.name}</div>
									<small className="text-white-50">{user.email}</small>
								</div>
							</div>
							{isAdmin() && (
								<Button
									as={Link}
									to="/admin"
									variant="light"
									className="w-100 mb-2"
									onClick={() => setShowMobileMenu(false)}
								>
									Admin Panel
								</Button>
							)}
							<Button
								variant="outline-light"
								className="w-100"
								onClick={() => {
									handleLogout();
									setShowMobileMenu(false);
								}}
							>
								<FaSignOutAlt className="me-2" /> Logout
							</Button>
						</div>
					) : (
						<div className="border-top pt-3">
							<Button
								as={Link}
								to="/login"
								variant="light"
								className="w-100 mb-2"
								onClick={() => setShowMobileMenu(false)}
							>
								Login
							</Button>
							<Button
								as={Link}
								to="/register"
								variant="outline-light"
								className="w-100"
								onClick={() => setShowMobileMenu(false)}
							>
								Register
							</Button>
						</div>
					)}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default Header;
