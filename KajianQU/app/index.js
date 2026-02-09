import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
      <Link href="/keilmuan" dismissTo style={styles.link}>
        <ThemedText type="link">Keilmuan</ThemedText>
      </Link>
      <Link href="/bahtsul" dismissTo style={styles.link}>
        <ThemedText type="link">bahtsul</ThemedText>
      </Link>
      <Link href="/doa" dismissTo style={styles.link}>
        <ThemedText type="link">doa</ThemedText>
      </Link>
      <Link href="/donation" dismissTo style={styles.link}>
        <ThemedText type="link">donation</ThemedText>
      </Link>
      <Link href="/live" dismissTo style={styles.link}>
        <ThemedText type="link">live</ThemedText>
      </Link>
      <Link href="/kajian" dismissTo style={styles.link}>
        <ThemedText type="link">kajian</ThemedText>
      </Link>
      <Link href="/quran" dismissTo style={styles.link}>
        <ThemedText type="link">quran</ThemedText>
      </Link>
      <Link href="/profile" dismissTo style={styles.link}>
        <ThemedText type="link">profile</ThemedText>
      </Link>
      <Link href="/chat" dismissTo style={styles.link}>
        <ThemedText type="link">chat</ThemedText>
      </Link>
      <Link href="/muamalat" dismissTo style={styles.link}>
        <ThemedText type="link">mualamat</ThemedText>
      </Link>
      <Link href="/quote" dismissTo style={styles.link}>
        <ThemedText type="link">quote</ThemedText>
      </Link>
      <Link href="/kelsa-private" dismissTo style={styles.link}>
        <ThemedText type="link">kelas private</ThemedText>
      </Link>
      <Link href="/kilas-balik" dismissTo style={styles.link}>
        <ThemedText type="link">kilas balik</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
