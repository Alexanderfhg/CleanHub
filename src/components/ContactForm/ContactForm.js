import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import './ContactForm.css';

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: 'Consulta General',
		message: ''
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	// Validations
	const validateForm = () => {
		const newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!formData.name.trim()) newErrors.name = 'Por favor ingresa tu nombre';
		if (!formData.email) {
			newErrors.email = 'Por favor ingresa tu correo electrónico';
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = 'Correo electrónico no válido';
		}
		if (!formData.message.trim()) newErrors.message = 'Por favor escribe tu mensaje';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});

		// Clean errors while typing
		if (errors[name]) {
			setErrors({
				...errors,
				[name]: null
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);

		// Simulate api set
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setSubmitSuccess(true);
			setFormData({
				name: '',
				email: '',
				subject: 'Consulta General',
				message: ''
			});
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="shadow-sm contact-form-card">
			<Card.Body>
				<h3 className="mb-4 text-center">
					<FaPaperPlane className="me-2 text-primary" />
					Envíanos un Mensaje
				</h3>

				{submitSuccess && (
					<Alert variant="success" className="d-flex align-items-center">
						<FaCheckCircle className="me-2" />
						¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
					</Alert>
				)}

				<Form onSubmit={handleSubmit} noValidate>
					<Form.Group className="mb-3">
						<Form.Label>Nombre Completo</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							isInvalid={!!errors.name}
							placeholder="Ej: María González"
						/>
						<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Correo Electrónico</Form.Label>
						<Form.Control
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							isInvalid={!!errors.email}
							placeholder="Ej: ejemplo@correo.com"
						/>
						<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Asunto</Form.Label>
						<Form.Select name="subject" value={formData.subject} onChange={handleChange}>
							<option>Consulta General</option>
							<option>Soporte Técnico</option>
							<option>Información de Productos</option>
							<option>Otro</option>
						</Form.Select>
					</Form.Group>

					<Form.Group className="mb-4">
						<Form.Label>Mensaje</Form.Label>
						<Form.Control
							as="textarea"
							rows={4}
							name="message"
							value={formData.message}
							onChange={handleChange}
							isInvalid={!!errors.message}
							placeholder="Escribe tu mensaje aquí..."
						/>
						<Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
					</Form.Group>

					<div className="d-grid">
						<Button
							variant="primary"
							type="submit"
							disabled={isSubmitting}
							className="d-flex align-items-center justify-content-center gap-2"
						>
							{isSubmitting ? (
								<>
									<span className="spinner-border spinner-border-sm" />
									Enviando...
								</>
							) : (
								<>
									<FaPaperPlane />
									Enviar Mensaje
								</>
							)}
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default ContactForm;
