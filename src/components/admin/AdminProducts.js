import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Badge, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const AdminProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    price: '',
    category: 'Surface Cleaners',
    rating: 4.0,
    reviews: 0,
    image: '',
    is_new: false,
    discount: 0,
    stock: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generar ID aleatorio (puedes ajustar el rango según necesites)
  const generateRandomId = () => Math.floor(Math.random() * 1000000);

  // Obtener productos del backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://cleanhubback.onrender.com/products/');
        setProducts(response.data);
      } catch (err) {
        setError('Error al cargar productos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Manejar eliminación de producto
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://cleanhubback.onrender.com/products/${productId}`);
      setProducts(products.filter(p => p.id !== productId));
    } catch (err) {
      setError('Error eliminando producto: ' + err.message);
    }
  };

  // Manejar envío de formulario (crear/actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...currentProduct,
        price: parseFloat(currentProduct.price),
        stock: parseInt(currentProduct.stock),
        discount: parseInt(currentProduct.discount || 0),
        rating: parseFloat(currentProduct.rating),
        reviews: parseInt(currentProduct.reviews)
      };

      if (currentProduct.id) {
        // Actualizar producto existente
        const response = await axios.put(
          `https://cleanhubback.onrender.com/products/${currentProduct.id}`,
          productData
        );
        setProducts(products.map(p => p.id === currentProduct.id ? response.data : p));
      } else {
        // Crear nuevo producto con ID aleatorio
        const newProduct = {
          ...productData,
          id: generateRandomId()
        };
        const response = await axios.post(
          'https://cleanhubback.onrender.com/products',
          newProduct
        );
        setProducts([...products, response.data]);
      }
      
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Error guardando producto: ' + (err.response?.data?.message || err.message));
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setCurrentProduct({
      id: '',
      name: '',
      price: '',
      category: 'Surface Cleaners',
      rating: 4.0,
      reviews: 0,
      image: '',
      is_new: false,
      discount: 0,
      stock: '',
      description: ''
    });
  };

  // Manejar edición de producto
  const handleEdit = (product) => {
    setCurrentProduct({
      ...product,
      is_new: product.is_new || product.isNew
    });
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-center p-5"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <Alert variant="danger" className="m-3">{error}</Alert>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h4>Manage Products</h4>
        <Button variant="primary" onClick={() => {
          resetForm();
          setShowModal(true);
        }}>
          <FaPlus className="me-2" /> Add Product
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>
        {error}
      </Alert>}

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                {product.name}
                {(product.is_new || product.isNew) && <Badge bg="success" className="ms-2">New</Badge>}
              </td>
              <td>{product.category}</td>
              <td>
                ${product.price}
                {product.discount > 0 && (
                  <small className="text-danger ms-2">(-{product.discount}%)</small>
                )}
              </td>
              <td>{product.stock}</td>
              <td>
                {product.stock > 10 ? (
                  <Badge bg="success">In Stock</Badge>
                ) : product.stock > 0 ? (
                  <Badge bg="warning">Low Stock</Badge>
                ) : (
                  <Badge bg="danger">Out of Stock</Badge>
                )}
              </td>
              <td>
                <Button variant="link" onClick={() => handleEdit(product)}>
                  <FaEdit />
                </Button>
                <Button variant="link" className="text-danger" onClick={() => handleDelete(product.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct.id ? 'Edit' : 'Add'} Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name *</Form.Label>
                  <Form.Control
                    required
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    required
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({...currentProduct, stock: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                  >
                    <option value="Surface Cleaners">Surface Cleaners</option>
                    <option value="Floor Care">Floor Care</option>
                    <option value="Glass Cleaners">Glass Cleaners</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Eco-Friendly">Eco-Friendly</option>
                    <option value="Disinfectants">Disinfectants</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={currentProduct.image}
                    onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="100"
                    value={currentProduct.discount}
                    onChange={(e) => setCurrentProduct({...currentProduct, discount: e.target.value})}
                  />
                </Form.Group>

                <Form.Check
                  type="switch"
                  id="isNewSwitch"
                  label="Is New Product"
                  checked={currentProduct.is_new}
                  onChange={(e) => setCurrentProduct({...currentProduct, is_new: e.target.checked})}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {currentProduct.id ? 'Update' : 'Save'} Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProducts;