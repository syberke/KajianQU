const BASE_URL = 'https://quotes.liupurnomo.com/api';

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

export const QuoteService = {

  async getRandomQuote(category?: string): Promise<Quote> {
    const url = category 
      ? `${BASE_URL}/quotes/random?category=${category}` 
      : `${BASE_URL}/quotes/random`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },


  async getQuotes(page = 1, limit = 10, category = '') {
    const url = `${BASE_URL}/quotes?page=${page}&limit=${limit}&category=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    
  
    return data; 
  }
};