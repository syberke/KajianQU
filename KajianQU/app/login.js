import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Ingat: Django obtain_auth_token butuh field 'username' (isi dengan email)
      const response = await api.post('/login/', { 
        email: email, 
        password: password 
      });

      const token = response.data.token;
      await AsyncStorage.setItem('userToken', token);
      
      Alert.alert("Sukses", "Login Berhasil!");
      router.replace('/'); 
    } catch (error) {
      Alert.alert("Gagal", "Email atau Password salah.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login KajianQU</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>MASUK</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
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