import React, { useState, useEffect } from 'react';

const GenerateBtn = () => {
    const [usd, setUsd] = useState(1);
    const [inr, setInr] = useState(0);
    const [rate, setRate] = useState(0);

    useEffect(() => {
        // Fetch the exchange rate from a public API
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => response.json())
            .then(data => setRate(data.rates.INR))
            .catch(error => console.error('Error fetching exchange rate:', error));
    }, []);

    useEffect(() => {
        setInr((usd * rate).toFixed(2));
    }, [usd, rate]);

    return (
        <div>
            <hr />
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-3xl text-center mb-4">Try it, <span className='text-green-600'>Convert dollor to</span> <span className='text-orange-500'>Rupess</span></h1>
                <div className="w-full max-w-xs">
                    <label className="block text-gray-700 text-sm font-bold mb-2">USD:</label>
                    <input 
                        type="number" 
                        value={usd} 
                        onChange={(e) => setUsd(e.target.value)} 
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    />
                    <p className="mt-4 text-lg font-semibold">INR: <span className="text-green-600">{inr}</span></p>
                </div>
            </div>
        </div>
    );
};

export default GenerateBtn;