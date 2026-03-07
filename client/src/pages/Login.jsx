import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { login } from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const data = await login(formData);
            console.log('Login uspešan:', data);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
            window.location.reload(); // Da bi Navbar video promenu odmah
        } catch (err) {
            console.error('Greška pri logovanju:', err);
            setError('Pogrešan e-mail ili lozinka. Ili server nije dostupan.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Prijava</h2>
                {error && <div className="mb-4 text-red-600 text-sm bg-red-100 p-2 rounded">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="vas@email.com"
                        required
                    />
                    <InputField
                        label="Lozinka"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="********"
                        required
                    />
                    <Button type="submit" variant="primary" className="w-full mt-4" disabled={isLoading}>
                        {isLoading ? 'Prijavljivanje...' : 'Prijavi se'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
