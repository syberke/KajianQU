export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayat {
  number: number;
  text: string;
  tafsir?: string;
  translation: string;
  numberInSurah: number;
}

export interface Bookmark {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

export interface SearchResult {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  type:string;
  created_at:string;
}