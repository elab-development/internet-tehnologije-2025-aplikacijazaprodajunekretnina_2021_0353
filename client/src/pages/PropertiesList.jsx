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
                setError("Nije moguće učitati podatke sa servera. Prikazujem demo podatke.");

                // Fallback demo data
                const dummyData = [
                    {
                        id: 1,
                        title: "Luksuzan stan u centru",
                        description: "Prelep, svetao stan sa pogledom na grad.",
                        price: 250000,
                        status: "available",
                        address: "Knez Mihailova 1",
                        city: "Beograd",
                        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    },
                    {
                        id: 2,
                        title: "Porodična kuća sa dvorištem",
                        description: "Kuća pogodna za porodicu, na periferiji.",
                        price: 180000,
                        status: "sold",
                        address: "Zemunska 12",
                        city: "Zemun",
                        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    }
                ];
                setProperties(dummyData);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista Nekretnina</h1>
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
