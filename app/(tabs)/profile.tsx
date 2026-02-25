import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, BookOpen, MessageCircle, Bell, Shield, Circle as HelpCircle, LogOut, ChevronRight, Award, Clock } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
const { user, signOut, profile } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Keluar Aplikasi',
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Keluar', 
          style: 'destructive',
    
          onPress: async () => {
            try {
              await signOut();
            
            } catch (e) {
              Alert.alert('Error', 'Gagal keluar');
            }
          } 
        },
      ]
    );
  };
const nameDisplay = profile?.full_name || user?.email || 'Pengguna';
  const ProfileStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>127</Text>
        <Text style={styles.statLabel}>Hari Streak</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>2,543</Text>
        <Text style={styles.statLabel}>Ayat Dibaca</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>18</Text>
        <Text style={styles.statLabel}>Surah Selesai</Text>
      </View>
    </View>
  );

  const MenuItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && <ChevronRight size={20} color="#94a3b8" strokeWidth={2} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <User size={32} color="white" strokeWidth={2} />
          </View>
    
<Text style={styles.userName}>
  {profile?.full_name || user?.user_metadata?.full_name || 'Pengguna'}
</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          
          {user?.role === 'asatidz' && (
            <View style={styles.roleBadge}>
              <Award size={12} color="#f59e0b" strokeWidth={2} />
              <Text style={styles.roleBadgeText}>Asatidz</Text>
            </View>
          )}
        </View>
        
        <ProfileStats />
      </LinearGradient>

      {/* Achievement Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pencapaian Terbaru</Text>
        <View style={styles.achievementCard}>
          <LinearGradient
            colors={['#fbbf24', '#f59e0b']}
            style={styles.achievementBadge}>
            <Award size={24} color="white" strokeWidth={2} />
          </LinearGradient>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>Hafidz Pemula</Text>
            <Text style={styles.achievementDesc}>
              Berhasil menghafal 5 surah pendek
            </Text>
          </View>
          <Text style={styles.achievementDate}>2 hari lalu</Text>
        </View>
      </View>

      {/* Menu Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Akun</Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<Settings size={20} color="#64748b" strokeWidth={2} />}
            title="Pengaturan Akun"
            subtitle="Ubah profil dan preferensi"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Bell size={20} color="#64748b" strokeWidth={2} />}
            title="Notifikasi"
            subtitle="Atur pengingat dan pemberitahuan"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Shield size={20} color="#64748b" strokeWidth={2} />}
            title="Privasi & Keamanan"
            subtitle="Kelola data dan keamanan akun"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pembelajaran</Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<BookOpen size={20} color="#64748b" strokeWidth={2} />}
            title="Riwayat Belajar"
            subtitle="Lihat progress dan aktivitas"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Clock size={20} color="#64748b" strokeWidth={2} />}
            title="Jadwal Muroja'ah"
            subtitle="Atur waktu mengulang hafalan"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Award size={20} color="#64748b" strokeWidth={2} />}
            title="Sertifikat & Badge"
            subtitle="Koleksi pencapaian Anda"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dukungan</Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<HelpCircle size={20} color="#64748b" strokeWidth={2} />}
            title="Bantuan & FAQ"
            subtitle="Temukan jawaban atas pertanyaan Anda"
            onPress={() => {}}
          />
          <MenuItem
            icon={<MessageCircle size={20} color="#64748b" strokeWidth={2} />}
            title="Hubungi Kami"
            subtitle="Tim support siap membantu"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}>
          <LogOut size={20} color="#ef4444" strokeWidth={2} />
          <Text style={styles.logoutText}>Keluar dari Akun</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>KajianQU v1.0.0</Text>
        <Text style={styles.footerCopyright}>
          © 2026 KajianQU. All rights reserved.
        </Text>
      </View>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f59e0b',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  achievementDate: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4,
  },
  footerCopyright: {
    fontSize: 12,
    color: '#94a3b8',
  },
});