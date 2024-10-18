import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EnvironmentalData {
  deforestationRate: number;
  endangeredSpecies: number;
  airQualityIndex: number;
}

interface Props {
  data: EnvironmentalData;
}

const EnvironmentalDataVisualizer: React.FC<Props> = ({ data }) => {
  const chartData = [
    { name: 'Deforestation', value: data.deforestationRate },
    { name: 'Endangered Species', value: data.endangeredSpecies },
    { name: 'Air Quality Index', value: data.airQualityIndex },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Environmental Data</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnvironmentalDataVisualizer;