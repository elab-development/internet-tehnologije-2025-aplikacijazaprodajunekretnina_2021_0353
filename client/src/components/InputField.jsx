import React from 'react';

const InputField = ({ label, id, type = 'text', value, onChange, placeholder, required = false, className = '' }) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && (
                <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default InputField;
