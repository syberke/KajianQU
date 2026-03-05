import { supabase } from '../lib/supabase';

export const muamalatService = {
  // 1. User menyetor link YouTube
  submitPractice: async (name: string, contact: string, url: string) => {
    const { data, error } = await (supabase
      .from('muamalat_practices' as any) as any) // Paksa tabel dianggap ada
      .insert({
        student_name: name,
        student_contact: contact,
        youtube_url: url,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateStatus: async (id: string, newStatus: 'pending' | 'success') => {
    const { data, error } = await (supabase
      .from('muamalat_practices' as any) as any) 
      .update({ 
        status: newStatus 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

 
  getPractices: async (onlySuccess: boolean = true) => {
    let query = (supabase
      .from('muamalat_practices' as any) as any)
      .select('*');

    if (onlySuccess) {
      query = query.eq('status', 'success');
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};