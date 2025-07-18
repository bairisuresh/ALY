import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function VehicleDetailsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2021 GMC Yukon Hybrid RWD Touring</Text>
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>VIN:</Text>
          <Text style={styles.value}>1GKS2BKC0MR123456</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>$54,000</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>Active</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Mileage:</Text>
          <Text style={styles.value}>32,000 mi</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Color:</Text>
          <Text style={styles.value}>Red</Text>
        </View>
        <View style={styles.buttonRow}>
          <Button title="Edit Listing" onPress={() => {}} color="#007AFF" />
          <Button title="Open Offers" onPress={() => router.push('/respond-to-offers')} color="#FFD600" />
        </View>
        <Text style={styles.section}>Seller Comments</Text>
        <Text style={styles.comments}>Single owner, no accidents, clean title.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F6F6F6' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#222', textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { fontSize: 16, color: '#888' },
  value: { fontSize: 16, color: '#222', fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#222' },
  comments: { color: '#444', fontSize: 15 },
});
