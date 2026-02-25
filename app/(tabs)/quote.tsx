import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { QuoteService, Quote } from '@/services/quoteService';
import { LinearGradient } from 'expo-linear-gradient';
import { RefreshCw, Share2 } from 'lucide-react-native';

export default function QuotesScreen() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const res = await QuoteService.getQuotes(1, 15, category);
      // Sesuaikan dengan struktur response API kamu
      setQuotes(res.data || res); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadQuotes(); }, [category]);

  const renderQuoteItem = ({ item }: { item: Quote }) => (
    <View style={styles.quoteCard}>
      <Text style={styles.quoteText}>"{item.text}"</Text>
      <View style={styles.quoteFooter}>
        <Text style={styles.categoryBadge}>{item.category}</Text>
        <Text style={styles.authorText}>— {item.author}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.header}>
        <Text style={styles.headerTitle}>Inspirasi Hari Ini</Text>
        
        {/* Filter Kategori Singkat */}
        <View style={styles.filterRow}>
          {['', 'motivasi', 'islami', 'kehidupan'].map((cat) => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setCategory(cat)}
              style={[styles.filterBtn, category === cat && styles.filterBtnActive]}
            >
              <Text style={[styles.filterText, category === cat && styles.filterTextActive]}>
                {cat === '' ? 'Semua' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderQuoteItem}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 15 },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)' },
  filterBtnActive: { backgroundColor: '#3b82f6' },
  filterText: { color: '#94a3b8', fontSize: 12, fontWeight: '700' },
  filterTextActive: { color: '#fff' },
  quoteCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 15, elevation: 2 },
  quoteText: { fontSize: 16, color: '#1e293b', lineHeight: 24, fontStyle: 'italic', marginBottom: 15 },
  quoteFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryBadge: { fontSize: 10, color: '#3b82f6', fontWeight: '800', textTransform: 'uppercase', backgroundColor: '#eff6ff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  authorText: { fontSize: 13, fontWeight: '600', color: '#64748b' },
});