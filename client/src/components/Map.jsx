import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const center = [44.8125, 20.4612]; // Beograd center

const Map = ({ properties = [] }) => {
    return (
        <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md border border-gray-200">
            <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {properties.map((prop, idx) => (
                    <Marker
                        key={prop.id || idx}
                        position={[
                            44.8125 + (Math.random() - 0.5) * 0.05,
                            20.4612 + (Math.random() - 0.5) * 0.05
                        ]}
                    >
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold">{prop.title}</h3>
                                <p className="text-sm">{prop.price.toLocaleString()} €</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default React.memo(Map);

