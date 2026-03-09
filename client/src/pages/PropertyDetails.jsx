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
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">{property.title}</h1>
                            <div className="flex gap-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {property.status === 'available' ? 'SLOBODNO' : 'PRODATO'}
                                </span>
                                <span className="text-gray-500 flex items-center gap-1">
                                    📍 {property.location}
                                </span>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-3">
                            <span className="text-3xl font-bold text-blue-600 whitespace-nowrap">
                                {property.price.toLocaleString()} €
                            </span>

                            {/* Management Buttons */}
                            {(JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' ||
                                (JSON.parse(localStorage.getItem('user') || '{}').role === 'agent' && property.userId === JSON.parse(localStorage.getItem('user') || '{}').id)) && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/properties/edit/${id}`)}
                                            className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-4 py-2 rounded-lg font-semibold transition-colors"
                                        >
                                            Izmeni
                                        </button>
                                        <button
                                            onClick={async () => {
                                                if (window.confirm('Da li ste sigurni da želite da obrišete ovu nekretninu?')) {
                                                    try {
                                                        const { deleteProperty } = await import('../services/api');
                                                        await deleteProperty(id);
                                                        navigate('/properties');
                                                    } catch (err) {
                                                        alert('Greška pri brisanju!');
                                                    }
                                                }
                                            }}
                                            className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg font-semibold transition-colors"
                                        >
                                            Obriši
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>

                    <div className="border-t border-b py-6 mb-6">
                        <h2 className="text-xl font-semibold mb-3">Opis</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {property.description}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <h2 className="text-xl font-semibold mb-4">Kontakt Agent</h2>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                {property.agent?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{property.agent?.name || 'Nepoznat Agent'}</p>
                                <p className="text-gray-500">{property.agent?.email || 'Nema emaila'}</p>
                            </div>
                        </div>

                        {JSON.parse(localStorage.getItem('user') || '{}').role === 'klijent' && (
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const message = e.target.message.value;
                                if (!message) return;
                                try {
                                    const { createInteraction } = await import('../services/api');
                                    await createInteraction({
                                        type: 'upit',
                                        notes: message,
                                        propertyId: property.id,
                                        agentId: property.userId // Agenta koji drži oglas
                                    });
                                    alert('Upit je uspešno poslat!');
                                    e.target.reset();
                                } catch (err) {
                                    alert('Greška pri slanju upita.');
                                }
                            }}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pošalji poruku agentu</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="3"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3"
                                    placeholder="Zanimam se za ovu nekretninu..."
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Pošalji upit
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
