import React, { useState } from 'react';

export default function FruitForm({ addFruit }) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addFruit({ name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Name
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="mt-1 px-3 py-2 border rounded w-full"
                    />
                </label>
            </div>
            <button 
                type="submit" 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Add fruit
            </button>
        </form>
    );
}
