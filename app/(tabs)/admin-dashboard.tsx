import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, ActivityIndicator, Alert, RefreshControl
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Users, GraduationCap, Video, DollarSign, MessageCircle, 
  TrendingUp, TriangleAlert as AlertTriangle, 
  CircleCheck as CheckCircle, Clock, Eye, Youtube 
} from 'lucide-react-native';
import { supabase } from '../../lib/supabase'; // Sesuaikan path
import { muamalatService } from '../../services/muamalatService';

const { width } = Dimensions.get('window');

export default function AdminDashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    total_users: 0,
    total_donations: 0,
    pending_muamalat: 0,
    total_asatidz: 0
  });
  // Di dalam komponen AdminDashboardScreen
const [pendingMuamalat, setPendingMuamalat] = useState<any[]>([]);

const fetchData = async () => {
  try {
    setLoading(true);
    
    // Hitung User
    const { count: userCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    // Hitung Donasi (Solusi Error 'amount')
    const { data: donations, error: donError } = await supabase
      .from('donations')
      .select('amount')
      .eq('status', 'success');
      
    const totalAmount = (donations as any[])?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    // Ambil Muamalat
    const { data: muamalat, count: muamalatCount } = await supabase
      .from('muamalat_practices')
      .select('*', { count: 'exact' })
      .eq('status', 'pending');

    setStats({
      total_users: userCount || 0,
      total_donations: totalAmount,
      pending_muamalat: muamalatCount || 0,
      total_asatidz: 87 
    });
    
    setPendingMuamalat(muamalat || []);

  } catch (error: any) {
    console.error(error);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  // Handler Approve Muamalat
  const handleApprove = async (id: string) => {
    Alert.alert("Konfirmasi", "Setujui praktek muamalat ini?", [
      { text: "Batal" },
      { 
        text: "Ya, Setujui", 
        onPress: async () => {
          await muamalatService.updateStatus(id, 'success');
          fetchData(); // Refresh data
        }
      }
    ]);
  };

  if (loading && !refreshing) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#ef4444" /></View>;
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true); fetchData();}} />}
    >
      <LinearGradient colors={['#dc2626', '#ef4444']} style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <Text style={styles.headerSubtitle}>Monitor Donasi & Praktek Santri</Text>
      </LinearGradient>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard title="Total Users" value={stats.total_users} icon={Users} color="#22c55e" change="+2" />
        <StatCard title="Total Donasi" value={`Rp ${stats.total_donations.toLocaleString()}`} icon={DollarSign} color="#8b5cf6" />
        <StatCard title="Muamalat Pending" value={stats.pending_muamalat} icon={Youtube} color="#ef4444" />
        <StatCard title="Total Asatidz" value={stats.total_asatidz} icon={GraduationCap} color="#f59e0b" />
      </View>

      {/* Review Section */}
      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Perlu Review (Praktek Muamalat)</Text>
        {pendingMuamalat.length === 0 ? (
          <Text style={styles.emptyText}>Tidak ada praktek yang perlu di-review.</Text>
        ) : (
          pendingMuamalat.map((item) => (
            <View key={item.id} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#ef444420' }]}>
                <Youtube size={16} color="#ef4444" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityMessage}>
                  <Text style={{fontWeight: 'bold'}}>{item.student_name}</Text> menyetor praktek muamalat.
                </Text>
                <Text style={styles.activityTime}>{item.youtube_url}</Text>
                
                <View style={styles.adminActionRow}>
                  <TouchableOpacity 
                    style={[styles.miniBtn, {backgroundColor: '#22c55e'}]}
                    onPress={() => handleApprove(item.id)}
                  >
                    <CheckCircle size={14} color="white" />
                    <Text style={styles.miniBtnText}> Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

// Sub-komponen StatCard
const StatCard = ({ title, value, icon: IconComponent, color, change }: any) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
        <IconComponent size={24} color={color} strokeWidth={2} />
      </View>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { paddingTop: 60, paddingBottom: 30, paddingHorizontal: 20, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: 'white' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 20, gap: 12 },
  statCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, width: (width - 52) / 2, elevation: 4 },
  statHeader: { marginBottom: 12 },
  statIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#1e293b' },
  statTitle: { fontSize: 12, color: '#64748b' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginHorizontal: 20, marginTop: 10, marginBottom: 15 },
  recentActivity: { paddingBottom: 50 },
  activityItem: { flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 20, borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  activityContent: { flex: 1 },
  activityMessage: { fontSize: 14, color: '#1e293b' },
  activityTime: { fontSize: 12, color: '#3b82f6', marginTop: 4 },
  adminActionRow: { flexDirection: 'row', marginTop: 10 },
  miniBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginRight: 8 },
  miniBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#94a3b8', marginTop: 20 }
});