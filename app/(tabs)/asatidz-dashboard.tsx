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
import {
  Video,
  Users,
  MessageCircle,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  Star,
  Play,
  Plus,
} from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';

const { width } = Dimensions.get('window');

export default function AsatidzDashboardScreen() {
  const { user } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = {
    total_students: 1247,
    live_sessions: 23,
    questions_answered: 156,
    rating: 4.8,
    total_hours: 89,
    upcoming_classes: 5,
  };

  const upcomingSchedule = [
    {
      id: '1',
      title: 'Tafsir Al-Baqarah',
      type: 'live',
      time: '20:00',
      date: 'Hari ini',
      participants: 245,
    },
    {
      id: '2',
      title: 'Kelas Private - Fiqh Muamalat',
      type: 'private',
      time: '14:00',
      date: 'Besok',
      student: 'Ahmad Fauzi',
    },
    {
      id: '3',
      title: 'Kajian Hadits Arbain',
      type: 'live',
      time: '19:30',
      date: '15 Jan',
      participants: 189,
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
          <IconComponent size={20} color={color} strokeWidth={2} />
        </View>
        {change && (
          <View style={styles.changeContainer}>
            <TrendingUp size={10} color="#22c55e" strokeWidth={2} />
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
      
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#ef4444', '#dc2626']}
            style={styles.actionGradient}>
            <Video size={24} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Mulai Live</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#22c55e', '#16a34a']}
            style={styles.actionGradient}>
            <Plus size={24} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Buat Kelas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            style={styles.actionGradient}>
            <BookOpen size={24} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Upload Materi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ScheduleCard = ({ item }: { item: any }) => (
    <View style={styles.scheduleCard}>
      <View style={styles.scheduleHeader}>
        <View style={styles.scheduleTime}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        
        <View style={[
          styles.typeBadge,
          { backgroundColor: item.type === 'live' ? '#ef444420' : '#22c55e20' }
        ]}>
          <Text style={[
            styles.typeText,
            { color: item.type === 'live' ? '#ef4444' : '#22c55e' }
          ]}>
            {item.type === 'live' ? 'Live' : 'Private'}
          </Text>
        </View>
      </View>

      <Text style={styles.scheduleTitle}>{item.title}</Text>
      
      {item.participants ? (
        <View style={styles.participantsInfo}>
          <Users size={14} color="#64748b" strokeWidth={2} />
          <Text style={styles.participantsText}>
            {item.participants} jamaah terdaftar
          </Text>
        </View>
      ) : (
        <Text style={styles.studentText}>Student: {item.student}</Text>
      )}

      <TouchableOpacity style={styles.startButton}>
        <Play size={16} color="#f59e0b" strokeWidth={2} />
        <Text style={styles.startButtonText}>
          {item.type === 'live' ? 'Mulai Live' : 'Mulai Kelas'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#d97706', '#f59e0b']}
        style={styles.header}>
        <View style={styles.profileSection}>
          <Text style={styles.greeting}>Assalamu'alaikum</Text>
          <Text style={styles.userName}>Ust. {user?.name}</Text>
          <Text style={styles.userRole}>Asatidz • {user?.keilmuan}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#fbbf24" strokeWidth={2} fill="#fbbf24" />
            <Text style={styles.ratingText}>{stats.rating}</Text>
            <Text style={styles.ratingSubtext}>Rating</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {['week', 'month', 'year'].map((period) => (
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
              {period === 'week' ? 'Minggu Ini' : 
               period === 'month' ? 'Bulan Ini' : 'Tahun Ini'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Santri"
          value={stats.total_students}
          icon={Users}
          color="#22c55e"
          change="+8%"
        />
        <StatCard
          title="Sesi Live"
          value={stats.live_sessions}
          icon={Video}
          color="#ef4444"
          change="+12%"
        />
        <StatCard
          title="Pertanyaan Dijawab"
          value={stats.questions_answered}
          icon={MessageCircle}
          color="#3b82f6"
          change="+15%"
        />
        <StatCard
          title="Total Jam Mengajar"
          value={`${stats.total_hours}h`}
          icon={Clock}
          color="#8b5cf6"
          change="+5%"
        />
      </View>

      <QuickActions />

      {/* Upcoming Schedule */}
      <View style={styles.scheduleSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Jadwal Mendatang</Text>
          <TouchableOpacity>
            <Calendar size={20} color="#64748b" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        {upcomingSchedule.map((item) => (
          <ScheduleCard key={item.id} item={item} />
        ))}
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
  },
  profileSection: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginLeft: 4,
    marginRight: 8,
  },
  ratingSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
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
    backgroundColor: '#f59e0b',
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
    width: 32,
    height: 32,
    borderRadius: 16,
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
    fontSize: 10,
    fontWeight: '600',
    color: '#22c55e',
    marginLeft: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
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
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: (width - 60) / 3,
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
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  scheduleSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
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
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleTime: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  dateText: {
    fontSize: 12,
    color: '#64748b',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantsText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  studentText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    paddingVertical: 8,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
    marginLeft: 6,
  },
});