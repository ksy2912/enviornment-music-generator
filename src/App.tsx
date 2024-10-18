import React, { useState, useEffect } from 'react';
import { TreeDeciduous, Fish, Wind } from 'lucide-react';
import EnvironmentalDataVisualizer from './components/EnvironmentalDataVisualizer';
import MusicGenerator from './components/MusicGenerator';
import { fetchEnvironmentalData } from './utils/api';

function App() {
  const [environmentalData, setEnvironmentalData] = useState({
    deforestationRate: 0,
    endangeredSpecies: 0,
    airQualityIndex: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEnvironmentalData();
      setEnvironmentalData(data);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-200 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-8">AI-Enhanced Environmental Music Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <EnvironmentalDataVisualizer data={environmentalData} />
        <MusicGenerator data={environmentalData} />
      </div>
      <div className="mt-8 flex space-x-4">
        <div className="flex items-center">
          <TreeDeciduous className="text-green-600 mr-2" />
          <span>Deforestation</span>
        </div>
        <div className="flex items-center">
          <Fish className="text-blue-600 mr-2" />
          <span>Endangered Species</span>
        </div>
        <div className="flex items-center">
          <Wind className="text-gray-600 mr-2" />
          <span>Air Quality</span>
        </div>
      </div>
    </div>
  );
}

export default App;