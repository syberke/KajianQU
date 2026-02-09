import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../services/api';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '', email: '', password: '', phone: '', role: 'user'
  });

  const handleRegister = async () => {
    try {
      await api.post('/register/', form);
      Alert.alert("Sukses", "Akun berhasil dibuat!");
      router.push('/login');
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert("Gagal", "Terjadi kesalahan saat pendaftaran.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar KajianQU</Text>
      <TextInput style={styles.input} placeholder="Username" onChangeText={(txt) => setForm({...form, username: txt})} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={(txt) => setForm({...form, email: txt})} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(txt) => setForm({...form, password: txt})} />
         <TextInput style={styles.input} placeholder="first name" onChangeText={(txt) => setForm({...form, first_name: txt})} />
        <TextInput style={styles.input} placeholder="Last name" onChangeText={(txt) => setForm({...form, last_name: txt})} />
      <TextInput style={styles.input} placeholder="Nomor HP" onChangeText={(txt) => setForm({...form, phone: txt})} />
    <TextInput style={styles.input} placeholder="role anda" onChangeText={(txt) => setForm({...form, role: txt})} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>DAFTAR</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Sudah punya akun? Login di sini</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10 },
  button: { backgroundColor: '#2e7d32', padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 20, textAlign: 'center', color: 'blue' }
});