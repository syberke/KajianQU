import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MapPin, 
  Bell,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const MenuIcon = ({ title, iconSrc, href }: { title: string, iconSrc: any, href?: string }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={() => href && router.push(href as any)} 
    >
      <View style={styles.iconContainer}>
        <Image source={iconSrc} style={styles.menuIconImage} />
      </View>
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        

        <View style={styles.topGreenSection}>
          <ImageBackground 
            source={{ uri: 'https://www.pngall.com/wp-content/uploads/4/Mosque-PNG-Download-Image.png' }}
            style={styles.headerBg}
            imageStyle={{ opacity: 0.05, tintColor: 'white' }}
          >
        
            <View style={styles.topBar}>
              <View style={styles.locationContainer}>
                <MapPin size={18} color="white" />
                <Text style={styles.locationText}>Kecamatan Ciampea, Kab. Bogor</Text>
              </View>
              <TouchableOpacity style={styles.notifCircle}>
                <Bell size={18} color="white" />
                <View style={styles.notifBadge} />
              </TouchableOpacity>
            </View>

       
            <View style={styles.prayerSection}>
              <Text style={styles.prayerName}>Dzuhur</Text>
              <Text style={styles.prayerTimeText}>12:01 WIB</Text>
              <Text style={styles.prayerCountdown}>-01:30:05 Menjelang Adzan</Text>
            </View>

       
            <View style={styles.floatingMenuCard}>
              <View style={styles.menuGrid}>

                <MenuIcon title="Al-Quran" iconSrc={require('@/assets/icons/quran.png')} href="/quran_reader" />
                <MenuIcon title="Keilmuan" iconSrc={require('@/assets/icons/book.png')} href="/keilmuan" />
                <MenuIcon title="Do'a Harian" iconSrc={require('@/assets/icons/pray.png')} href="/doaharian"/>
                <MenuIcon title="Donasi" iconSrc={require('@/assets/icons/charity.png')} href="donasi"/>
                <MenuIcon title="Tanya" iconSrc={require('@/assets/icons/ask.png')} href="/tanya"/>
              </View> 
            </View>
          </ImageBackground>
        </View>

    
        <View style={styles.contentContainer}>
          
   
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitleMain}>Ikuti Kegiatan Kami</Text>
              <Text style={styles.sectionSub}>Ikuti kelas kami bersama ustadz profesional</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat semua</Text>
            </TouchableOpacity>
          </View>

          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <View style={styles.bannerCard}>
              <Image 
                source={require('@/assets/images/banner1.jpg')} 
                style={styles.bannerImage} 
              />
              <View style={styles.bannerContent}>
                <View style={styles.tagYellow}><Text style={styles.tagText}>Setiap Hari</Text></View>
                <Text style={styles.bannerTitle}>Hafalan cepat dengan metode tasbih modern</Text>
                <Text style={styles.ustadzName}>Ust. Dahlan S.Ag</Text>
              </View>
            </View>
            <View style={styles.bannerCard}>
              <Image 
                source={require('@/assets/images/banner1.jpg')} 
                style={styles.bannerImage} 
              />
              <View style={styles.bannerContent}>
                <View style={styles.tagYellow}><Text style={styles.tagText}>Setiap Hari</Text></View>
                <Text style={styles.bannerTitle}>Hafalan cepat dengan metode tasbih modern</Text>
                <Text style={styles.ustadzName}>Ust. Dahlan S.Ag</Text>
              </View>
            </View>
            <View style={styles.bannerCard}>
              <Image 
                source={require('@/assets/images/banner1.jpg')} 
                style={styles.bannerImage} 
              />
              <View style={styles.bannerContent}>
                <View style={styles.tagYellow}><Text style={styles.tagText}>Setiap Hari</Text></View>
                <Text style={styles.bannerTitle}>Hafalan cepat dengan metode tasbih modern</Text>
                <Text style={styles.ustadzName}>Ust. Dahlan S.Ag</Text>
              </View>
            </View>
       
          </ScrollView>

        
          <View style={styles.featuredTeacherCard}>
            <Image 
              source={require('@/assets/images/ustadz-adi.jpg')} 
              style={styles.featuredImage} 
            />
            <View style={styles.teacherOverlay}>
               <Text style={styles.teacherLabel}>Ustadz unggulan</Text>
               <Text style={styles.teacherNameMain}>Ust. Adi Hidayat</Text>
               <Text style={styles.teacherDesc}>Mengajarkan tafsir Al-Qur'an dan akhlak Islam dengan bahasa sederhana.</Text>
               
               <View style={styles.arrowControls}>
                 <TouchableOpacity style={styles.arrowCircle}><ChevronLeft size={20} color="#134e4a" /></TouchableOpacity>
                 <TouchableOpacity style={styles.arrowCircle}><ChevronRight size={20} color="#134e4a" /></TouchableOpacity>
               </View>
            </View>
          </View>

        </View>
        

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#fdfdfd' 
  },
  topGreenSection: {
    backgroundColor: '#134e4a',
    height: 380,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerBg: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 50 
  },
  topBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  locationContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  locationText: { 
    color: 'white', 
    fontSize: 13, 
    marginLeft: 5, 
    fontWeight: '500' 
  },
  notifCircle: { 
    width: 35, 
    height: 35, 
    borderRadius: 18, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  notifBadge: { 
    position: 'absolute', 
    top: 8, 
    right: 8, 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#ef4444', 
    borderWidth: 1.5, 
    borderColor: '#134e4a' 
  },
  prayerSection: { 
    marginTop: 30, 
    alignItems: 'flex-start' 
  },
  prayerName: { 
    color: 'rgba(255,255,255,0.8)', 
    fontSize: 16 
  },
  prayerTimeText: { 
    color: 'white', 
    fontSize: 42, 
    fontWeight: 'bold', 
    marginVertical: 5 
  },
  prayerCountdown: { 
    color: 'rgba(255,255,255,0.7)', 
    fontSize: 14 
  },
  floatingMenuCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  menuGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-around' 
  },
  menuItem: { 
    alignItems: 'center', 
    width: (width - 60) / 5 
  },
  iconContainer: { 
    width: 45, 
    height: 45, 
    marginBottom: 8 
  },
  menuIconImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'contain' 
  },
  menuItemText: { 
    fontSize: 11, 
    color: '#64748b', 
    fontWeight: '500' 
  },
  contentContainer: { 
    paddingHorizontal: 20, 
    marginTop: 40 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    marginBottom: 20 
  },
  sectionTitleMain: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1e293b' 
  },
  sectionSub: { 
    fontSize: 12, 
    color: '#94a3b8', 
    marginTop: 2 
  },
  seeAllText: { 
    fontSize: 12, 
    color: '#94a3b8' 
  },
  horizontalScroll: {
    marginTop: 10,
    paddingBottom: 10,
  },
  bannerCard: { 
    width: width * 0.7, 
    backgroundColor: 'white', 
    borderRadius: 15, 
    marginRight: 15, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: '#f1f5f9' 
  },
  bannerImage: { 
    width: '100%', 
    height: 150 
  },
  bannerContent: { 
    padding: 12 
  },
  tagYellow: { 
    backgroundColor: '#fbbf24', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 5, 
    alignSelf: 'flex-start', 
    marginBottom: 8 
  },
  tagText: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: 'black' 
  },
  bannerTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1e293b' 
  },
  ustadzName: { 
    fontSize: 12, 
    color: '#94a3b8', 
    marginTop: 5 
  },
  featuredTeacherCard: { 
    backgroundColor: '#134e4a', 
    borderRadius: 20, 
    marginTop: 30, 
    overflow: 'hidden' 
  },
  featuredImage: { 
    width: '100%', 
    height: 250, 
    resizeMode: 'cover' 
  },
  teacherOverlay: { 
    padding: 20 
  },
  teacherLabel: { 
    color: '#4ade80', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  teacherNameMain: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginVertical: 5 
  },
  teacherDesc: { 
    color: 'rgba(255,255,255,0.8)', 
    fontSize: 13, 
    lineHeight: 20 
  },
  arrowControls: { 
    flexDirection: 'row', 
    marginTop: 20 
  },
  arrowCircle: { 
    width: 35, 
    height: 35, 
    borderRadius: 18, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10 
  }
});