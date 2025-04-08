import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaUserShield, FaArrowRight } from 'react-icons/fa';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: 'viewer'
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const navigate = useNavigate();

	// Form validations
	const validateForm = () => {
		const newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!formData.name.trim()) {
			newErrors.name = 'Full name is required';
		} else if (formData.name.length < 3) {
			newErrors.name = 'Name must be at least 3 characters';
		}

		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = 'Please enter a valid email';
		}

		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});

		// Clear error when user types
		if (errors[name]) {
			setErrors({
				...errors,
				[name]: null
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitError('');

		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			// Api call simulate
			console.log('Registering user:', {
				name: formData.name,
				email: formData.email,
				password: formData.password,
				role: formData.role
			});

			await new Promise((resolve) => setTimeout(resolve, 1500));

			setSubmitSuccess(true);

			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} catch (error) {
			console.error('Registration error:', error);
			setSubmitError('Registration failed. Please try again later.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Container className="py-5">
			<Row className="justify-content-center">
				<Col md={8} lg={6}>
					<Card className="shadow-sm">
						<Card.Body className="p-4 p-md-5">
							<div className="text-center mb-4">
								<h2 className="fw-bold text-primary">Join CleanHub</h2>
								<p className="text-muted">Create your account to access our cleaning products</p>
							</div>

							{submitSuccess && (
								<Alert variant="success" className="text-center">
									Registration successful! Redirecting to login...
								</Alert>
							)}

							{submitError && (
								<Alert variant="danger" className="text-center">
									{submitError}
								</Alert>
							)}

							<Form onSubmit={handleSubmit} noValidate>
								<Form.Group className="mb-3">
									<Form.Label>Full Name</Form.Label>
									<div className="input-group">
										<span className="input-group-text">
											<FaUser />
										</span>
										<Form.Control
											type="text"
											name="name"
											value={formData.name}
											onChange={handleChange}
											isInvalid={!!errors.name}
											placeholder="Enter your full name"
										/>
										<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
									</div>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Email Address</Form.Label>
									<div className="input-group">
										<span className="input-group-text">
											<FaEnvelope />
										</span>
										<Form.Control
											type="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											isInvalid={!!errors.email}
											placeholder="Enter your email"
										/>
										<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
									</div>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Password</Form.Label>
									<div className="input-group">
										<span className="input-group-text">
											<FaLock />
										</span>
										<Form.Control
											type="password"
											name="password"
											value={formData.password}
											onChange={handleChange}
											isInvalid={!!errors.password}
											placeholder="Create a password"
										/>
										<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
									</div>
									<Form.Text className="text-muted">At least 6 characters</Form.Text>
								</Form.Group>

								<Form.Group className="mb-4">
									<Form.Label>Confirm Password</Form.Label>
									<div className="input-group">
										<span className="input-group-text">
											<FaLock />
										</span>
										<Form.Control
											type="password"
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleChange}
											isInvalid={!!errors.confirmPassword}
											placeholder="Confirm your password"
										/>
										<Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
									</div>
								</Form.Group>

								<Form.Group className="mb-4">
									<Form.Label>Account Type</Form.Label>
									<div className="input-group">
										<span className="input-group-text">
											<FaUserShield />
										</span>
										<Form.Select name="role" value={formData.role} onChange={handleChange}>
											<option value="viewer">Viewer (Browse products)</option>
											<option value="admin">Admin (Manage products)</option>
										</Form.Select>
									</div>
									<Form.Text className="text-muted">Select "Admin" only if you have an admin code</Form.Text>
								</Form.Group>

								<div className="d-grid mb-3">
									<Button variant="primary" type="submit" disabled={isSubmitting}>
										{isSubmitting ? (
											'Creating account...'
										) : (
											<>
												Create Account <FaArrowRight className="ms-2" />
											</>
										)}
									</Button>
								</div>

								<div className="text-center">
									<p className="mb-0">
										Already have an account?{' '}
										<Link to="/login" className="text-primary fw-semibold">
											Sign in
										</Link>
									</p>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Register;
