import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { Youtube, User, Phone, Send, CheckCircle } from 'lucide-react-native';
import { muamalatService } from '../../services/muamalatService';
import { LinearGradient } from 'expo-linear-gradient';

export default function MuamalatScreen() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !contact || !videoUrl) {
      return Alert.alert("Data Kurang", "Mohon isi semua field termasuk link YouTube.");
    }

    // Validasi URL YouTube sederhana
    if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
      return Alert.alert("Link Salah", "Pastikan Anda memasukkan link video YouTube.");
    }

    setLoading(true);
    try {
      await muamalatService.submitPractice(name, contact, videoUrl);
      Alert.alert(
        "Terkirim!", 
        "Praktek Muamalat Anda sedang diperiksa oleh Admin. Status akan berubah jika sudah disetujui."
      );
      setName('');
      setContact('');
      setVideoUrl('');
    } catch (error: any) {
      Alert.alert("Gagal", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#059669', '#10b981']} style={styles.header}>
        <Youtube size={40} color="white" />
        <Text style={styles.title}>Praktek Muamalat</Text>
        <Text style={styles.subtitle}>Setorkan bukti praktek via link YouTube</Text>
      </LinearGradient>

      <View style={styles.formCard}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <View style={styles.inputGroup}>
          <User size={18} color="#94a3b8" />
          <TextInput 
            style={styles.input} 
            placeholder="Masukkan nama Anda" 
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.label}>Nomor WA / Bank</Text>
        <View style={styles.inputGroup}>
          <Phone size={18} color="#94a3b8" />
          <TextInput 
            style={styles.input} 
            placeholder="Contoh: 0812345678" 
            value={contact}
            onChangeText={setContact}
          />
        </View>

        <Text style={styles.label}>Link Video YouTube</Text>
        <View style={styles.inputGroup}>
          <Youtube size={18} color="#ef4444" />
          <TextInput 
            style={styles.input} 
            placeholder="https://youtube.com/watch?v=..." 
            value={videoUrl}
            onChangeText={setVideoUrl}
          />
        </View>

        <TouchableOpacity 
          style={styles.btnSubmit} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Send size={18} color="white" style={{marginRight: 8}} />
              <Text style={styles.btnText}>Setor Sekarang</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <CheckCircle size={16} color="#059669" />
        <Text style={styles.infoText}>
          Setelah setor, Admin akan memeriksa video Anda. Jika sesuai, status akan berubah menjadi "Success".
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 40, paddingTop: 60, alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  title: { fontSize: 22, fontWeight: 'bold', color: 'white', marginTop: 10 },
  subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  formCard: { backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 20, elevation: 4 },
  label: { fontWeight: 'bold', color: '#475569', marginBottom: 8, fontSize: 14 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 12, paddingHorizontal: 15, marginBottom: 15 },
  input: { flex: 1, height: 50, marginLeft: 10, fontSize: 14 },
  btnSubmit: { backgroundColor: '#059669', padding: 16, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  infoBox: { flexDirection: 'row', padding: 20, alignItems: 'center', marginHorizontal: 20 },
  infoText: { color: '#64748b', fontSize: 12, marginLeft: 8, flex: 1 }
});