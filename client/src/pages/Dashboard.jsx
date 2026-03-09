import React, { useState, useEffect } from 'react';
import { getDashboardStats, getExchangeRates, getUnsplashImage } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const chartData = [
        { name: 'Nekretnine', value: stats.propertyCount, color: '#3B82F6' },
        { name: 'Klijenti', value: stats.clientCount, color: '#10B981' },
        { name: 'Interakcije', value: stats.interactionCount, color: '#8B5CF6' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Kontrolna Tabla</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Ukupno Nekretnina</h2>
                    <p className="text-4xl font-extrabold text-blue-600">{loading ? '...' : stats.propertyCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Aktivni Klijenti</h2>
                    <p className="text-4xl font-extrabold text-green-600">{loading ? '...' : stats.clientCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Ukupno Interakcija</h2>
                    <p className="text-4xl font-extrabold text-purple-600">{loading ? '...' : stats.interactionCount}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Vizuelizacija podataka */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-6 text-gray-800">Pregled Aktivnosti</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Inspiracija Dana</h2>
                        {image ? (
                            <div className="relative group">
                                <img src={image.image || image[0]?.urls?.regular} alt="Real Estate" className="w-full h-40 object-cover rounded-lg mb-2 shadow-inner" />
                                <div className="absolute bottom-4 left-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    Unsplash API
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-40 bg-gray-100 animate-pulse rounded-lg"></div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Devizni Kurs (EUR)</h2>
                        {rates ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <span className="text-xs text-gray-500 block uppercase">USD</span>
                                    <span className="text-xl font-bold text-gray-800">{rates.rates.USD}</span>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <span className="text-xs text-gray-500 block uppercase">RSD</span>
                                    <span className="text-xl font-bold text-gray-800">{rates.rates.RSD}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-16 bg-gray-100 animate-pulse rounded-lg"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
