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
  Calendar,
  TrendingUp,
  Book,
  Mic,
  Video,
  Heart,
  Award,
  Clock,
  Target,
  Flame,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function KilasBalikScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weeklyStats = {
    quran_read: 45,
    doa_count: 28,
    live_attended: 3,
    ai_sessions: 12,
    streak_days: 7,
    total_minutes: 340,
  };

  const dailyActivities = [
    {
      date: '2024-01-20',
      activities: [
        { type: 'quran', count: 8, time: '06:30' },
        { type: 'doa', count: 5, time: '07:00' },
        { type: 'ai_session', count: 2, time: '19:30' },
        { type: 'live', count: 1, time: '20:00' },
      ]
    },
    {
      date: '2024-01-19',
      activities: [
        { type: 'quran', count: 6, time: '06:15' },
        { type: 'doa', count: 4, time: '07:15' },
        { type: 'ai_session', count: 1, time: '19:00' },
      ]
    },
    // More daily data...
  ];

  const achievements = [
    {
      id: '1',
      title: 'Streak Master',
      description: 'Membaca Al-Qur\'an 7 hari berturut-turut',
      icon: Flame,
      color: '#ef4444',
      earned_at: '2024-01-20',
    },
    {
      id: '2',
      title: 'AI Enthusiast',
      description: 'Menyelesaikan 10 sesi AI tahsin',
      icon: Mic,
      color: '#22c55e',
      earned_at: '2024-01-18',
    },
    {
      id: '3',
      title: 'Knowledge Seeker',
      description: 'Menghadiri 5 kajian live',
      icon: Video,
      color: '#3b82f6',
      earned_at: '2024-01-15',
    },
  ];

  const StatCard = ({ 
    title, 
    value, 
    icon: IconComponent, 
    color, 
    unit = '',
    change 
  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    unit?: string;
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
      <Text style={styles.statValue}>{value}{unit}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const PeriodSelector = () => (
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
            {period === 'week' ? 'Minggu' : 
             period === 'month' ? 'Bulan' : 'Tahun'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const StreakCounter = () => (
    <View style={styles.streakContainer}>
      <LinearGradient
        colors={['#ef4444', '#dc2626']}
        style={styles.streakGradient}>
        <Flame size={32} color="white" strokeWidth={2} />
        <Text style={styles.streakNumber}>{weeklyStats.streak_days}</Text>
        <Text style={styles.streakLabel}>Hari Streak</Text>
        <Text style={styles.streakSubtext}>Tetap semangat!</Text>
      </LinearGradient>
    </View>
  );

  const ActivityTimeline = () => (
    <View style={styles.timelineSection}>
      <Text style={styles.sectionTitle}>Aktivitas Harian</Text>
      
      <View style={styles.dateNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <ChevronLeft size={20} color="#64748b" strokeWidth={2} />
        </TouchableOpacity>
        
        <Text style={styles.currentDate}>
          {selectedDate.toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
        
        <TouchableOpacity style={styles.navButton}>
          <ChevronRight size={20} color="#64748b" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {dailyActivities.map((day, index) => (
        <View key={day.date} style={styles.dayCard}>
          <Text style={styles.dayDate}>
            {new Date(day.date).toLocaleDateString('id-ID', { 
              weekday: 'short', 
              day: 'numeric',
              month: 'short'
            })}
          </Text>
          
          <View style={styles.activitiesList}>
            {day.activities.map((activity, actIndex) => {
              const getActivityIcon = (type: string) => {
                switch (type) {
                  case 'quran': return { icon: Book, color: '#22c55e' };
                  case 'doa': return { icon: Heart, color: '#8b5cf6' };
                  case 'ai_session': return { icon: Mic, color: '#f59e0b' };
                  case 'live': return { icon: Video, color: '#ef4444' };
                  default: return { icon: Book, color: '#64748b' };
                }
              };

              const { icon: IconComponent, color } = getActivityIcon(activity.type);

              return (
                <View key={actIndex} style={styles.activityItem}>
                  <View style={[styles.activityIcon, { backgroundColor: `${color}20` }]}>
                    <IconComponent size={16} color={color} strokeWidth={2} />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityCount}>{activity.count}</Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );

  const AchievementsSection = () => (
    <View style={styles.achievementsSection}>
      <Text style={styles.sectionTitle}>Pencapaian Terbaru</Text>
      
      {achievements.map((achievement) => {
        const IconComponent = achievement.icon;
        return (
          <View key={achievement.id} style={styles.achievementCard}>
            <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
              <IconComponent size={24} color={achievement.color} strokeWidth={2} />
            </View>
            
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementDate}>
                {new Date(achievement.earned_at).toLocaleDateString('id-ID')}
              </Text>
            </View>
            
            <Award size={20} color="#fbbf24" strokeWidth={2} fill="#fbbf24" />
          </View>
        );
      })}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Kilas Balik</Text>
        <Text style={styles.headerSubtitle}>
          Lihat progress dan pencapaian Anda
        </Text>
      </LinearGradient>

      <PeriodSelector />
      <StreakCounter />

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Ayat Dibaca"
          value={weeklyStats.quran_read}
          icon={Book}
          color="#22c55e"
          change="+12%"
        />
        <StatCard
          title="Doa Dibaca"
          value={weeklyStats.doa_count}
          icon={Heart}
          color="#8b5cf6"
          change="+8%"
        />
        <StatCard
          title="Sesi AI"
          value={weeklyStats.ai_sessions}
          icon={Mic}
          color="#f59e0b"
          change="+15%"
        />
        <StatCard
          title="Kajian Live"
          value={weeklyStats.live_attended}
          icon={Video}
          color="#ef4444"
          change="+5%"
        />
        <StatCard
          title="Total Waktu"
          value={weeklyStats.total_minutes}
          unit=" menit"
          icon={Clock}
          color="#06b6d4"
          change="+20%"
        />
        <StatCard
          title="Target Harian"
          value={85}
          unit="%"
          icon={Target}
          color="#10b981"
          change="+3%"
        />
      </View>

      <ActivityTimeline />
      <AchievementsSection />
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
    backgroundColor: '#3b82f6',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  periodButtonTextActive: {
    color: 'white',
  },
  streakContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  streakGradient: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
    marginTop: 8,
  },
  streakLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 4,
  },
  streakSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
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
  timelineSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
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
  navButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
  },
  currentDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  dayCard: {
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
  dayDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 12,
  },
  activitiesList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activityItem: {
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activityInfo: {
    alignItems: 'center',
  },
  activityCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  achievementIcon: {
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
  achievementDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
});