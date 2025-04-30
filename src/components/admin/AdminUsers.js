// components/admin/AdminUsers.js
import { useState } from 'react';
import { Table, Button, Form, Modal, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaUser, FaEnvelope, FaUserTag } from 'react-icons/fa';

const AdminUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([
    // Datos de ejemplo
    { 
      id: 1, 
      name: 'Admin User', 
      email: 'admin@cleanhub.com', 
      role: 'admin',
      createdAt: '2024-01-15',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'John Doe', 
      email: 'john@cleanhub.com', 
      role: 'viewer',
      createdAt: '2024-03-10',
      status: 'active'
    }
  ]);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    role: 'viewer',
    status: 'active'
  });

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar/actualizar usuario
    if (currentUser.id) {
      // Actualizar usuario existente
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
    } else {
      // Crear nuevo usuario
      const newUser = { ...currentUser, id: Date.now(), createdAt: new Date().toISOString() };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
    setCurrentUser({
      name: '',
      email: '',
      role: 'viewer',
      status: 'active'
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'inactive':
        return <Badge bg="secondary">Inactive</Badge>;
      case 'suspended':
        return <Badge bg="danger">Suspended</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h4>Manage Users</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Add User
        </Button>
      </div>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Badge bg={user.role === 'admin' ? 'primary' : 'info'}>
                  {user.role}
                </Badge>
              </td>
              <td>{getStatusBadge(user.status)}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="link" onClick={() => handleEdit(user)}>
                  <FaEdit />
                </Button>
                <Button 
                  variant="link" 
                  className="text-danger" 
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser.id ? 'Edit' : 'Add'} User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaUser className="me-2" /> Full Name
              </Form.Label>
              <Form.Control
                required
                value={currentUser.name}
                onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope className="me-2" /> Email
              </Form.Label>
              <Form.Control
                type="email"
                required
                value={currentUser.email}
                onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaUserTag className="me-2" /> Role
              </Form.Label>
              <Form.Select
                value={currentUser.role}
                onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}
              >
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={currentUser.status}
                onChange={(e) => setCurrentUser({...currentUser, status: e.target.value})}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {currentUser.id ? 'Update' : 'Create'} User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUsers;