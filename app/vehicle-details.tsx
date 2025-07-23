import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function VehicleDetailsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>2021 GMC Yukon Hybrid RWD Touring</Text>

      <Image
        source={{ uri: 'https://i.imgur.com/Zz4rzVR.png' }} // Replace with actual image URL or local image
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>Single owner, no accidents, clean title.</Text>
      </View>

      <TouchableOpacity style={styles.heartIcon}>
        <FontAwesome name="heart-o" size={24} color="#007AFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bidButton}>
        <Text style={styles.bidButtonText}>Bid/Place Offer</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.noteInput}
        placeholder="Add note"
        placeholderTextColor="#888"
      />

      <View style={styles.detailsCard}>
        <Text style={styles.section}>Pricing & Listing</Text>

        <View style={styles.rowBetween}><Text style={styles.label}>Price:</Text><Text style={styles.value}>$19,200</Text></View>
        <View style={styles.rowBetween}><Text style={styles.label}>Retail Book:</Text><Text style={styles.value}>$21,800</Text></View>
        <View style={styles.rowBetween}><Text style={styles.label}>Profit:</Text><Text style={styles.value}>$2,600</Text></View>
        <View style={styles.rowBetween}><Text style={styles.label}>Profit %:</Text><Text style={styles.value}>12%</Text></View>
        <View style={styles.rowBetween}><Text style={styles.label}>Listed On:</Text><Text style={styles.value}>March 18, 2024 @ 11:40 AM</Text></View>
        <View style={styles.rowBetween}><Text style={styles.label}>Expires:</Text><Text style={styles.value}>March 21, 2024 @ 9:40 AM</Text></View>
        <View style={styles.rowBetween}><Text style={styles.label}>Time Left:</Text><Text style={styles.value}>4h 23m</Text></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F6F6F6' },
  title: { fontSize: 20, fontWeight: '600', color: '#222', textAlign: 'center', marginBottom: 10 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 10 },
  badgeContainer: { backgroundColor: '#DFF5DF', padding: 10, borderRadius: 8, marginBottom: 10 },
  badgeText: { color: '#228B22', fontSize: 14, fontWeight: '500', textAlign: 'center' },
  heartIcon: { position: 'absolute', top: 260, right: 20 },
  bidButton: {
    backgroundColor: '#007AFF', paddingVertical: 12, alignItems: 'center', borderRadius: 10, marginBottom: 10,
  },
  bidButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  noteInput: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16, backgroundColor: '#fff', fontSize: 15,
  },
  detailsCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 1,
  },
  section: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#222' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 14, color: '#555' },
  value: { fontSize: 14, color: '#222', fontWeight: '500' },
});
