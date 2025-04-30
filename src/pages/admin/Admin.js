// pages/Admin.js
import { useState, useContext } from 'react';
import { Tab, Tabs, Container, Row, Col, Card } from 'react-bootstrap';
import { FaChartLine, FaBox, FaUsers } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import AdminProducts from '../../components/admin/AdminProducts';
import AdminUsers from '../../components/admin/AdminUsers';
import './Admin.css';

const Admin = () => {
	const { user } = useContext(AuthContext);
	const [activeTab, setActiveTab] = useState('dashboard');

	if (!user || user.role !== 'admin') {
		return (
			<Container className="my-5 text-center">
				<h2>Access Denied</h2>
				<p>You don't have permission to view this page.</p>
			</Container>
		);
	}

	const renderContent = () => {
		switch (activeTab) {
			case 'dashboard':
				return (
					<>
						<h2 className="mb-4">Dashboard</h2>
						<Row className="g-4">
							<Col md={4}>
								<Card className="stat-card">
									<Card.Body>
										<h5>Total Products</h5>
										<h2 className="text-primary">8</h2>
										<small>+12% from last month</small>
									</Card.Body>
								</Card>
							</Col>
							<Col md={4}>
								<Card className="stat-card">
									<Card.Body>
										<h5>Total Users</h5>
										<h2 className="text-primary">2</h2>
										<small>+5 new today</small>
									</Card.Body>
								</Card>
							</Col>
							<Col md={4}>
								<Card className="stat-card">
									<Card.Body>
										<h5>Orders Today</h5>
										<h2 className="text-primary">12</h2>
										<small>3 pending</small>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</>
				);
			case 'products':
				return <AdminProducts />;
			case 'users':
				return <AdminUsers />;
			default:
				return null;
		}
	};

	return (
		<div className="admin-page">
			<Container fluid>
				<Row>
					<Col lg={2} className="sidebar bg-dark text-white p-3">
						<h4 className="mb-4">Admin Panel</h4>
						<Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="flex-column" variant="pills">
							<Tab
								eventKey="dashboard"
								title={
									<span>
										<FaChartLine className="me-2" /> Dashboard
									</span>
								}
							/>
							<Tab
								eventKey="products"
								title={
									<span>
										<FaBox className="me-2" /> Products
									</span>
								}
							/>
							<Tab
								eventKey="users"
								title={
									<span>
										<FaUsers className="me-2" /> Users
									</span>
								}
							/>
						</Tabs>
					</Col>

					<Col lg={10} className="main-content p-4">
						{renderContent()}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Admin;
