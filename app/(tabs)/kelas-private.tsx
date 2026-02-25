import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Calendar, Clock, Book, User, Plus, Search, Video, MessageCircle, Star, X, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function KelasPrivateScreen() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAsatidz, setSelectedAsatidz] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedKitab, setSelectedKitab] = useState('');
  const [ayatPlan, setAyatPlan] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const asatidzList = [
    {
      id: '1',
      name: 'Ust. Ahmad Fauzan',
      keilmuan: 'Tafsir & Qira\'at',
      rating: 4.9,
      students: 247,
      price: 75000,
      available_times: ['08:00', '14:00', '19:00', '20:30'],
      specialties: ['Al-Qur\'an', 'Tajwid', 'Tafsir'],
      experience: '15 tahun',
    },
    {
      id: '2',
      name: 'Ust. Mahmud Syakir',
      keilmuan: 'Hadits & Fiqh',
      rating: 4.8,
      students: 189,
      price: 80000,
      available_times: ['09:00', '15:00', '20:00'],
      specialties: ['Hadits', 'Fiqh', 'Ushul Fiqh'],
      experience: '12 tahun',
    },
    {
      id: '3',
      name: 'Ust. Abdullah Hakim',
      keilmuan: 'Aqidah & Akhlaq',
      rating: 4.7,
      students: 156,
      price: 70000,
      available_times: ['10:00', '16:00', '19:30'],
      specialties: ['Aqidah', 'Akhlaq', 'Tasawuf'],
      experience: '10 tahun',
    },
  ];

  const kitabOptions = [
    'Al-Qur\'an',
    'Sahih Bukhari',
    'Sahih Muslim',
    'Riyadhus Shalihin',
    'Bulughul Maram',
    'Tafsir Ibnu Katsir',
    'Aqidah Wasithiyah',
    'Adab Mufrad',
  ];

  const myClasses = [
    {
      id: '1',
      asatidz: 'Ust. Ahmad Fauzan',
      kitab: 'Al-Qur\'an',
      ayat_plan: 'Surah Al-Baqarah 1-10',
      date: '2024-01-22',
      time: '19:00',
      status: 'scheduled',
      room_code: 'ABC123',
    },
    {
      id: '2',
      asatidz: 'Ust. Mahmud Syakir',
      kitab: 'Riyadhus Shalihin',
      ayat_plan: 'Bab Taubat',
      date: '2024-01-20',
      time: '20:00',
      status: 'completed',
      room_code: 'DEF456',
    },
  ];

  const AsatidzCard = ({ asatidz }: { asatidz: any }) => (
    <TouchableOpacity 
      style={styles.asatidzCard}
      onPress={() => {
        setSelectedAsatidz(asatidz);
        setShowBookingModal(true);
      }}>
      
      <View style={styles.asatidzHeader}>
        <View style={styles.asatidzAvatar}>
          <User size={24} color="#3b82f6" strokeWidth={2} />
        </View>
        
        <View style={styles.asatidzInfo}>
          <Text style={styles.asatidzName}>{asatidz.name}</Text>
          <Text style={styles.asatidzKeilmuan}>{asatidz.keilmuan}</Text>
          <Text style={styles.asatidzExperience}>Pengalaman: {asatidz.experience}</Text>
        </View>
        
        <View style={styles.asatidzStats}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#fbbf24" strokeWidth={2} fill="#fbbf24" />
            <Text style={styles.ratingText}>{asatidz.rating}</Text>
          </View>
          <Text style={styles.studentsText}>{asatidz.students} santri</Text>
        </View>
      </View>

      <View style={styles.specialtiesContainer}>
        {asatidz.specialties.map((specialty: string, index: number) => (
          <View key={index} style={styles.specialtyTag}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
      </View>

      <View style={styles.asatidzFooter}>
        <Text style={styles.priceText}>
          Rp {asatidz.price.toLocaleString()}/sesi
        </Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Pesan Kelas</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const MyClassCard = ({ classItem }: { classItem: any }) => (
    <View style={styles.classCard}>
      <View style={styles.classHeader}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: classItem.status === 'scheduled' ? '#22c55e20' : '#64748b20' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: classItem.status === 'scheduled' ? '#22c55e' : '#64748b' }
          ]}>
            {classItem.status === 'scheduled' ? 'Terjadwal' : 'Selesai'}
          </Text>
        </View>
        
        <Text style={styles.roomCode}>Kode: {classItem.room_code}</Text>
      </View>

      <Text style={styles.classAsatidz}>{classItem.asatidz}</Text>
      <Text style={styles.classKitab}>{classItem.kitab}</Text>
      <Text style={styles.classAyat}>{classItem.ayat_plan}</Text>

      <View style={styles.classSchedule}>
        <View style={styles.scheduleItem}>
          <Calendar size={14} color="#64748b" strokeWidth={2} />
          <Text style={styles.scheduleText}>
            {new Date(classItem.date).toLocaleDateString('id-ID')}
          </Text>
        </View>
        <View style={styles.scheduleItem}>
          <Clock size={14} color="#64748b" strokeWidth={2} />
          <Text style={styles.scheduleText}>{classItem.time}</Text>
        </View>
      </View>

      {classItem.status === 'scheduled' && (
        <TouchableOpacity style={styles.joinButton}>
          <Video size={16} color="white" strokeWidth={2} />
          <Text style={styles.joinButtonText}>Masuk Kelas</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const BookingModal = () => (
    <Modal
      visible={showBookingModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowBookingModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Pesan Kelas Private</Text>
            <TouchableOpacity onPress={() => setShowBookingModal(false)}>
              <X size={24} color="#64748b" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {selectedAsatidz && (
              <View style={styles.selectedAsatidz}>
                <Text style={styles.selectedAsatidzName}>{selectedAsatidz.name}</Text>
                <Text style={styles.selectedAsatidzKeilmuan}>{selectedAsatidz.keilmuan}</Text>
              </View>
            )}

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Pilih Tanggal</Text>
              <TextInput
                style={styles.formInput}
                placeholder="DD/MM/YYYY"
                value={selectedDate}
                onChangeText={setSelectedDate}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Pilih Waktu</Text>
              <View style={styles.timeSlots}>
                {selectedAsatidz?.available_times.map((time: string) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.timeSlotActive
                    ]}
                    onPress={() => setSelectedTime(time)}>
                    <Text style={[
                      styles.timeSlotText,
                      selectedTime === time && styles.timeSlotTextActive
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Pilih Kitab</Text>
              <View style={styles.kitabOptions}>
                {kitabOptions.map((kitab) => (
                  <TouchableOpacity
                    key={kitab}
                    style={[
                      styles.kitabOption,
                      selectedKitab === kitab && styles.kitabOptionActive
                    ]}
                    onPress={() => setSelectedKitab(kitab)}>
                    <Text style={[
                      styles.kitabOptionText,
                      selectedKitab === kitab && styles.kitabOptionTextActive
                    ]}>
                      {kitab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Rencana Ayat/Materi</Text>
              <TextInput
                style={styles.formTextArea}
                placeholder="Contoh: Surah Al-Baqarah ayat 1-10"
                value={ayatPlan}
                onChangeText={setAyatPlan}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.priceInfo}>
              <Text style={styles.priceLabel}>Total Biaya:</Text>
              <Text style={styles.priceValue}>
                Rp {selectedAsatidz?.price.toLocaleString()}
              </Text>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                setShowBookingModal(false);
                // Handle booking confirmation
              }}>
              <LinearGradient
                colors={['#22c55e', '#16a34a']}
                style={styles.confirmGradient}>
                <CheckCircle size={16} color="white" strokeWidth={2} />
                <Text style={styles.confirmText}>Konfirmasi Booking</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <Users size={32} color="white" strokeWidth={2} />
        <Text style={styles.headerTitle}>Kelas Private</Text>
        <Text style={styles.headerSubtitle}>
          Belajar langsung dengan asatidz pilihan
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={20} color="#64748b" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari asatidz..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* My Classes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kelas Saya</Text>
          {myClasses.map((classItem) => (
            <MyClassCard key={classItem.id} classItem={classItem} />
          ))}
        </View>

        {/* Available Asatidz */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asatidz Tersedia</Text>
          {asatidzList.map((asatidz) => (
            <AsatidzCard key={asatidz.id} asatidz={asatidz} />
          ))}
        </View>
      </ScrollView>

      <BookingModal />
    </View>
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
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    paddingVertical: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  classCard: {
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
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  roomCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  classAsatidz: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  classKitab: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 4,
  },
  classAyat: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  classSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  joinButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginLeft: 6,
  },
  asatidzCard: {
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
  asatidzHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  asatidzAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  asatidzInfo: {
    flex: 1,
  },
  asatidzName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  asatidzKeilmuan: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 2,
  },
  asatidzExperience: {
    fontSize: 12,
    color: '#64748b',
  },
  asatidzStats: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 4,
  },
  studentsText: {
    fontSize: 12,
    color: '#64748b',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  asatidzFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22c55e',
  },
  bookButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  modalBody: {
    maxHeight: 500,
    paddingHorizontal: 20,
  },
  selectedAsatidz: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  selectedAsatidzName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  selectedAsatidzKeilmuan: {
    fontSize: 14,
    color: '#3b82f6',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  formTextArea: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 80,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timeSlotActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  timeSlotTextActive: {
    color: 'white',
  },
  kitabOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  kitabOption: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  kitabOptionActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  kitabOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  kitabOptionTextActive: {
    color: 'white',
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22c55e',
  },
  modalActions: {
    padding: 20,
  },
  confirmButton: {
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 16,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
});