import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { 
  StreamVideoClient, 
  StreamVideo, 
  Call, 
  StreamCall, 
  CallContent,
  User
} from '@stream-io/video-react-native-sdk';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeepAwake } from 'expo-keep-awake';


import { supabase } from '@/lib/supabase';

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY || '';
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';

export default function LiveStreamingScreen() {
  useKeepAwake(); 
  const insets = useSafeAreaInsets();
  
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(false);

  
  const cleanup = useCallback(async () => {
    if (call) {
      await call.leave();
      setCall(null);
    }
    if (client) {
      await client.disconnectUser();
      setClient(null);
    }
  }, [call, client]);

  useEffect(() => {
    return () => { cleanup(); };
  }, []);

  // 2. Logika utama memulai Live
  const handleStartLive = async () => {
    setLoading(true);
    try {
      // A. Cek Session User
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Silakan login terlebih dahulu");

      const userId = session.user.id;
      const userName = session.user.email?.split('@')[0] || 'Ustadz';

      // B. Ambil Token dari Edge Function
      const response = await fetch(`${SUPABASE_URL}/functions/v1/get-stream-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}` // Mengirim JWT untuk keamanan
        },
        body: JSON.stringify({ userId }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Gagal mengambil token");

      // C. Inisialisasi Stream Client
      const user: User = { id: userId, name: userName };
      const videoClient = new StreamVideoClient({ 
        apiKey: STREAM_API_KEY, 
        user, 
        token: result.token 
      });
      setClient(videoClient);

      // D. Buat Call (Room)
      const callId = `kajian_${userId.substring(0, 6)}_${Date.now().toString().slice(-4)}`;
      const videoCall = videoClient.call('default', callId);
      
      // 'create: true' membuat room baru, 'backstage: false' langsung live
      await videoCall.join({ create: true });
      
      setCall(videoCall);
    } catch (error: any) {
      Alert.alert("Gagal Memulai Live", error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Tampilan Loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Menyiapkan koneksi siaran...</Text>
      </View>
    );
  }

  // Tampilan Menu Utama (Sebelum Live)
  if (!call || !client) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Siaran Langsung</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Mulai Kajian Baru</Text>
            <Text style={styles.infoDesc}>
              Pastikan koneksi internet stabil dan pencahayaan cukup sebelum memulai siaran.
            </Text>
          </View>

          <TouchableOpacity style={styles.btnStart} onPress={handleStartLive}>
            <Text style={styles.btnText}>Mulai Live Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tampilan Saat Live Berlangsung
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <View style={styles.liveContainer}>
          <CallContent 
            onHangupCallHandler={() => {
              cleanup();
            }} 
          />
        </View>
      </StreamCall>
    </StreamVideo>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  header: { padding: 20, backgroundColor: '#0f172a' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  content: { flex: 1, padding: 25, justifyContent: 'center' },
  infoCard: { backgroundColor: 'white', padding: 20, borderRadius: 16, marginBottom: 30, elevation: 2 },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 10 },
  infoDesc: { fontSize: 14, color: '#64748b', lineHeight: 20 },
  btnStart: { backgroundColor: '#3b82f6', paddingVertical: 18, borderRadius: 15, alignItems: 'center', elevation: 4 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  loadingText: { marginTop: 15, color: '#64748b', fontWeight: '500' },
  liveContainer: { flex: 1, backgroundColor: 'black' }
});