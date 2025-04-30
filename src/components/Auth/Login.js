import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';

const Login = () => {
	// En el componente Login, agregar al estado inicial:
	const [formData, setFormData] = useState({
		email: localStorage.getItem('rememberedEmail') || '',
		password: '',
		rememberMe: false
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	// Form Validate
	const validateForm = () => {
		const newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = 'Please enter a valid email';
		}

		if (!formData.password) {
			newErrors.password = 'Password is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
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
			// Simulación de llamada a API
			console.log('Logging in user:', {
				email: formData.email,
				password: formData.password
			});

			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Datos simulados de respuesta
			const mockUser = {
				id: '123',
				name: 'Test User',
				email: formData.email,
				role: formData.email.includes('admin') ? 'admin' : 'viewer',
				token: 'mock-jwt-token'
				// Agregar más campos si es necesario
			};

			// Guardar en localStorage si "rememberMe" está activado
			if (formData.rememberMe) {
				localStorage.setItem('rememberedEmail', formData.email);
			} else {
				localStorage.removeItem('rememberedEmail');
			}

			// Llamar a la función login del contexto
			login(mockUser);

			// Redirigir según el rol
			const redirectPath = mockUser.role === 'admin' ? '/admin' : '/products';
			navigate(redirectPath);
		} catch (error) {
			console.error('Login error:', error);
			setSubmitError('Invalid email or password. Please try again.');
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
								<h2 className="fw-bold text-primary">Welcome Back to CleanHub</h2>
								<p className="text-muted">Sign in to manage your cleaning products</p>
							</div>

							{submitError && (
								<Alert variant="danger" className="text-center">
									{submitError}
								</Alert>
							)}

							<Form onSubmit={handleSubmit} noValidate>
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
											placeholder="Enter your password"
										/>
										<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
									</div>
									<div className="d-flex justify-content-end mt-2">
										<Link to="/forgot-password" className="text-primary small">
											Forgot password?
										</Link>
									</div>
								</Form.Group>

								<Form.Group className="mb-4">
									<Form.Check
										type="checkbox"
										id="rememberMe"
										name="rememberMe"
										label="Remember me"
										checked={formData.rememberMe}
										onChange={handleChange}
									/>
								</Form.Group>

								<div className="d-grid mb-3">
									<Button variant="primary" type="submit" disabled={isSubmitting}>
										{isSubmitting ? (
											'Signing in...'
										) : (
											<>
												Sign In <FaSignInAlt className="ms-2" />
											</>
										)}
									</Button>
								</div>

								<div className="text-center">
									<p className="mb-0">
										Don't have an account?{' '}
										<Link to="/register" className="text-primary fw-semibold">
											Create one
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

export default Login;
