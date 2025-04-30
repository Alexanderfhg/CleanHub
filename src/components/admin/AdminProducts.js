// components/admin/AdminProducts.js
import { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Eco Multi-Surface Cleaner', price: 8.99, stock: 25, category: 'Surface Cleaners' },
    { id: 2, name: 'Bamboo Floor Cleaner', price: 12.99, stock: 42, category: 'Floor Care' },
    { id: 3, name: 'Streak-Free Glass Cleaner', price: 6.49, stock: 18, category: 'Glass Cleaners' },
    { id: 4, name: 'Bathroom Scrub & Shine', price: 7.99, stock: 31, category: 'Bathroom' },
    { id: 5, name: 'Degreasing Kitchen Spray', price: 9.49, stock: 22, category: 'Kitchen' },
    { id: 6, name: 'Organic All-Purpose Cleaner', price: 10.99, stock: 15, category: 'Eco-Friendly' },
    { id: 7, name: 'Antibacterial Disinfectant', price: 11.99, stock: 37, category: 'Disinfectants' },
    { id: 8, name: 'Wood Polish & Conditioner', price: 14.99, stock: 28, category: 'Floor Care' }
  ]);

  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: ''
  });

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar/actualizar producto
    setShowModal(false);
  };

  console.log(products)

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h4>Manage Products</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Add Product
        </Button>
      </div>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
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

      {/* Modal para agregar/editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct.id ? 'Edit' : 'Add'} Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                value={currentProduct.price}
                onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                required
                value={currentProduct.stock}
                onChange={(e) => setCurrentProduct({...currentProduct, stock: e.target.value})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProducts;