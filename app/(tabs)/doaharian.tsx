import React, { useState, useEffect } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator, 
  ScrollView, 
  Modal, 
  TextInput
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search as SearchIcon, BookOpen as BookIcon, Info as InfoIcon, ChevronRight as ChevronIcon } from 'lucide-react-native';
import { doaService } from '../../services/doaService';


interface DoaItem {
  id: number;
  grup: string;
  nama: string;
  ar: string;
  tr: string;
  idn: string;
  tentang: string;
  tag: string[];
}

function DoaHarianContent() {
  // Gunakan insets untuk menghitung jarak aman status bar & bottom bar
  const insets = useSafeAreaInsets();
  
  const [doas, setDoas] = useState<DoaItem[]>([]);
  const [filteredDoas, setFilteredDoas] = useState<DoaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrup, setSelectedGrup] = useState('');
  
  const [selectedDoa, setSelectedDoa] = useState<DoaItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Daftar kategori sesuai grup di API
  const categories = [
    { id: '', name: 'Semua' },
    { id: 'Doa Sebelum dan Sesudah Tidur', name: 'Tidur' },
    { id: 'Doa di Kamar Mandi', name: 'Toilet' },
    { id: 'Doa Saat Wudhu', name: 'Wudhu' },
    { id: 'Doa Berpakaian', name: 'Pakaian' },
  ];

  useEffect(() => {
    loadData();
  }, [selectedGrup]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await doaService.getDoas(selectedGrup);
      setDoas(data);
      setFilteredDoas(data);
    } catch (err) {
      console.log("Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text) {
      setFilteredDoas(doas);
    } else {
      const filtered = doas.filter((item) =>
        item.nama.toLowerCase().includes(text.toLowerCase()) ||
        item.idn.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDoas(filtered);
    }
  };

  const renderItem = ({ item }: { item: DoaItem }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => {
        setSelectedDoa(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.nama}</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>{item.grup}</Text></View>
        </View>
        <ChevronIcon size={18} color="#cbd5e1" />
      </View>
      <Text style={styles.arabicShort} numberOfLines={1}>{item.ar}</Text>
      <View style={styles.tagRow}>
        {item.tag.map((t, i) => (
          <Text key={i} style={styles.tagText}>#{t}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.header}>
        <Text style={styles.headerTitle}>Doa & Dzikir</Text>
        <View style={styles.searchBox}>
          <SearchIcon size={18} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari doa..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#94a3b8"
          />
        </View>
      </LinearGradient>

      <View style={styles.catWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              onPress={() => setSelectedGrup(cat.id)}
              style={[styles.catBtn, selectedGrup === cat.id && styles.catBtnActive]}
            >
              <Text style={[styles.catText, selectedGrup === cat.id && {color: 'white'}]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#3b82f6" /></View>
      ) : (
        <FlatList
          data={filteredDoas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
          ListEmptyComponent={<Text style={styles.empty}>Doa tidak ditemukan.</Text>}
        />
      )}

      {/* MODAL DETAIL */}
      <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
        <View style={styles.overlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity style={styles.closeHandle} onPress={() => setModalVisible(false)} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.mTitle}>{selectedDoa?.nama}</Text>
              <Text style={styles.mArabic}>{selectedDoa?.ar}</Text>
              
              <View style={styles.mSection}>
                <View style={styles.mSectionHeader}>
                  <BookIcon size={16} color="#3b82f6" />
                  <Text style={styles.mSectionLabel}>Latin</Text>
                </View>
                <Text style={styles.mLatin}>{selectedDoa?.tr}</Text>
              </View>

              <View style={styles.mSection}>
                <View style={styles.mSectionHeader}>
                  <InfoIcon size={16} color="#3b82f6" />
                  <Text style={styles.mSectionLabel}>Artinya</Text>
                </View>
                <Text style={styles.mTranslation}>{selectedDoa?.idn}</Text>
              </View>

              {selectedDoa?.tentang && (
                <View style={styles.mSection}>
                  <Text style={styles.mSectionLabel}>Keterangan / Sumber</Text>
                  <Text style={styles.mAbout}>{selectedDoa?.tentang}</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Komponen utama yang dibungkus Provider
export default function DoaHarianScreen() {
  return (
    <SafeAreaProvider>
      <DoaHarianContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { padding: 20, paddingBottom: 25 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 15 },
  searchBox: { flexDirection: 'row', backgroundColor: '#334155', borderRadius: 12, paddingHorizontal: 12, alignItems: 'center', height: 45 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: 'white' },
  catWrapper: { backgroundColor: 'white', paddingVertical: 12, paddingLeft: 20 },
  catBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f1f5f9', marginRight: 10 },
  catBtnActive: { backgroundColor: '#3b82f6' },
  catText: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  card: { backgroundColor: 'white', padding: 18, borderRadius: 16, marginBottom: 15, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  badge: { backgroundColor: '#eff6ff', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, color: '#3b82f6', fontWeight: 'bold' },
  arabicShort: { fontSize: 22, textAlign: 'right', color: '#0f172a', marginTop: 15 },
  tagRow: { flexDirection: 'row', marginTop: 12 },
  tagText: { fontSize: 11, color: '#94a3b8', marginRight: 8 },
  center: { flex: 1, justifyContent: 'center' },
  empty: { textAlign: 'center', marginTop: 50, color: '#94a3b8' },
  // Modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, height: '90%' },
  closeHandle: { width: 40, height: 5, backgroundColor: '#cbd5e1', alignSelf: 'center', borderRadius: 10, marginBottom: 20 },
  mTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 25 },
  mArabic: { fontSize: 28, textAlign: 'right', color: '#0f172a', lineHeight: 50, marginBottom: 30 },
  mSection: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 12, marginBottom: 15 },
  mSectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  mSectionLabel: { fontSize: 13, fontWeight: 'bold', color: '#3b82f6', marginLeft: 6 },
  mLatin: { fontSize: 15, color: '#475569', fontStyle: 'italic', lineHeight: 22 },
  mTranslation: { fontSize: 15, color: '#1e293b', lineHeight: 24 },
  mAbout: { fontSize: 13, color: '#64748b', lineHeight: 20, marginTop: 5 }
});