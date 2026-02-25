
import { supabase } from '../lib/supabase'; 

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dkzklcr1a/image/upload';
const UPLOAD_PRESET = 'foto_product';
export type Donation = {
  amount: number;
  purpose_id: string;
  payment_method: string;
  proof_url: string;
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
    console.log("Memulai fetch ke Cloudinary...");
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Cloudinary Error Detail:', result);
      throw new Error(result.error?.message || 'Gagal upload ke Cloudinary');
    }

    console.log("Upload Cloudinary Berhasil:", result.secure_url);
    return result.secure_url;
  } catch (err) {
    console.error('Network/Fetch Error:', err);
    throw err;
  }
},

submitDonation: async (payload: Donation) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User belum login");
  }

  const { data, error } = await supabase
    .from('donations')
    .insert([
      {
        ...payload,
        user_id: user.id,
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