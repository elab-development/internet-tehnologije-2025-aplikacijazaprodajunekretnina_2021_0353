import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Kontrolna Tabla</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Ukupno Nekretnina</h2>
                    <p className="text-4xl font-bold text-blue-600">120</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Aktivni Klijenti</h2>
                    <p className="text-4xl font-bold text-green-600">45</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Nedavne Interakcije</h2>
                    <p className="text-4xl font-bold text-purple-600">12</p>
                </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Aktivnosti</h2>
                <p className="text-gray-600">Ovo je vaša centralna tačka za praćenje CRM aktivnosti. Podaci za sada nisu povezani sa backendom.</p>
            </div>
        </div>
    );
};

export default Dashboard;
