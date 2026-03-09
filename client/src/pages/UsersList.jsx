import React, { useState, useEffect } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../services/api';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Samo administrator može videti listu korisnika.');
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            fetchUsers(); // Refresh the list after role change
        } catch (err) {
            alert('Greška pri promeni role.');
            console.error('Error updating user role:', err);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
            try {
                await deleteUser(userId);
                fetchUsers(); // Refresh the list after deletion
            } catch (err) {
                alert('Greška pri brisanju korisnika.');
                console.error('Error deleting user:', err);
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-600">Učitavanje korisnika...</div>;
    if (error) return <div className="p-8 text-center text-red-500 font-semibold">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Upravljanje Agentima i Korisnicima</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-100">
                <ul className="divide-y divide-gray-200">
                    {users.map((user) => (
                        <li key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <select
                                    value={user.role?.name || 'agent'}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    className="text-sm border border-gray-300 rounded p-1 bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="agent">Agent</option>
                                    <option value="klijent">Klijent</option>
                                </select>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="text-red-400 hover:text-red-600 p-2 transition-colors"
                                    title="Obriši korisnika"
                                >
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UsersList;
