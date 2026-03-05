import { supabase } from '../lib/supabase'; 

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dkzklcr1a/image/upload';
const UPLOAD_PRESET = 'foto_product';

export type Donation = {
  amount: number;
  purpose_id: string;
  payment_method: string;
  proof_url: string;
  donor_name: string;     
  donor_contact: string;   
  status?: string;
};

export const donationService = {
  uploadImage: async (uri: string) => {
    const data = new FormData();
    const fileType = uri.split('.').pop();
    
    data.append('file', {
      uri: uri,
      type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
      name: `upload.${fileType}`,
    } as any);
    
    data.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error?.message || 'Gagal upload ke Cloudinary');
      
      return result.secure_url;
    } catch (err) {
      console.error('Cloudinary Error:', err);
      throw err;
    }
  },

  submitDonation: async (payload: Donation) => {
    // Kita coba ambil user secara opsional (jika sedang login)
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('donations')
      .insert([
        {
          ...payload,
          user_id: user?.id || null, // Jika tidak login, biarkan null
          status: "pending"
        }
      ]as any)
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      throw error;
    }
    return data;
  }
};