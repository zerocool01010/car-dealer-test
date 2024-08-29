import React, { Suspense } from 'react';

const Loading = () => <div>Loading vehicle models...</div>;

const VehicleModels = async ({ makeId, year }) => {
  try {
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.Message || 'Failed to fetch data');
    }

    const vehicleModels = data.Results || [];

    return (
      <ul className="list-disc pl-5">
        {vehicleModels.map((model) => (
          <li key={model.Model_Name} className="text-gray-700">{model.Model_Name}</li>
        ))}
      </ul>
    );
  } catch (err) {
    return <div className="text-red-500">{err.message}</div>;
  }
};

export default function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Vehicle models for {makeId} {year}</h1>
      <Suspense fallback={<Loading />}>
        <VehicleModels makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}
