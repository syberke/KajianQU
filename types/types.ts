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
  id: string;
  email: string;
  name: string;
  role: string;
  type:string;
  created_at:string;
}

export interface muamalat_practices{
  id:string;
  created_at: string;
  student_name:string;
  student_contact:string;
  youtube_url:string;
  status:string;
  admin_notes:string;
  user_id:string;
}