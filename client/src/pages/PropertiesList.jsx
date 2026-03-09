import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import Map from '../components/Map';
import { getProperties } from '../services/api';

const PropertiesList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties();
                setProperties(data);
                setLoading(false);
            } catch (err) {
                console.error("Greška pri dohvatanju nekretnina:", err);
                // ... same error handling as before
                setError("Nije moguće učitati podatke sa servera.");
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const filteredProperties = properties.filter(p =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const canManage = user.role === 'admin' || user.role === 'agent';

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Ponuda Nekretnina</h1>
                    <p className="text-gray-500">Pronađite vaš dom iz snova</p>
                </div>
                {canManage && (
                    <button
                        onClick={() => window.location.href = '/properties/add'}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
                    >
                        <span className="text-xl">+</span> Dodaj Oglas
                    </button>
                )}
            </div>

            <div className="mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Pretraži po naslovu ili lokaciji..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
            </div>
            {error && <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert"><p>{error}</p></div>}
            {loading ? (
                <div className="text-center py-10">Učitavanje...</div>
            ) : (
                <div className="flex flex-col gap-8">
                    <div className="w-full h-96">
                        <h2 className="text-xl font-semibold mb-4">Mapa Nekretnina</h2>
                        <Map properties={properties} />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Pregled</h2>
                        {properties.length === 0 ? (
                            <div className="text-gray-500 italic py-8 text-center bg-gray-50 rounded-lg border border-gray-200">
                                Trenutno nema dostupnih nekretnina.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProperties.map(property => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertiesList;
