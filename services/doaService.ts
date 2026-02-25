export const doaService = {
  getDoas: async (grup?: string) => {
    try {
      let url = 'https://equran.id/api/doa';
      if (grup) url += `?grup=${encodeURIComponent(grup)}`;

      const response = await fetch(url);
      const result = await response.json();

      // Sesuai respons JSON yang kamu berikan: data ada di result.data
      if (result.status === "success" && result.data) {
        return result.data;
      }
      return [];
    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  }
};