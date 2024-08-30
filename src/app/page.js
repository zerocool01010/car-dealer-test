"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  /* const [filter, setFilter] = useState(''); */
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    async function fetchVehicleTypes() {
      try {
        const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
        const data = await response.json();
        setVehicleTypes(data.Results || []);
        
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
    }
    
    fetchVehicleTypes();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  const isNextButtonDisabled = !selectedVehicleType || !selectedYear;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Filter Page</h1>
      
      {/* <input
        type="text"
        placeholder="Type to filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full max-w-md"
      /> */}

      <select
        value={selectedVehicleType}
        onChange={(e) => setSelectedVehicleType(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full max-w-md bg-slate-700"
      >
        <option value="">Select Vehicle Type</option>
        {vehicleTypes.map((type) => (
          <option key={type.MakeId} value={type.MakeId}>
            {type.MakeName}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full max-w-md bg-slate-700"
      >
        <option value="">Select Model Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <Link href={`/result/${selectedVehicleType}/${selectedYear}`}>
        <button
          className={`mt-4 px-4 py-2 rounded ${
            isNextButtonDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={isNextButtonDisabled}
        >
          Next
        </button>
      </Link>
    </div>
  );
}
