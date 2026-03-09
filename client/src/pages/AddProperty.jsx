import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import { createProperty } from '../services/api';

const AddProperty = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            await createProperty(formData);
            navigate('/properties');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Došlo je do greške pri čuvanju nekretnine.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Nova Nekretnina</h1>
                <p className="text-gray-500">Unesite detalje nove nekretnine za prodaju ili izdavanje.</p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Greška</p>
                    <p>{error}</p>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <PropertyForm
                    onSubmit={handleSubmit}
                    onCancel={() => navigate('/properties')}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default AddProperty;
