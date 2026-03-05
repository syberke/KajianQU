import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Search, Video, MessageCircle, Star, X, CircleCheck as CheckCircle, User, Calendar, Clock } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function KelasPrivateScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [enrolledClasses, setEnrolledClasses] = useState<any[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAsatidz, setSelectedAsatidz] = useState<any>(null);
  const [selectedKitab, setSelectedKitab] = useState('');

  // Mock Data Asatidz (Idealnya ambil dari database profiles role=asatidz)
  const asatidzList = [
    { id: 'uuid-asatidz-1', name: 'Ust. Ahmad Fauzan', keilmuan: 'Tafsir', price: 75000 },
    { id: 'uuid-asatidz-2', name: 'Ust. Mahmud Syakir', keilmuan: 'Hadits', price: 80000 },
  ];

  useEffect(() => { fetchMyClasses(); }, []);

  const fetchMyClasses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from('private_class_enrollments')
      .select('*, profiles:asatidz_id(full_name)')
      .eq('user_id', user.id);
    if (data) setEnrolledClasses(data);
  };

  const handleRegister = async () => {
    if (!selectedKitab) return Alert.alert("Pilih Kitab", "Mohon pilih kitab materi.");
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('private_class_enrollments').insert([{
        user_id: user?.id,
        asatidz_id: selectedAsatidz.id,
        kitab: selectedKitab,
        status: 'active'
      }] as any);
      if (error) throw error;
      Alert.alert("Berhasil", "Anda sudah masuk grup kelas.");
      setShowBookingModal(false);
      fetchMyClasses();
    } catch (e: any) {
      Alert.alert("Gagal", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1e3a8a', '#3b82f6']} style={styles.header}>
        <Users size={32} color="white" />
        <Text style={styles.headerTitle}>Kelas Private</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Section Kelas Saya */}
        <Text style={styles.sectionTitle}>Kelas Saya</Text>
        {enrolledClasses.map((item) => (
          <View key={item.id} style={styles.classCard}>
            <Text style={styles.classAsatidz}>{item.profiles?.full_name}</Text>
            <Text style={styles.classKitab}>{item.kitab}</Text>
            <View style={styles.actionGroup}>
              <TouchableOpacity 
                style={styles.chatButton}
                onPress={() => router.push({ pathname: '/chatroom', params: { classId: item.id, className: item.profiles?.full_name }})}
              >
                <MessageCircle size={18} color="white" />
                <Text style={styles.btnText}>Tanya Ustadz</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Section Pilih Asatidz */}
        <Text style={styles.sectionTitle}>Cari Asatidz</Text>
        {asatidzList.map((ust) => (
          <TouchableOpacity key={ust.id} style={styles.asatidzCard} onPress={() => { setSelectedAsatidz(ust); setShowBookingModal(true); }}>
            <Text style={styles.asatidzName}>{ust.name}</Text>
            <Text style={styles.priceText}>Rp {ust.price.toLocaleString()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal Booking */}
      <Modal visible={showBookingModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Daftar Kelas {selectedAsatidz?.name}</Text>
            <TextInput 
              placeholder="Ketik Nama Kitab (Al-Qur'an, Fiqh, dll)" 
              style={styles.input}
              onChangeText={setSelectedKitab} 
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleRegister} disabled={loading}>
              <Text style={styles.btnText}>{loading ? 'Memproses...' : 'Konfirmasi Daftar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowBookingModal(false)}><Text style={{textAlign:'center', marginTop:15}}>Batal</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingTop: 60, paddingBottom: 20, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 15 },
  classCard: { backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 3, marginBottom: 10 },
  classAsatidz: { fontSize: 16, fontWeight: 'bold' },
  classKitab: { color: '#3b82f6', marginBottom: 10 },
  actionGroup: { flexDirection: 'row', gap: 10 },
  chatButton: { backgroundColor: '#059669', padding: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  btnText: { color: 'white', fontWeight: 'bold' },
  asatidzCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  asatidzName: { fontWeight: '600' },
  priceText: { color: '#059669', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', padding: 25, borderRadius: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#f1f5f9', padding: 15, borderRadius: 10, marginBottom: 20 },
  confirmButton: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 10, alignItems: 'center' }
});