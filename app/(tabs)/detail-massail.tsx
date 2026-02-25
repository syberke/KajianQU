import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, BookOpen, Quote } from 'lucide-react-native';


const DUMMY_LIST = [
  {
    id: "1",
    question: "Bagaimana hukum melakukan transaksi kripto menurut pandangan fikih muamalah kontemporer?",
    answer: "Transaksi kripto diperbolehkan sebagai aset (sil'ah) selama memiliki underlying asset yang jelas dan terhindar dari unsur gharar serta maysir. Namun, sebagai mata uang, ia harus mengikuti regulasi otoritas negara demi menjaga stabilitas ekonomi.",
    asatidz_name: "KH. Anwar Zahid",
    reference: "Kitab Al-Muamalah Al-Maliyah Al-Mu'ashirah, Hal. 142; Fatwa DSN-MUI No. 116/2017."
  },
  {
    id: "2",
    question: "Apakah boleh makmum membaca Al-Fatihah saat imam sedang membaca surat dalam shalat jahriyah?",
    answer: "Menurut Madzhab Syafi'i, makmum tetap wajib membaca Al-Fatihah dalam shalat jahriyah (suara keras) maupun sirriyah. Waktu membacanya adalah saat imam diam sejenak setelah Amin atau saat imam membaca surat.",
    asatidz_name: "Ust. Ahmad Fauzi",
    reference: "Kitab Fathul Qarib, Bab Shalat Jamaah; Al-Majmu' Syarh al-Muhadzdzab."
  },
  {
    id: "3",
    question: "Apa hukum menggunakan skincare yang mengandung alkohol?",
    answer: "Alkohol dalam kosmetik (bukan khamr) hukumnya suci dan boleh digunakan. Mayoritas ulama membedakan antara alkohol industri/sintetik untuk pemakaian luar dengan khamr yang memabukkan untuk dikonsumsi.",
    asatidz_name: "Buya Yahya",
    reference: "Keputusan Muktamar NU ke-30; Fatwa MUI tentang Penggunaan Alkohol dalam Produk Kosmetik."
  },
  {
    id: "4",
    question: "Bagaimana status wudhu seseorang yang tertidur dalam posisi duduk mantap?",
    answer: "Wudhu tidak batal jika seseorang tertidur dalam posisi duduk yang mantap (mumakkinun maq'adahu), yakni pantat menempel rapat pada lantai/kursi sehingga tidak ada celah keluarnya hadats.",
    asatidz_name: "Ust. Adi Hidayat",
    reference: "Kitab Safinatun Najah; Matan Abu Syuja' Bab Nawadhul Wudhu."
  }
];

export default function DetailBahtsulMasail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        
        const { data: dbData, error } = await supabase
          .from('questions')
          .select('*')
          .eq('id', id)
          .single();
        
        if (dbData) {
          setData(dbData);
        } else {
 
          const fallback = DUMMY_LIST.find(d => d.id === id) || DUMMY_LIST[Math.floor(Math.random() * DUMMY_LIST.length)];
          setData(fallback);
        }
      } catch (e) {
        setData(DUMMY_LIST[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={{marginTop: 10, color: '#64748b'}}>Memuat Jawaban...</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/bahtsul-masail')} style={styles.backButton}>
          <ChevronLeft color="#1e293b" size={28} />
          <Text style={styles.backText}>Detail Masail</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
 
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Quote size={16} color="#3b82f6" fill="#3b82f6" />
            <Text style={styles.label}>Pertanyaan</Text>
          </View>
          <Text style={styles.questionText}>{data?.question}</Text>
        </View>

        <View style={styles.answerBox}>
          <View style={styles.answerHeader}>
             <View style={styles.line} />
             <Text style={styles.answerLabel}>JAWABAN ASATIDZ</Text>
             <View style={styles.line} />
          </View>
          
          <Text style={styles.answerText}>{data?.answer}</Text>
          
          <View style={styles.asatidzInfo}>
            <Text style={styles.asatidzSignature}>Dijawab oleh:</Text>
            <Text style={styles.asatidzName}>{data?.asatidz_name || "Dewan Hisbah"}</Text>
          </View>
        </View>

        {data?.reference && (
          <View style={styles.referenceContainer}>
            <View style={styles.refHeader}>
              <BookOpen size={18} color="#475569" />
              <Text style={styles.refTitle}>Referensi & Dasar Hukum</Text>
            </View>
            <View style={styles.refContent}>
              <Text style={styles.referenceText}>{data.reference}</Text>
            </View>
          </View>
        )}
        
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navBar: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 15, backgroundColor: '#fff' },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginLeft: 8 },
  scrollContent: { padding: 20 },
  section: { marginBottom: 25 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  label: { fontSize: 14, color: '#3b82f6', fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  questionText: { fontSize: 20, fontWeight: '700', color: '#0f172a', lineHeight: 30 },
  answerBox: { 
    backgroundColor: '#1d4ed8', 
    borderRadius: 24, 
    padding: 24, 
    elevation: 8,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  answerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, gap: 10 },
  line: { height: 1, flex: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  answerLabel: { color: '#fff', fontSize: 12, fontWeight: '800', opacity: 0.9 },
  answerText: { color: '#fff', fontSize: 16, lineHeight: 28, textAlign: 'justify' },
  asatidzInfo: { marginTop: 25, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  asatidzSignature: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontStyle: 'italic' },
  asatidzName: { color: '#fff', fontSize: 16, fontWeight: '700', marginTop: 2 },
  referenceContainer: { marginTop: 30 },
  refHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  refTitle: { fontSize: 16, fontWeight: '700', color: '#334155' },
  refContent: { backgroundColor: '#E2E8F0', padding: 18, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#cbd5e1' },
  referenceText: { fontSize: 14, color: '#475569', lineHeight: 22, fontStyle: 'italic' }
});