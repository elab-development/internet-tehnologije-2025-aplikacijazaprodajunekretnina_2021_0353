import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload(); // OSIGURAVA da se ceo state osveži
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="text-xl font-bold tracking-tight">CRM Nekretnine</div>
                    {user && (
                        <span className="bg-blue-700 text-xs px-2 py-1 rounded text-blue-100 uppercase font-semibold">
                            {user.role}
                        </span>
                    )}
                </div>

                <div className="flex items-center space-x-6">
                    <Link to="/dashboard" className="hover:text-blue-200 transition-colors">Dashboard</Link>
                    <Link to="/properties" className="hover:text-blue-200 transition-colors">Nekretnine</Link>
                    {(user?.role === 'admin' || user?.role === 'agent') && (
                        <Link to="/clients" className="hover:text-blue-200 transition-colors">Klijenti</Link>
                    )}
                    {(user?.role === 'admin' || user?.role === 'agent') && (
                        <Link to="/interactions" className="hover:text-blue-200 transition-colors">Interakcije</Link>
                    )}
                    {user?.role === 'admin' && (
                        <Link to="/users" className="hover:text-blue-200 transition-colors">Korisnici</Link>
                    )}
                    {(user?.role === 'admin' || user?.role === 'agent') && (
                        <Link to="/properties/add" className="bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded transition-colors text-sm font-bold">
                            + Dodaj
                        </Link>
                    )}

                    {token ? (
                        <div className="flex items-center space-x-4 border-l border-blue-500 pl-4 ml-4">
                            <span className="text-sm font-medium hidden md:inline">{user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-sm"
                            >
                                Odjavi se
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-sm"
                        >
                            Prijava
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
