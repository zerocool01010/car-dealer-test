import React, { Suspense } from 'react';

const Loading = () => <div className='bg-red-800 p-8 rounded-xl border-radi font-extrabold'>Loading vehicle models...</div>;

const VehicleModels = async ({ makeId, year }) => {
  try {
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.Message || 'Failed to fetch data');
    }

    const vehicleModels = data || [];

    console.log(vehicleModels.Count)
    console.log(vehicleModels)
    
    if (vehicleModels.Count < 1) {
      return <>
      <h1 className="text-4xl font-bold mb-4 text-red-700">No vehicle models were found</h1>
      </>
    }

    const makeName = vehicleModels.Results[0].Make_Name && vehicleModels.Results[0].Make_Name;

    return (
      <>
        <h1 className="text-4xl font-bold mb-4">Vehicle models for {makeName} in {year}</h1>
        <ul className="list-disc pl-5">
          {vehicleModels.Results.map((model) => (
            <li key={model.Model_Name} className="text-gray-700">{model.Model_Name}</li>
          ))}
        </ul>
      </>

    );
  } catch (err) {
    return <div className="text-red-500">{err.message}</div>;
  }
};

export default function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Suspense fallback={<Loading />}>
        <VehicleModels makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}
