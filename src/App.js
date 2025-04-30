import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import About from './pages/About/About';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Admin from './pages/admin/Admin';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/products" element={<Products />} />
					<Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
