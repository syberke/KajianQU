import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Modal, Image, Alert, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { 
  Heart, GraduationCap, Hop as Home, Baby, 
  Smartphone, X, CircleCheck as CheckCircle, Upload, User, Phone 
} from 'lucide-react-native';
import { donationService } from '../../services/donationService'; 

export default function DonasiScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('operasional');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [donorName, setDonorName] = useState(''); // State Baru
  const [donorContact, setDonorContact] = useState(''); // State Baru
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const donationPurposes = [
    { id: 'operasional', name: 'Operasional App', color: '#3b82f6', icon: Smartphone },
    { id: 'beasiswa', name: 'Beasiswa Santri', color: '#22c55e', icon: GraduationCap },
    { id: 'masjid', name: 'Pembangunan Masjid', color: '#f59e0b', icon: Home },
    { id: 'yatim', name: 'Yatim Piatu', color: '#ef4444', icon: Baby },
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleFinalSubmit = async () => {
    if (!donorName) return Alert.alert("Nama Kosong", "Mohon isi nama Anda.");
    if (!donorContact) return Alert.alert("Kontak Kosong", "Mohon isi nomor WA/Bank.");
    if (!selectedPayment) return Alert.alert("Metode?", "Pilih metode pembayaran dulu.");
    if (!image) return Alert.alert("Bukti Transfer?", "Mohon upload bukti transfer.");

    setLoading(true);
    try {
      const proofUrl = await donationService.uploadImage(image);
      
      await donationService.submitDonation({
        amount: selectedAmount || parseInt(customAmount),
        purpose_id: selectedPurpose,
        payment_method: selectedPayment,
        proof_url: proofUrl,
        donor_name: donorName,
        donor_contact: donorContact,
      });

      setShowPaymentModal(false);
      setShowSuccessModal(true);
      
      // Reset Form
      setImage(null);
      setCustomAmount('');
      setSelectedAmount(null);
      setDonorName('');
      setDonorContact('');

    } catch (error: any) {
      Alert.alert("Proses Gagal", error.message || "Terjadi kesalahan.");
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

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Identitas Donatur</Text>
        <View style={styles.inputGroup}>
          <User size={18} color="#64748b" style={styles.inputIcon} />
          <TextInput 
            style={styles.textInput} 
            placeholder="Nama Lengkap" 
            value={donorName}
            onChangeText={setDonorName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Phone size={18} color="#64748b" style={styles.inputIcon} />
          <TextInput 
            style={styles.textInput} 
            placeholder="Nomor WhatsApp / Nama Bank" 
            value={donorContact}
            onChangeText={setDonorContact}
          />
        </View>

        <Text style={[styles.sectionTitle, {marginTop: 20}]}>2. Pilih Tujuan</Text>
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

        <Text style={[styles.sectionTitle, {marginTop: 20}]}>3. Nominal</Text>
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

        <TouchableOpacity style={styles.mainBtn} onPress={() => setShowPaymentModal(true)}>
          <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.mainBtnGrad}>
            <Text style={styles.mainBtnText}>Lanjutkan Donasi</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Konfirmasi */}
      <Modal visible={showPaymentModal} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pembayaran</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}><X color="#64748b"/></TouchableOpacity>
            </View>

            <ScrollView style={{padding: 20}}>
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

              <Text style={[styles.label, {marginTop: 20}]}>Upload Bukti:</Text>
              <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                {image ? <Image source={{ uri: image }} style={styles.preview} /> : <Upload size={30} color="#cbd5e1" />}
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmBtn} onPress={handleFinalSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color="white"/> : <Text style={styles.confirmBtnText}>Konfirmasi Sekarang</Text>}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent>
        <View style={styles.overlayCenter}>
          <View style={styles.successCard}>
            <CheckCircle size={60} color="#22c55e" />
            <Text style={styles.successTitle}>Berhasil!</Text>
            <Text style={styles.successSub}>Jazakallahu Khairan. Donasi Anda sedang diverifikasi.</Text>
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
  headerSubtitle: { color: 'rgba(255,255,255,0.8)' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 15, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, height: 50 },
  purposeCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2 },
  iconBox: { padding: 8, borderRadius: 8, marginRight: 15 },
  purposeName: { fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  amtBtn: { flexBasis: '31%', backgroundColor: 'white', padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  amtBtnActive: { backgroundColor: '#22c55e', borderColor: '#22c55e' },
  amtText: { fontSize: 11, fontWeight: 'bold' },
  mainBtn: { marginTop: 30, marginBottom: 50 },
  mainBtnGrad: { padding: 18, borderRadius: 15, alignItems: 'center' },
  mainBtnText: { color: 'white', fontWeight: 'bold' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBody: { backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalTitle: { fontWeight: 'bold', fontSize: 18 },
  label: { fontWeight: 'bold', marginBottom: 10 },
  payBtn: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', minWidth: 80, alignItems: 'center' },
  uploadBox: { height: 150, backgroundColor: '#f8fafc', borderRadius: 15, borderStyle: 'dashed', borderWidth: 2, borderColor: '#cbd5e1', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  preview: { width: '100%', height: '100%' },
  confirmBtn: { backgroundColor: '#1e3a8a', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 25, marginBottom: 30 },
  confirmBtnText: { color: 'white', fontWeight: 'bold' },
  overlayCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 30 },
  successCard: { backgroundColor: 'white', borderRadius: 20, padding: 30, alignItems: 'center' },
  successTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 15 },
  successSub: { textAlign: 'center', color: '#64748b', marginTop: 10 },
  closeBtn: { backgroundColor: '#22c55e', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10, marginTop: 25 }
});