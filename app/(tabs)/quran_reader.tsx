import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, StatusBar, SafeAreaView, TextInput, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { ChevronLeft, BookOpen, Search, X, ChevronRight } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Surah, Ayat } from '../../types/types';
import { AyatItem } from '../../components/AyatItem';

interface HistoryItem {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

export default function QuranReaderScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [ayats, setAyats] = useState<Ayat[]>([]);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingAyat, setPlayingAyat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [lastRead, setLastRead] = useState<HistoryItem | null>(null);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);

  useEffect(() => { 
    fetchSurahs(); 
    loadUserData();
  }, []);

  useEffect(() => { 
    fetchAyats(selectedSurah); 
  }, [selectedSurah]);

  useEffect(() => { 
    return sound ? () => { sound.unloadAsync(); } : undefined; 
  }, [sound]);

  const loadUserData = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem('bookmarks_detail');
      const savedHistory = await AsyncStorage.getItem('lastRead');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      if (savedHistory) setLastRead(JSON.parse(savedHistory));
    } catch (e) { console.error(e); }
  };

  const fetchSurahs = async () => {
    try {
      const res = await fetch('https://api.alquran.cloud/v1/surah');
      const json = await res.json();
      if (json.data) setSurahs(json.data);
    } catch (e) { console.error(e); }
  };

  const fetchAyats = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,id.indonesian,id.jalalayn`);
      const json = await res.json();
      if (json.data && json.data.length >= 3) {
        const combined = json.data[0].ayahs.map((item: any, i: number) => ({
          ...item,
          translation: json.data[1].ayahs[i].text,
          tafsir: json.data[2].ayahs[i].text 
        }));
        setAyats(combined);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const navigateToAyat = async (surahNumber: number, ayahNumber: number) => {
    setShowBookmarkModal(false);
    if (selectedSurah !== surahNumber) {
      setSelectedSurah(surahNumber);
    }
    
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: ayahNumber - 1,
        animated: true,
        viewPosition: 0
      });
    }, 1000);
  };

  const playAudio = async (num: number) => {
    if (sound) await sound.unloadAsync();
    if (playingAyat === num) return setPlayingAyat(null);
    setPlayingAyat(num);
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${num}.mp3` },
      { shouldPlay: true }
    );
    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(s => { if (s.isLoaded && s.didJustFinish) setPlayingAyat(null); });
  };

  const toggleBookmark = async (surah: Surah, ayat: Ayat) => {
    let newBookmarks = [...bookmarks];
    const isExist = newBookmarks.find(b => b.id === ayat.number);

    if (isExist) {
      newBookmarks = newBookmarks.filter(b => b.id !== ayat.number);
      Alert.alert("Dihapus", "Ayat berhasil dihapus dari bookmark.");
    } else {
      newBookmarks.push({
        id: ayat.number,
        surahName: surah.englishName,
        surahNumber: surah.number,
        ayahNumber: ayat.numberInSurah,
      });
      Alert.alert("Tersimpan", `Ayat ${ayat.numberInSurah} Surah ${surah.englishName} ditambahkan.`);
    }

    setBookmarks(newBookmarks);
    await AsyncStorage.setItem('bookmarks_detail', JSON.stringify(newBookmarks));
  };

  const saveHistory = async (surah: Surah, ayat: Ayat) => {
    const historyData: HistoryItem = {
      surahNumber: surah.number,
      surahName: surah.englishName,
      ayahNumber: ayat.numberInSurah,
      timestamp: Date.now(),
    };
    setLastRead(historyData);
    await AsyncStorage.setItem('lastRead', JSON.stringify(historyData));
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString() === searchQuery
  );

  const currentSurah = surahs.find(s => s.number === selectedSurah);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient colors={['#065f46', '#10b981']} style={styles.header}>
      

        <View style={styles.surahInfo}>
          <Text style={styles.surahNameBig}>{currentSurah?.englishName || '...'}</Text>
          <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        </View>
      </LinearGradient>
  <View style={styles.topNav}>
          <TouchableOpacity 
            style={styles.navCircle} 
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => router.back()}
          >
            <ChevronLeft color="white" />
          </TouchableOpacity>

          <Text style={styles.navTitle}>KajianQU Quran</Text>
        </View>
      <View style={styles.searchSection}>
        <View style={[styles.searchBar, isSearchActive && styles.searchBarActive]}>
          <Search size={18} color={isSearchActive ? "#10b981" : "#94a3b8"} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari Surah..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}><X size={18} color="#94a3b8" /></TouchableOpacity>
          )}
        </View>
      </View>

      {lastRead && !searchQuery && (
        <View style={styles.historyWrapper}>
          <TouchableOpacity 
            style={styles.historyCard} 
            onPress={() => navigateToAyat(lastRead.surahNumber, lastRead.ayahNumber)}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.historyIcon}><ChevronRight size={16} color="white"/></View>
              <View>
                <Text style={styles.historyLabel}>LANJUT BACA</Text>
                <Text style={styles.historySurah}>{lastRead.surahName} : Ayat {lastRead.ayahNumber}</Text>
              </View>
            </View>
            <View style={styles.lanjutBadge}><Text style={styles.lanjutText}>Lanjut</Text></View>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ marginTop: 5 }}>
        <FlatList
          data={filteredSurahs}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.selector}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => { setSelectedSurah(item.number); setSearchQuery(''); }}
              style={[styles.tab, selectedSurah === item.number && styles.activeTab]}>
              <Text style={[styles.tabText, selectedSurah === item.number && {color: 'white'}]}>
                {item.number}. {item.englishName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color="#10b981" /></View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={ayats}
          contentContainerStyle={{padding: 20, paddingBottom: 100}}
          keyExtractor={(item) => item.number.toString()}
          onScrollToIndexFailed={(info) => {
            flatListRef.current?.scrollToOffset({ offset: info.averageItemLength * info.index, animated: true });
          }}
          renderItem={({item}) => (
            <AyatItem 
              item={item} 
              isPlaying={playingAyat === item.number} 
              isBookmarked={bookmarks.some(b => b.id === item.number)}
              onPlayPress={playAudio} 
              onBookmarkPress={() => toggleBookmark(currentSurah!, item)}
              onPressAyat={() => saveHistory(currentSurah!, item)}
            />
          )}
        />
      )}

      <Modal visible={showBookmarkModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ayat yang Ditandai</Text>
              <TouchableOpacity onPress={() => setShowBookmarkModal(false)}>
                <X color="#1e293b" size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={bookmarks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity 
                  style={styles.bookmarkItem}
                  onPress={() => navigateToAyat(item.surahNumber, item.ayahNumber)}
                >
                  <View>
                    <Text style={styles.bookmarkSurah}>{item.surahName}</Text>
                    <Text style={styles.bookmarkAyah}>Ayat {item.ayahNumber}</Text>
                  </View>
                  <ChevronRight size={18} color="#10b981" />
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>Belum ada ayat di bookmark</Text>}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  header: { padding: 20, paddingBottom: 45, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, elevation: 10 },
  navTitle: { color: 'white', fontWeight: 'bold' },
  navCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#fbbf24', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  surahInfo: { alignItems: 'center', marginTop: 15 },
  surahNameBig: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  bismillah: { color: 'white', fontSize: 20, marginTop: 10 },
  searchSection: { paddingHorizontal: 20, marginTop: -20, zIndex: 50 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 15, height: 50, borderRadius: 15, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  searchBarActive: { borderColor: '#10b981', borderWidth: 1.5 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: '#1e293b' },
  historyWrapper: { paddingHorizontal: 20, marginTop: 15, marginBottom: 5 },
  historyCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15, borderRadius: 15, borderLeftWidth: 5, borderLeftColor: '#10b981', elevation: 2 },
  historyIcon: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#10b981', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  historyLabel: { fontSize: 10, color: '#94a3b8', fontWeight: 'bold' },
  historySurah: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  lanjutBadge: { backgroundColor: '#ecfdf5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  lanjutText: { fontSize: 10, color: '#059669', fontWeight: 'bold' },
  selector: { maxHeight: 60, paddingVertical: 10 },
  tab: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6', marginHorizontal: 5, justifyContent: 'center' },
  activeTab: { backgroundColor: '#10b981' },
  tabText: { fontSize: 12, fontWeight: '600', color: '#6b7280' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, maxHeight: '70%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 15 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  bookmarkItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  bookmarkSurah: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  bookmarkAyah: { fontSize: 13, color: '#64748b' },
  emptyText: { textAlign: 'center', color: '#94a3b8', marginTop: 30, marginBottom: 30 },
});