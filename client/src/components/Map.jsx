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
        googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || "dummy_api_key_for_demo_purposes" // Fallback to avoid crash
    });

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
