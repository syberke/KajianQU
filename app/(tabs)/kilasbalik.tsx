import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import { GraduationCap, MapPin, MessageCircle } from 'lucide-react-native';

export default function KilasBalikScreen() {
  const [asatidz, setAsatidz] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAsatidz();
  }, []);

  const fetchAsatidz = async () => {
    try {
      // Ambil user yang rolenya 'asatidz'
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'asatidz'); // Pastikan di database ada kolom role

      if (error) throw error;
      setAsatidz(data || []);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.avatar_url || 'https://via.placeholder.com/150' }} 
        style={styles.avatar} 
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.full_name}</Text>
        <View style={styles.bioRow}>
          <GraduationCap size={14} color="#64748b" />
          <Text style={styles.bioText}>{item.specialization || 'Pengajar Umum'}</Text>
        </View>
        <View style={styles.bioRow}>
          <MapPin size={14} color="#64748b" />
          <Text style={styles.bioText}>{item.location || 'Indonesia'}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) return <ActivityIndicator style={{flex:1}} size="large" color="#059669" />;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Kilas Balik Asatidz</Text>
      <FlatList
        data={asatidz}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', padding: 20, paddingTop: 60, color: '#1e293b' },
  card: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 15, padding: 15, marginBottom: 15, elevation: 2 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#e2e8f0' },
  info: { marginLeft: 15, flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  bioRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  bioText: { fontSize: 13, color: '#64748b', marginLeft: 5 }
});