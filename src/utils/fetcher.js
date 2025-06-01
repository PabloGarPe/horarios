export const exitFetch = async (uo) => {
    try {
      const response = await fetch( `https://horariospceo.ingenieriainformatica.uniovi.es/schedule/userSchedule/${encodeURIComponent(uo.split('@')[0])}`, {
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
      throw error;
    }
  };