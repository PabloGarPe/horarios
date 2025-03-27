export const exitFetch = async (courseYear) => {
    try {
      const response = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/year/${courseYear}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };