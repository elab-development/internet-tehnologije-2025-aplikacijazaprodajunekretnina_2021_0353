import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import Map from '../components/Map';
import { getProperties } from '../services/api';

const PropertiesList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties();
                setProperties(data);
                setLoading(false);
            } catch (err) {
                console.error("Greška pri dohvatanju nekretnina:", err);

                // Ako je greška 401 ili 403, ne prikazujemo demo podatke već izbacujemo grešku
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    setError("Nemate ovlašćenje za pregled ovih podataka. Molimo prijavite se ponovo.");
                    setLoading(false);
                    return;
                }

                setError("Nije moguće učitati podatke sa servera. Prikazujem demo podatke.");

                // Fallback demo data (samo za mrežne greške ili pad baze)
                const dummyData = [
                    {
                        id: 1,
                        title: "Luksuzan stan u centru",
                        description: "Prelep, svetao stan sa pogledom na grad.",
                        price: 250000,
                        status: "available",
                        address: "Knez Mihailova 1",
                        city: "Beograd",
                        // Korišćenje direktnog linka koji sigurno radi
                        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        id: 2,
                        title: "Porodična kuća sa dvorištem",
                        description: "Kuća pogodna za porodicu, na periferiji.",
                        price: 180000,
                        status: "sold",
                        address: "Zemunska 12",
                        city: "Zemun",
                        imageUrl: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80"
                    }
                ];
                setProperties(dummyData);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const canManage = user.role === 'admin' || user.role === 'agent';

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Lista Nekretnina</h1>
                {canManage && (
                    <button
                        onClick={() => window.location.href = '/properties/add'}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                    >
                        <span className="text-xl">+</span> Dodaj Nekretninu
                    </button>
                )}
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
                                {properties.map(property => (
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
