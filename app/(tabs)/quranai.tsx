import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Mic, MicOff, Play, Pause, Square, RotateCcw, X, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useAISessionStore } from '../../store/aiSessionStore';
import { quranAIService } from '../../services/quranAIService';

const { width, height } = Dimensions.get('window');

export default function QuranAIScreen() {
  const {
    currentSession,
    errors,
    isRecording,
    currentAyat,
    startSession,
    stopSession,
    pauseSession,
    resumeSession,
    setRecording,
    addError,
    clearErrors,
  } = useAISessionStore();

  const [selectedMode, setSelectedMode] = useState<'tahsin' | 'muroja\'ah'>('tahsin');
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [startAyat, setStartAyat] = useState(1);
  const [endAyat, setEndAyat] = useState(5);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [currentError, setCurrentError] = useState<any>(null);

  const ayatText = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

  const handleStartSession = async () => {
    try {
      const sessionData = {
        surah: selectedSurah,
        start_ayat: startAyat,
        end_ayat: endAyat,
        mode: selectedMode,
      };

      const response = await quranAIService.startSession(sessionData);
      startSession(response.session);
      setRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start AI session');
    }
  };

  const handleStopSession = async () => {
    try {
      await quranAIService.stopSession();
      stopSession();
    } catch (error) {
      Alert.alert('Error', 'Failed to stop session');
    }
  };

  const handlePauseResume = () => {
    if (isRecording) {
      pauseSession();
    } else {
      resumeSession();
    }
  };

  const ModeSelector = () => (
    <View style={styles.modeSelector}>
      <Text style={styles.sectionLabel}>Mode Pembelajaran</Text>
      <View style={styles.modeButtons}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            selectedMode === 'tahsin' && styles.modeButtonActive,
          ]}
          onPress={() => setSelectedMode('tahsin')}>
          <Text
            style={[
              styles.modeButtonText,
              selectedMode === 'tahsin' && styles.modeButtonTextActive,
            ]}>
            Tahsin
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.modeButton,
            selectedMode === 'muroja\'ah' && styles.modeButtonActive,
          ]}
          onPress={() => setSelectedMode('muroja\'ah')}>
          <Text
            style={[
              styles.modeButtonText,
              selectedMode === 'muroja\'ah' && styles.modeButtonTextActive,
            ]}>
            Muroja'ah
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const SurahSelector = () => (
    <View style={styles.surahSelector}>
      <Text style={styles.sectionLabel}>Pilih Surah & Ayat</Text>
      <View style={styles.selectorRow}>
        <View style={styles.selectorItem}>
          <Text style={styles.selectorLabel}>Surah</Text>
          <Text style={styles.selectorValue}>{selectedSurah}. Al-Fatihah</Text>
        </View>
        <View style={styles.selectorItem}>
          <Text style={styles.selectorLabel}>Ayat</Text>
          <Text style={styles.selectorValue}>{startAyat} - {endAyat}</Text>
        </View>
      </View>
    </View>
  );

  const QuranDisplay = () => (
    <View style={styles.quranDisplay}>
      <Text style={styles.ayatNumber}>Ayat {currentAyat}</Text>
      <ScrollView style={styles.ayatContainer}>
        <Text style={styles.ayatText}>{ayatText}</Text>
      </ScrollView>
      
      {errors.length > 0 && (
        <TouchableOpacity
          style={styles.errorIndicator}
          onPress={() => setShowErrorModal(true)}>
          <AlertCircle size={16} color="#ef4444" strokeWidth={2} />
          <Text style={styles.errorText}>{errors.length} Kesalahan</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const RecordingControls = () => (
    <View style={styles.recordingControls}>
      {!currentSession ? (
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartSession}>
          <LinearGradient
            colors={['#22c55e', '#16a34a']}
            style={styles.startGradient}>
            <Play size={32} color="white" strokeWidth={2} />
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handlePauseResume}>
            {isRecording ? (
              <Pause size={24} color="#f59e0b" strokeWidth={2} />
            ) : (
              <Play size={24} color="#22c55e" strokeWidth={2} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.recordButton]}
            disabled={!currentSession}>
            {isRecording ? (
              <MicOff size={24} color="white" strokeWidth={2} />
            ) : (
              <Mic size={24} color="white" strokeWidth={2} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleStopSession}>
            <Square size={24} color="#ef4444" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      )}

      {currentSession && (
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionText}>
            Session Active • {selectedMode} • Surah {selectedSurah}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentAyat - startAyat) / (endAyat - startAyat)) * 100}%` },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );

  const ErrorModal = () => (
    <Modal
      visible={showErrorModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowErrorModal(false)}>
      <BlurView intensity={50} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Koreksi AI</Text>
            <TouchableOpacity onPress={() => setShowErrorModal(false)}>
              <X size={24} color="#64748b" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.errorsList}>
            {errors.map((error, index) => (
              <View key={error.id} style={styles.errorItem}>
                <Text style={styles.errorAyat}>Ayat {error.ayat}</Text>
                <Text style={styles.errorWrong}>
                  Salah: <Text style={styles.errorWrongText}>{error.wrong_word}</Text>
                </Text>
                <Text style={styles.errorCorrect}>
                  Benar: <Text style={styles.errorCorrectText}>{error.correction}</Text>
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.backToErrorButton}
              onPress={() => {
                // Navigate to error ayat
                setShowErrorModal(false);
              }}>
              <RotateCcw size={16} color="white" strokeWidth={2} />
              <Text style={styles.backToErrorText}>Kembali ke Ayat Salah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <Text style={styles.headerTitle}>AI Quran Tahsin</Text>
        <Text style={styles.headerSubtitle}>
          Perbaiki bacaan Al-Quran dengan teknologi AI
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ModeSelector />
        <SurahSelector />
        <QuranDisplay />
      </ScrollView>

      <RecordingControls />
      <ErrorModal />
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modeSelector: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  modeButtons: {
    flexDirection: 'row',
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
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  modeButtonActive: {
    backgroundColor: '#22c55e',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  modeButtonTextActive: {
    color: 'white',
  },
  surahSelector: {
    marginBottom: 20,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  selectorItem: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
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
  selectorLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '500',
  },
  selectorValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
  },
  quranDisplay: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ayatNumber: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  ayatContainer: {
    maxHeight: 200,
  },
  ayatText: {
    fontSize: 28,
    textAlign: 'center',
    color: '#1e293b',
    lineHeight: 48,
    fontFamily: 'Arial',
  },
  errorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 8,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '500',
    marginLeft: 6,
  },
  recordingControls: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  startButton: {
    alignItems: 'center',
  },
  startGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    backgroundColor: '#ef4444',
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  sessionInfo: {
    alignItems: 'center',
  },
  sessionText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    fontWeight: '500',
  },
  progressBar: {
    width: width - 80,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: width - 40,
    maxHeight: height * 0.8,
    overflow: 'hidden',
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
  errorsList: {
    maxHeight: height * 0.5,
    paddingHorizontal: 20,
  },
  errorItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  errorAyat: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
    marginBottom: 8,
  },
  errorWrong: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  errorWrongText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  errorCorrect: {
    fontSize: 14,
    color: '#64748b',
  },
  errorCorrectText: {
    color: '#22c55e',
    fontWeight: '600',
  },
  modalActions: {
    padding: 20,
  },
  backToErrorButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backToErrorText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
});