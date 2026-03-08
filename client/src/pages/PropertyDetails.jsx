import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../services/api';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getPropertyById(id);
                setProperty(data);
                setLoading(false);
            } catch (err) {
                console.error("Greška pri dohvatanju detalja:", err);
                setError("Nije moguće učitati detalje nekretnine.");
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) return <div className="text-center py-20">Učitavanje detalja...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!property) return <div className="text-center py-20">Nekretnina nije pronađena.</div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-blue-600 hover:underline flex items-center gap-2"
            >
                ← Nazad na listu
            </button>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-96 w-full">
                    <img
                        src={property.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-4xl font-bold text-gray-800">{property.title}</h1>
                        <span className="text-3xl font-bold text-blue-600">
                            {property.price.toLocaleString()} €
                        </span>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {property.status === 'available' ? 'SLOBODNO' : 'PRODATO'}
                        </span>
                        <span className="text-gray-500 flex items-center gap-1">
                            📍 {property.location}
                        </span>
                    </div>

                    <div className="border-t border-b py-6 mb-6">
                        <h2 className="text-xl font-semibold mb-3">Opis</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {property.description}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Kontakt Agent</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                {property.agent?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{property.agent?.name || 'Nepoznat Agent'}</p>
                                <p className="text-gray-500">{property.agent?.email || 'Nema emaila'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
