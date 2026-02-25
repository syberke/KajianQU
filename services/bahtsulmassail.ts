import { supabase } from '@/lib/supabase';

export interface Question {
  id: string;
  question: string;
  answer?: string;
  reference?: string;
  asatidz_name?: string;
  category: string;
  status: 'pending' | 'answered';
  created_at: string;
}

export const BahtsulMasailService = {

  async getAllQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('id, question, category, status, created_at')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Question[];
  },


  async getQuestionDetail(id: string) {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Question;
  },


  async createQuestion(question: string, category: string, userId?: string) {
    const { data, error } = await supabase
      .from('questions')
      .insert([
        { 
          question, 
          category, 
          user_id: userId,
          status: 'pending' 
        }
      ]as any);

    if (error) throw error;
    return data;
  }
};