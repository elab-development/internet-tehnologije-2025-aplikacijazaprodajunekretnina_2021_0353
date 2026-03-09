import React, { useState, useEffect } from 'react';
import { getDashboardStats, getExchangeRates, getUnsplashImage } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        propertyCount: 0,
        clientCount: 0,
        interactionCount: 0
    });
    const [rates, setRates] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, ratesData, imageData] = await Promise.all([
                    getDashboardStats(),
                    getExchangeRates(),
                    getUnsplashImage('luxury home')
                ]);
                setStats(statsData);
                setRates(ratesData);
                setImage(imageData);
            } catch (error) {
                console.error("Greška pri dohvatanju podataka:", error);
                if (error.response && error.response.status === 401) {
                    // Ako je token istekao ili nevažeći, on se briše
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Kontrolna Tabla</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-b-4 border-blue-500">
                    <h2 className="text-xl font-semibold mb-2">Ukupno Nekretnina</h2>
                    <p className="text-4xl font-bold text-blue-600">{loading ? '...' : stats.propertyCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-b-4 border-green-500">
                    <h2 className="text-xl font-semibold mb-2">Aktivni Klijenti</h2>
                    <p className="text-4xl font-bold text-green-600">{loading ? '...' : stats.clientCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-b-4 border-purple-500">
                    <h2 className="text-xl font-semibold mb-2">Nedavne Interakcije</h2>
                    <p className="text-4xl font-bold text-purple-600">{loading ? '...' : stats.interactionCount}</p>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Trenutni Kursevi (EUR)</h2>
                    {rates ? (
                        <div className="space-y-2">
                            <p className="text-gray-700">USD: <span className="font-bold">{rates.rates.USD}</span></p>
                            <p className="text-gray-700">RSD: <span className="font-bold">{rates.rates.RSD}</span></p>
                            <p className="text-xs text-gray-400 mt-2 italic">Podaci povučeni putem eksternog API-ja (ExchangeRate-API)</p>
                        </div>
                    ) : (
                        <p className="text-gray-400 italic">Učitavanje kursne liste...</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Inspiracija Dana</h2>
                    {image ? (
                        <div>
                            <img src={image.image || image[0]?.urls?.regular} alt="Real Estate" className="w-full h-48 object-cover rounded-md mb-2" />
                            <p className="text-xs text-gray-400 italic">Slika povučena putem eksternog API-ja (Unsplash API)</p>
                        </div>
                    ) : (
                        <div className="w-full h-48 bg-gray-100 animate-pulse rounded-md"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
