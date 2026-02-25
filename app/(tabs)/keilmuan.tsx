import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList
  
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Book, Search, ListFilter as Filter, Clock, User, Star, BookOpen, Scroll, Heart, Users ,ChevronLeft} from 'lucide-react-native';
import { router } from 'expo-router';
export default function KeilmuanScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Semua', icon: BookOpen, color: '#64748b' },
    { id: 'tafsir', name: 'Tafsir', icon: Book, color: '#22c55e' },
    { id: 'hadits', name: 'Hadits', icon: Scroll, color: '#3b82f6' },
    { id: 'fiqh', name: 'Fiqh', icon: BookOpen, color: '#f59e0b' },
    { id: 'aqidah', name: 'Aqidah', icon: Heart, color: '#8b5cf6' },
    { id: 'akhlaq', name: 'Akhlaq', icon: Users, color: '#ef4444' },
    { id: 'sirah', name: 'Sirah', icon: User, color: '#06b6d4' },
  ];

  const difficulties = [
    { id: 'all', name: 'Semua Level' },
    { id: 'pemula', name: 'Pemula' },
    { id: 'menengah', name: 'Menengah' },
    { id: 'lanjut', name: 'Lanjut' },
  ];

  const articles = [
    {
      id: '1',
      title: 'Memahami Makna Surah Al-Fatihah dalam Kehidupan Sehari-hari',
      description: 'Pembahasan mendalam tentang makna dan hikmah dari surah pembuka Al-Qur\'an',
      category: 'tafsir',
      difficulty: 'pemula',
      author: 'Ust. Ahmad Fauzan',
      read_time: '8 menit',
      rating: 4.8,
      readers: 1247,
      created_at: '2024-01-15',
    },
    {
      id: '2',
      title: 'Hadits Arbain An-Nawawi: Panduan Lengkap untuk Pemula',
      description: 'Koleksi 40 hadits pilihan Imam An-Nawawi dengan penjelasan kontemporer',
      category: 'hadits',
      difficulty: 'pemula',
      author: 'Ust. Mahmud Syakir',
      read_time: '12 menit',
      rating: 4.9,
      readers: 892,
      created_at: '2024-01-14',
    },
    {
      id: '3',
      title: 'Fiqh Muamalat dalam Era Digital: Hukum Jual Beli Online',
      description: 'Analisis hukum Islam terhadap transaksi digital dan e-commerce modern',
      category: 'fiqh',
      difficulty: 'menengah',
      author: 'Ust. Abdullah Hakim',
      read_time: '15 menit',
      rating: 4.7,
      readers: 634,
      created_at: '2024-01-13',
    },
  ];

  const CategoryFilter = () => (
    <View style={styles.categoryFilter}>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}>
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                isSelected && { backgroundColor: category.color }
              ]}
              onPress={() => setSelectedCategory(category.id)}>
              <IconComponent 
                size={20} 
                color={isSelected ? 'white' : category.color} 
                strokeWidth={2} 
              />
              <Text style={[
                styles.categoryText,
                isSelected && { color: 'white' }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const ArticleCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.articleCard}>
      <View style={styles.articleHeader}>
        <View style={[
          styles.categoryBadge,
          { backgroundColor: categories.find(c => c.id === item.category)?.color }
        ]}>
          <Text style={styles.categoryBadgeText}>
            {categories.find(c => c.id === item.category)?.name}
          </Text>
        </View>
        
        <View style={[
          styles.difficultyBadge,
          { 
            backgroundColor: 
              item.difficulty === 'pemula' ? '#22c55e20' :
              item.difficulty === 'menengah' ? '#f59e0b20' : '#ef444420'
          }
        ]}>
          <Text style={[
            styles.difficultyText,
            { 
              color: 
                item.difficulty === 'pemula' ? '#22c55e' :
                item.difficulty === 'menengah' ? '#f59e0b' : '#ef4444'
            }
          ]}>
            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
          </Text>
        </View>
      </View>

      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>

      <View style={styles.articleMeta}>
        <View style={styles.authorInfo}>
          <User size={14} color="#64748b" strokeWidth={2} />
          <Text style={styles.authorName}>{item.author}</Text>
        </View>
        
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Clock size={12} color="#94a3b8" strokeWidth={2} />
            <Text style={styles.metaText}>{item.read_time}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Star size={12} color="#fbbf24" strokeWidth={2} fill="#fbbf24" />
            <Text style={styles.metaText}>{item.rating}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Users size={12} color="#94a3b8" strokeWidth={2} />
            <Text style={styles.metaText}>{item.readers}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <View style={styles.topNav}>
          <TouchableOpacity 
            style={styles.navCircle} 
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => router.back()}
          >
            <ChevronLeft color="white" />
          </TouchableOpacity>
        </View>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Keilmuan Islam</Text>
        <Text style={styles.headerSubtitle}>
          Pelajari ilmu agama dari para asatidz terpercaya
        </Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari artikel keilmuan..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748b" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <CategoryFilter />

      <View style={styles.difficultyFilter}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.difficultyList}>
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty.id}
              style={[
                styles.difficultyChip,
                selectedDifficulty === difficulty.id && styles.difficultyChipActive
              ]}
              onPress={() => setSelectedDifficulty(difficulty.id)}>
              <Text style={[
                styles.difficultyChipText,
                selectedDifficulty === difficulty.id && styles.difficultyChipTextActive
              ]}>
                {difficulty.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Artikel Terbaru</Text>
          <Text style={styles.contentSubtitle}>
            {articles.length} artikel tersedia
          </Text>
        </View>
        
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={ArticleCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articlesList}
        />
      </View>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
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
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryFilter: {
    paddingBottom: 16,
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 6,
  },
  difficultyFilter: {
    paddingBottom: 16,
  },
  difficultyList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  difficultyChip: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  difficultyChipActive: {
    backgroundColor: '#3b82f6',
  },
  difficultyChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  difficultyChipTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentHeader: {
    marginBottom: 16,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  contentSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  articlesList: {
    paddingBottom: 20,
  },
  articleCard: {
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
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  difficultyBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: 24,
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  articleMeta: {
    gap: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
    marginLeft: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 4,
  },
    topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, elevation: 10 },
     navCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
});