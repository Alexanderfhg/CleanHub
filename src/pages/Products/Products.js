import { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Dropdown, Badge, Spinner, Alert, InputGroup } from 'react-bootstrap';
import { FaShoppingCart, FaFilter, FaStar, FaSearch, FaTimes } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOption, setSortOption] = useState('featured');
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation();

  // Categorías de productos
  const categories = [
    'All',
    'Surface Cleaners',
    'Floor Care',
    'Glass Cleaners',
    'Bathroom',
    'Kitchen',
    'Eco-Friendly',
    'Disinfectants'
  ];

  // Simular carga de productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simular retraso de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos de ejemplo (en una app real esto vendría de una API)
        const mockProducts = [
          { 
            id: 1, 
            name: 'Eco Multi-Surface Cleaner', 
            price: 8.99, 
            category: 'Surface Cleaners', 
            rating: 4.5, 
            reviews: 124, 
            image: 'https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            isNew: true,
            discount: 15,
            stock: 25,
            description: 'Plant-based formula safe for all surfaces. Removes grease and grime effectively.'
          },
          { 
            id: 2, 
            name: 'Bamboo Floor Cleaner', 
            price: 12.99, 
            category: 'Floor Care', 
            rating: 4.8, 
            reviews: 89, 
            image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            isNew: false,
            discount: 0,
            stock: 42,
            description: 'Special formula for hardwood and bamboo floors. Leaves no residue.'
          },
          { 
            id: 3, 
            name: 'Streak-Free Glass Cleaner', 
            price: 6.49, 
            category: 'Glass Cleaners', 
            rating: 4.3, 
            reviews: 56, 
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            isNew: true,
            discount: 10,
            stock: 18,
            description: 'Ammonia-free formula for sparkling windows and mirrors.'
          },
          { 
            id: 4, 
            name: 'Bathroom Scrub & Shine', 
            price: 7.99, 
            category: 'Bathroom', 
            rating: 4.7, 
            reviews: 203, 
            image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            isNew: false,
            discount: 0,
            stock: 31,
            description: 'Removes soap scum, hard water stains and mildew.'
          },
          { 
            id: 5, 
            name: 'Degreasing Kitchen Spray', 
            price: 9.49, 
            category: 'Kitchen', 
            rating: 4.6, 
            reviews: 167, 
            image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            isNew: false,
            discount: 20,
            stock: 22,
            description: 'Powerful degreaser for stovetops, ovens and range hoods.'
          },
          { 
            id: 6, 
            name: 'Organic All-Purpose Cleaner', 
            price: 10.99, 
            category: 'Eco-Friendly', 
            rating: 4.9, 
            reviews: 312, 
            image: 'https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            isNew: true,
            discount: 0,
            stock: 15,
            description: 'USDA certified organic formula. Safe for kids and pets.'
          },
          { 
            id: 7, 
            name: 'Antibacterial Disinfectant', 
            price: 11.99, 
            category: 'Disinfectants', 
            rating: 4.4, 
            reviews: 98, 
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            isNew: false,
            discount: 5,
            stock: 37,
            description: 'Kills 99.9% of bacteria and viruses. EPA registered.'
          },
          { 
            id: 8, 
            name: 'Wood Polish & Conditioner', 
            price: 14.99, 
            category: 'Floor Care', 
            rating: 4.8, 
            reviews: 76, 
            image: 'https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            isNew: true,
            discount: 0,
            stock: 28,
            description: 'Restores shine and protects wood surfaces. Beeswax formula.'
          }
        ];

        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Manejar búsqueda desde URL
  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const searchQuery = params.get('search');
      if (searchQuery) {
        setSearchTerm(searchQuery);
        filterProducts(searchQuery, selectedCategory, priceRange);
      }
    }
  }, [location.search]);

  // Filtrar y ordenar productos
  useEffect(() => {
    filterProducts(searchTerm, selectedCategory, priceRange);
  }, [searchTerm, selectedCategory, priceRange, sortOption, products]);

  const filterProducts = (term, category, range) => {
    let result = [...products];

    // Filtrar por término de búsqueda
    if (term) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (category !== 'All') {
      result = result.filter(product => product.category === category);
    }

    // Filtrar por rango de precio
    result = result.filter(product => 
      product.price >= range[0] && product.price <= range[1]
    );

    // Ordenar productos
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.isNew - a.isNew);
        break;
      default: // 'featured'
        result.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
    }

    setFilteredProducts(result);
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange([0, 100]);
    setSortOption('featured');
  };

  return (
    <div className="products-page">
      <Header />
      
      <Container className="py-5">
        {/* Encabezado y controles */}
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <h1 className="mb-0">Our Cleaning Products</h1>
          </Col>
          <Col md={6} className="d-flex justify-content-md-end mt-3 mt-md-0">
            {isAdmin() && (
              <Button as={Link} to="/admin/products" variant="primary" className="me-3">
                Manage Products
              </Button>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown">
                Sort: {sortOption === 'featured' ? 'Featured' : 
                      sortOption === 'price-low' ? 'Price: Low to High' :
                      sortOption === 'price-high' ? 'Price: High to Low' :
                      sortOption === 'rating' ? 'Top Rated' : 'Newest'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item active={sortOption === 'featured'} onClick={() => setSortOption('featured')}>
                  Featured
                </Dropdown.Item>
                <Dropdown.Item active={sortOption === 'price-low'} onClick={() => setSortOption('price-low')}>
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item active={sortOption === 'price-high'} onClick={() => setSortOption('price-high')}>
                  Price: High to Low
                </Dropdown.Item>
                <Dropdown.Item active={sortOption === 'rating'} onClick={() => setSortOption('rating')}>
                  Top Rated
                </Dropdown.Item>
                <Dropdown.Item active={sortOption === 'newest'} onClick={() => setSortOption('newest')}>
                  Newest
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row>
          {/* Sidebar de filtros */}
          <Col lg={3} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">
                    <FaFilter className="me-2" /> Filters
                  </h5>
                  {(searchTerm || selectedCategory !== 'All' || priceRange[0] > 0 || priceRange[1] < 100) && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={resetFilters}
                      className="text-danger p-0"
                    >
                      <FaTimes className="me-1" /> Reset
                    </Button>
                  )}
                </div>

                {/* Buscar productos */}
                <Form.Group className="mb-4">
                  <Form.Label>Search</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Product name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup>
                      <FaSearch />
                    </InputGroup>
                  </InputGroup>
                </Form.Group>

                {/* Filtro por categoría */}
                <Form.Group className="mb-4">
                  <Form.Label>Category</Form.Label>
                  <Form.Select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Filtro por precio */}
                <Form.Group className="mb-4">
                  <Form.Label>Price Range</Form.Label>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span className="mx-2">-</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <div className="px-2">
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="100"
                      step="1"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                    />
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="100"
                      step="1"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                    />
                  </div>
                </Form.Group>

                {/* Resumen de filtros */}
                <div className="filter-summary small text-muted">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Lista de productos */}
          <Col lg={9}>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading products...</p>
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : filteredProducts.length === 0 ? (
              <Card className="text-center py-5">
                <Card.Body>
                  <h5>No products found</h5>
                  <p className="text-muted mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button variant="primary" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row className="g-4">
                {filteredProducts.map(product => (
                  <Col key={product.id} md={6} xl={4}>
                    <Card className="h-100 product-card shadow-sm">
                      <div className="product-image-wrapper">
                        <Card.Img variant="top" src={product.image} />
                        {product.isNew && (
                          <Badge bg="success" className="position-absolute top-0 start-0 m-2">
                            New
                          </Badge>
                        )}
                        {product.discount > 0 && (
                          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text className="text-muted small mb-2">
                          {product.category}
                        </Card.Text>
                        <Card.Text className="mb-3">
                          {product.description}
                        </Card.Text>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'}
                                size={14}
                              />
                            ))}
                            <span className="ms-2 small text-muted">({product.reviews})</span>
                          </div>
                          <div>
                            {product.discount > 0 ? (
                              <>
                                <span className="text-danger fw-bold me-2">
                                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                </span>
                                <span className="text-decoration-line-through text-muted small">
                                  ${product.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="fw-bold">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" className="flex-grow-1">
                            <FaShoppingCart className="me-2" /> Add to Cart
                          </Button>
                          <Button as={Link} to={`/products/${product.id}`} variant="primary">
                            View
                          </Button>
                        </div>
                        {product.stock < 10 && product.stock > 0 && (
                          <div className="text-warning small mt-2">
                            Only {product.stock} left in stock!
                          </div>
                        )}
                        {product.stock === 0 && (
                          <div className="text-danger small mt-2">
                            Out of stock
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Products;	