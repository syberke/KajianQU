import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Modal, Image, Alert, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { 
  Heart, GraduationCap, Hop as Home, Baby, 
  DollarSign, Smartphone, Building, X, 
  CircleCheck as CheckCircle, Camera, Upload 
} from 'lucide-react-native';
import { donationService } from '../../services/donationService'; 

export default function DonasiScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('operasional');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const donationPurposes = [
    { id: 'operasional', name: 'Operasional App', description: 'Maintenance aplikasi', icon: Smartphone, color: '#3b82f6', target: 50000000, collected: 32500000 },
    { id: 'beasiswa', name: 'Beasiswa Santri', description: 'Membantu santri belajar', icon: GraduationCap, color: '#22c55e', target: 100000000, collected: 67800000 },
    { id: 'masjid', name: 'Pembangunan Masjid', description: 'Masjid daerah terpencil', icon: Home, color: '#f59e0b', target: 200000000, collected: 145600000 },
    { id: 'yatim', name: 'Yatim Piatu', description: 'Pendidikan anak yatim', icon: Baby, color: '#ef4444', target: 75000000, collected: 43200000 },
  ];

  const quickAmounts = [25000, 50000, 100000, 250000, 500000, 1000000];

  const paymentMethods = [
    { id: 'gopay', name: 'GoPay', color: '#00AA13' },
    { id: 'ovo', name: 'OVO', color: '#4C3494' },
    { id: 'dana', name: 'DANA', color: '#118EEA' },
    { id: 'bca', name: 'BCA VA', color: '#0066CC' },
  ];

  const formatCurrency = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

 const handleFinalSubmit = async () => {
  if (!selectedPayment) return Alert.alert("Eits!", "Pilih metode pembayaran dulu ya.");
  if (!image) return Alert.alert("Bukti Transfer?", "Mohon upload foto bukti transfer.");

  setLoading(true);
  try {
    console.log("1. Memulai Upload ke Cloudinary...");
    const proofUrl = await donationService.uploadImage(image);
    console.log("2. Upload Berhasil! URL:", proofUrl);

    console.log("3. Menyimpan ke Supabase...");
    const result = await donationService.submitDonation({
      amount: selectedAmount || parseInt(customAmount),
      purpose_id: selectedPurpose,
      payment_method: selectedPayment,
      proof_url: proofUrl,
    });

    console.log("4. Semua proses selesai!");
    setShowPaymentModal(false);
    setShowSuccessModal(true);
    

    setImage(null);
    setCustomAmount('');
    setSelectedAmount(null);

  } catch (error: any) {
    console.error("LOG ERROR TERAKHIR:", error);
   
    Alert.alert("Proses Gagal", `Pesan: ${error.message || "Koneksi terputus"}`);
  } finally {
    setLoading(false);
  }
};
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1e3a8a', '#3b82f6']} style={styles.header}>
        <Heart size={32} color="white" />
        <Text style={styles.headerTitle}>Infaq & Donasi</Text>
        <Text style={styles.headerSubtitle}>Setiap rupiah jadi amal jariyah</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>1. Pilih Tujuan</Text>
        {donationPurposes.map((p) => (
          <TouchableOpacity 
            key={p.id} 
            style={[styles.purposeCard, selectedPurpose === p.id && { borderColor: p.color, borderWidth: 2 }]}
            onPress={() => setSelectedPurpose(p.id)}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={[styles.iconBox, {backgroundColor: `${p.color}20`}]}><p.icon size={20} color={p.color}/></View>
              <Text style={styles.purposeName}>{p.name}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, {marginTop: 20}]}>2. Nominal Donasi</Text>
        <View style={styles.grid}>
          {quickAmounts.map(amt => (
            <TouchableOpacity 
              key={amt} 
              onPress={() => {setSelectedAmount(amt); setCustomAmount('');}}
              style={[styles.amtBtn, selectedAmount === amt && styles.amtBtnActive]}
            >
              <Text style={[styles.amtText, selectedAmount === amt && {color: 'white'}]}>{formatCurrency(amt)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Atau masukkan sendiri..." 
          keyboardType="numeric"
          value={customAmount}
          onChangeText={(v) => {setCustomAmount(v); setSelectedAmount(null);}}
        />

        {(selectedAmount || customAmount) ? (
          <TouchableOpacity style={styles.mainBtn} onPress={() => setShowPaymentModal(true)}>
            <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.mainBtnGrad}>
              <Text style={styles.mainBtnText}>Lanjutkan Donasi</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : null}
      </ScrollView>

      {/* Modal Pembayaran & Bukti Transfer */}
      <Modal visible={showPaymentModal} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Konfirmasi Donasi</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}><X color="#64748b"/></TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{padding: 20}}>
              <Text style={styles.label}>Pilih Metode:</Text>
              <View style={styles.grid}>
                {paymentMethods.map(m => (
                  <TouchableOpacity 
                    key={m.id} 
                    onPress={() => setSelectedPayment(m.id)}
                    style={[styles.payBtn, selectedPayment === m.id && {borderColor: m.color, backgroundColor: `${m.color}10`}]}
                  >
                    <Text style={{fontWeight: 'bold', color: m.color}}>{m.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.label, {marginTop: 20}]}>Upload Bukti Transfer:</Text>
              <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.preview} />
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <Upload size={30} color="#94a3b8" />
                    <Text style={{color: '#94a3b8', marginTop: 5}}>Klik untuk pilih foto</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmBtn} onPress={handleFinalSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color="white"/> : <Text style={styles.confirmBtnText}>Kirim Sekarang</Text>}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.overlayCenter}>
          <View style={styles.successCard}>
            <CheckCircle size={60} color="#22c55e" />
            <Text style={styles.successTitle}>Donasi Terkirim!</Text>
            <Text style={styles.successSub}>Jazakallahu Khairan. Donasi Anda sedang kami verifikasi.</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowSuccessModal(false)}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Alhamdulillah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 40, paddingTop: 60, alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 10 },
  headerSubtitle: { color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  content: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 10 },
  purposeCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2 },
  iconBox: { padding: 8, borderRadius: 8, marginRight: 15 },
  purposeName: { fontWeight: '600', color: '#334155' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  amtBtn: { flexBasis: '30%', backgroundColor: 'white', padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  amtBtnActive: { backgroundColor: '#22c55e', borderColor: '#22c55e' },
  amtText: { fontSize: 12, fontWeight: 'bold', color: '#64748b' },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginTop: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  mainBtn: { marginTop: 30, marginBottom: 50 },
  mainBtnGrad: { padding: 18, borderRadius: 15, alignItems: 'center' },
  mainBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBody: { backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalTitle: { fontWeight: 'bold', fontSize: 18 },
  label: { fontWeight: 'bold', color: '#475569', marginBottom: 10 },
  payBtn: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', minWidth: 80, alignItems: 'center' },
  uploadBox: { height: 180, backgroundColor: '#f8fafc', borderRadius: 15, borderStyle: 'dashed', borderWidth: 2, borderColor: '#cbd5e1', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  preview: { width: '100%', height: '100%' },
  confirmBtn: { backgroundColor: '#1e3a8a', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 25, marginBottom: 20 },
  confirmBtnText: { color: 'white', fontWeight: 'bold' },
  overlayCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 30 },
  successCard: { backgroundColor: 'white', borderRadius: 20, padding: 30, alignItems: 'center' },
  successTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 15 },
  successSub: { textAlign: 'center', color: '#64748b', marginTop: 10 },
  closeBtn: { backgroundColor: '#22c55e', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10, marginTop: 25 }
});