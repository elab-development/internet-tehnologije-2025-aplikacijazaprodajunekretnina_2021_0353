import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import { getPropertyById, updateProperty } from '../services/api';

const EditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getPropertyById(id);
                setProperty(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Nije moguće učitati podatke o nekretnini.");
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleSubmit = async (formData) => {
        setSubmitting(true);
        setError(null);
        try {
            await updateProperty(id, formData);
            navigate(`/properties/${id}`);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Došlo je do greške pri izmeni.");
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-20">Učitavanje...</div>;

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Izmena Nekretnine</h1>
                <p className="text-gray-500">Ažurirajte informacije o nekretnini #{id}.</p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Greška</p>
                    <p>{error}</p>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <PropertyForm
                    initialData={property}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate(`/properties/${id}`)}
                    loading={submitting}
                />
            </div>
        </div>
    );
};

export default EditProperty;
