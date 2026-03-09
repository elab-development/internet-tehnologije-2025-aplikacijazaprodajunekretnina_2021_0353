import React, { useState, useEffect } from 'react';
import { getInteractions, createInteraction, getClients, getProperties } from '../services/api';
import Modal from '../components/Modal';
import Button from '../components/Button';

// Add getInteractions to api.js if missing
const InteractionsList = () => {
    const [interactions, setInteractions] = useState([]);
    const [clients, setClients] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: 'Poziv',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        clientId: '',
        propertyId: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [intsData, clsData, propsData] = await Promise.all([
                getInteractions(),
                getClients(),
                getProperties()
            ]);
            setInteractions(intsData);
            setClients(clsData);
            setProperties(propsData);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createInteraction(formData);
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            alert('Greška pri čuvanju interakcije.');
        }
    };

    if (loading && !interactions.length) return <div className="p-8 text-center">Učitavanje...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Interakcije sa Klijentima</h1>
                <Button onClick={() => setIsModalOpen(true)}>Nova Interakcija</Button>
            </div>

            <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tip</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klijent</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nekretnina</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beleške</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {interactions.map((interaction) => (
                            <tr key={interaction.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(interaction.date).toLocaleDateString('sr-RS')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${interaction.type === 'upit' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {interaction.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {interaction.client?.fullName || (interaction.notes?.includes('Upit od korisnika') ? interaction.notes.split(':')[0].replace('Upit od korisnika ', '') : 'Anoniman')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interaction.property?.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interaction.agent?.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={interaction.notes}>{interaction.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Zabeleži novu interakciju">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tip</label>
                            <select
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Poziv">Poziv</option>
                                <option value="Sastanak">Sastanak</option>
                                <option value="Email">Email</option>
                                <option value="Drugo">Drugo</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Datum</label>
                            <input
                                type="date"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Klijent</label>
                        <select
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            value={formData.clientId}
                            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                        >
                            <option value="">Izaberi klijenta (opciono)</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.fullName}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nekretnina</label>
                        <select
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            value={formData.propertyId}
                            onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                        >
                            <option value="">Izaberi nekretninu (opciono)</option>
                            {properties.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Beleške</label>
                        <textarea
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows="3"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button type="submit">Sačuvaj</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default InteractionsList;
