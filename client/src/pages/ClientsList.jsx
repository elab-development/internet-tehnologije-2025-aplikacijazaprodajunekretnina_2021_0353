import React, { useState, useEffect } from 'react';
import { getClients, createClient, updateClient, deleteClient } from '../services/api';
import Modal from '../components/Modal';
import Button from '../components/Button';

const ClientsList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const data = await getClients();
            setClients(data);
            setLoading(false);
        } catch (err) {
            setError('Greška pri učitavanju klijenata.');
            setLoading(false);
        }
    };

    const handleOpenModal = (client = null) => {
        if (client) {
            setEditingClient(client);
            setFormData({ fullName: client.fullName, email: client.email, phone: client.phone });
        } else {
            setEditingClient(null);
            setFormData({ fullName: '', email: '', phone: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingClient) {
                await updateClient(editingClient.id, formData);
            } else {
                await createClient(formData);
            }
            setIsModalOpen(false);
            fetchClients();
        } catch (err) {
            alert('Greška pri čuvanju klijenta.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Da li ste sigurni da želite da obrišete ovog klijenta?')) {
            try {
                await deleteClient(id);
                fetchClients();
            } catch (err) {
                alert('Greška pri brisanju klijenta.');
            }
        }
    };

    if (loading && !clients.length) return <div className="p-8 text-center">Učitavanje...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Moji Klijenti</h1>
                <Button onClick={() => handleOpenModal()}>+ Novi Klijent</Button>
            </div>

            <div className="bg-white shadow rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ime i Prezime</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Akcije</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{client.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{client.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{client.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleOpenModal(client)} className="text-blue-600 hover:text-blue-900 mr-4">Izmeni</button>
                                    <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-900">Obriši</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingClient ? 'Izmeni klijenta' : 'Dodaj novog klijenta'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ime i Prezime</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefon</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="submit">{editingClient ? 'Sačuvaj izmene' : 'Dodaj'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ClientsList;
