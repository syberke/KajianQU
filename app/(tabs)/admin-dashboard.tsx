import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, GraduationCap, Video, DollarSign, MessageCircle, TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock, Eye } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AdminDashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const stats = {
    total_users: 12543,
    total_asatidz: 87,
    active_sessions: 234,
    total_donations: 45678000,
    pending_questions: 23,
    live_rooms_today: 8,
  };

  const recentActivities = [
    {
      id: '1',
      type: 'user_register',
      message: 'Ahmad Fauzi mendaftar sebagai user baru',
      time: '5 menit lalu',
      icon: Users,
      color: '#22c55e',
    },
    {
      id: '2',
      type: 'live_started',
      message: 'Ust. Mahmud memulai kajian live "Tafsir Al-Baqarah"',
      time: '15 menit lalu',
      icon: Video,
      color: '#3b82f6',
    },
    {
      id: '3',
      type: 'donation',
      message: 'Donasi Rp 500.000 untuk program beasiswa',
      time: '1 jam lalu',
      icon: DollarSign,
      color: '#f59e0b',
    },
    {
      id: '4',
      type: 'question',
      message: 'Pertanyaan baru tentang hukum jual beli online',
      time: '2 jam lalu',
      icon: MessageCircle,
      color: '#8b5cf6',
    },
  ];

  const StatCard = ({ 
    title, 
    value, 
    icon: IconComponent, 
    color, 
    change 
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    change?: string;
  }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
          <IconComponent size={24} color={color} strokeWidth={2} />
        </View>
        {change && (
          <View style={styles.changeContainer}>
            <TrendingUp size={12} color="#22c55e" strokeWidth={2} />
            <Text style={styles.changeText}>{change}</Text>
          </View>
        )}
      </View>
      <Text style={styles.statValue}>{value.toLocaleString()}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const QuickActions = () => (
    <View style={styles.quickActions}>
      <Text style={styles.sectionTitle}>Aksi Cepat</Text>
      
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#ef4444', '#dc2626']}
            style={styles.actionGradient}>
            <AlertTriangle size={20} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Laporan Masalah</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#22c55e', '#16a34a']}
            style={styles.actionGradient}>
            <CheckCircle size={20} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Verifikasi Asatidz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            style={styles.actionGradient}>
            <Eye size={20} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Monitor Live</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            style={styles.actionGradient}>
            <MessageCircle size={20} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Moderasi Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RecentActivity = () => (
    <View style={styles.recentActivity}>
      <Text style={styles.sectionTitle}>Aktivitas Terbaru</Text>
      
      {recentActivities.map((activity) => {
        const IconComponent = activity.icon;
        return (
          <View key={activity.id} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
              <IconComponent size={16} color={activity.color} strokeWidth={2} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityMessage}>{activity.message}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#ef4444']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <Text style={styles.headerSubtitle}>
          Kelola dan monitor aplikasi KajianQU
        </Text>
      </LinearGradient>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {['today', 'week', 'month'].map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod(period)}>
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive,
              ]}>
              {period === 'today' ? 'Hari Ini' : 
               period === 'week' ? 'Minggu Ini' : 'Bulan Ini'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Users"
          value={stats.total_users}
          icon={Users}
          color="#22c55e"
          change="+12%"
        />
        <StatCard
          title="Total Asatidz"
          value={stats.total_asatidz}
          icon={GraduationCap}
          color="#f59e0b"
          change="+5%"
        />
        <StatCard
          title="Sesi Aktif"
          value={stats.active_sessions}
          icon={Video}
          color="#3b82f6"
          change="+8%"
        />
        <StatCard
          title="Total Donasi"
          value={`Rp ${(stats.total_donations / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          color="#8b5cf6"
          change="+15%"
        />
        <StatCard
          title="Pertanyaan Pending"
          value={stats.pending_questions}
          icon={MessageCircle}
          color="#ef4444"
        />
        <StatCard
          title="Live Hari Ini"
          value={stats.live_rooms_today}
          icon={Clock}
          color="#06b6d4"
        />
      </View>

      <QuickActions />
      <RecentActivity />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#ef4444',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  periodButtonTextActive: {
    color: 'white',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: (width - 52) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22c55e',
    marginLeft: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  quickActions: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  recentActivity: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 4,
    lineHeight: 20,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
});