import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function VehicleDetailsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2021 GMC Yukon Hybrid RWD Touring</Text>
      <Image source={require('../assets/images/vehicle.png')} style={styles.image} />
      <Button title="Edit Listing" onPress={() => {}} />
      <Text style={styles.section}>Offers</Text>
      <Button title="Open Offers" onPress={() => router.push('/respond-to-offers')} />
      <Text style={styles.section}>Seller Comments</Text>
      <Text>Single owner, no accidents, clean title.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 16 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
});
