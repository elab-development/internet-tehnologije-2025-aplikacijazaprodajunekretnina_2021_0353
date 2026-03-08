import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200">
                {property.imageUrl ? (
                    <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500">No Image</div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-2 truncate">{property.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-bold">{property.price.toLocaleString()} €</span>
                    <Link
                        to={`/properties/${property.id}`}
                        className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                    >
                        Pogledaj detalje
                    </Link>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                    📍 {property.location || (property.address ? `${property.address}, ${property.city}` : 'Nepoznata lokacija')}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
