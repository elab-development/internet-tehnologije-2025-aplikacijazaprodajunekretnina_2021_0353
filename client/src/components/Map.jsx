import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem'
};

const center = {
    lat: 44.8125, // Beograd center
    lng: 20.4612
};

const Map = ({ properties = [] }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'dummy_api_key_for_demo_purposes'
    });

    const apiKeyMissing = !import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY === 'dummy_api_key_for_demo_purposes';

    if (apiKeyMissing) {
        return (
            <div className="h-[400px] bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                </div>
                <p className="text-gray-500 font-medium">Google Maps API ključ nije podešen</p>
                <p className="text-gray-400 text-sm">Molimo unesite ključ u .env fajl (VITE_GOOGLE_MAPS_API_KEY)</p>
            </div>
        );
    }

    return isLoaded ? (
        <div className="shadow-md rounded-lg overflow-hidden">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
                {properties.map((prop, idx) => (
                    // In real app, properties would have lat/lng fields
                    // For demo, we just add small offsets to center
                    <Marker
                        key={prop.id || idx}
                        position={{
                            lat: 44.8125 + (Math.random() - 0.5) * 0.05,
                            lng: 20.4612 + (Math.random() - 0.5) * 0.05
                        }}
                        title={prop.title}
                    />
                ))}
            </GoogleMap>
        </div>
    ) : <div className="h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">Učitavanje mape...</div>;
};

export default React.memo(Map);
