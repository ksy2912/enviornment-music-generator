// Simulated API call to fetch environmental data
export const fetchEnvironmentalData = async () => {
  // In a real application, this would be an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        deforestationRate: Math.random() * 10,
        endangeredSpecies: Math.floor(Math.random() * 1000),
        airQualityIndex: Math.floor(Math.random() * 500),
      });
    }, 1000);
  });
};